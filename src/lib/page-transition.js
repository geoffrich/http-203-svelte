import { beforeNavigate, goto } from '$app/navigation';
import { navigating } from '$app/stores';
import { onDestroy } from 'svelte';
import { derived, writable } from 'svelte/store';
import reducedMotion from './reduced-motion';

function getNavigationStore() {
	/** @type {((val?: any) => void)[]} */
	let callbacks = [];

	const navigation = {
		...navigating,
		complete: async () => {
			await new Promise((res, _) => {
				callbacks.push(res);
			});
		}
	};

	// This used to subscribe inside the callback, but that resolved the promise too early
	const unsub = navigating.subscribe((n) => {
		if (n === null) {
			while (callbacks.length > 0) {
				const res = callbacks.pop();
				res?.();
			}
		}
	});

	onDestroy(() => {
		unsub();
	});

	return navigation;
}

/**
 * @callback pageTransitionCallback
 * @param {{ from: URL, to: URL, type: TransitionType}} nav
 */

const beforeCallbacks = new Set(); // before transition starts
const afterCallbacks = new Set(); // after transition has completed
const incomingCallbacks = new Set(); // when new page is loaded but transition has not completed

/**
 * @param {pageTransitionCallback} fn
 */
export const beforePageTransition = (fn) => {
	beforeCallbacks.add(fn);

	onDestroy(() => {
		beforeCallbacks.delete(fn);
	});
};

/**
 * @param {pageTransitionCallback} fn
 */
export const whileIncomingTransition = (fn) => {
	incomingCallbacks.add(fn);

	onDestroy(() => {
		incomingCallbacks.delete(fn);
	});
};

/**
 * @param {pageTransitionCallback} fn
 */
export const afterPageTransition = (fn) => {
	afterCallbacks.add(fn);

	onDestroy(() => {
		afterCallbacks.delete(fn);
	});
};

function getClassToAdd(type) {
	switch (type) {
		case TransitionType.ThumbsToVideo:
			return 'transition-home-to-video';
		case TransitionType.VideoToThumbs:
			return 'transition-video-to-home';
		case TransitionType.VideoToVideo:
			return 'transition-video-to-video';
	}
	// TODO: apply back transition using `delta`
}

/**
 * @param {(navigation: import('@sveltejs/kit').Navigation) => string?} getType
 */
export const preparePageTransition = (getType = (_) => null) => {
	const navigation = getNavigationStore();
	let isReducedMotionEnabled = false;

	let unsubReducedMotion = reducedMotion.subscribe((val) => (isReducedMotionEnabled = val));

	// before navigating, start a new transition
	beforeNavigate((navigationDetail) => {
		const { from, to, delta = 0, cancel, willUnload, type: navigationType } = navigationDetail;
		if (globalThis.ongoingTransition || willUnload) {
			return;
		}
		const type = getType(navigationDetail);
		const payload = { from: from?.url, to: to?.url, type };
		beforeCallbacks.forEach((fn) => fn(payload));
		// init before starting the transition so the promise doesn't resolve early
		const navigationComplete = navigation.complete();

		// TODO: not sure if this belongs here
		// could try to make it passed as a function somehow
		const className = getClassToAdd(type);
		const classNames = className ? [className] : [];
		if (delta < 0) {
			classNames.push('back-transition');
		}

		const transition = transitionHelper({
			skipTransition: isReducedMotionEnabled,
			classNames,
			updateDOM: async () => {
				await navigationComplete;
				incomingCallbacks.forEach((fn) => fn(payload));
			}
		});

		transition.finished.finally(() => {
			afterCallbacks.forEach((fn) => fn(payload));
		});

		if (navigationType === 'link') {
			// this is pretty hacky
			// we need to prevent the new page from loading too quickly
			// otherwise the transition doesn't happen
			// this often happens when preload-code="hover"
			// only do it for links because we want to exclude external site navs and back/forward navigations
			cancel();
			new Promise((res) => setTimeout(res, 0)).then(() => goto(to?.url ?? ''));
		}
	});

	onDestroy(() => {
		unsubReducedMotion();
	});
};

/**
 * @enum {string}
 */
export const TransitionType = {
	ThumbsToVideo: 'thumbstovideo',
	VideoToThumbs: 'videotothumbs',
	ThumbsToThumbs: 'thumbstothumbs',
	VideoToVideo: 'videotovideo',
	Back: 'back',
	Other: 'other'
};

/**
 * @param {import('@sveltejs/kit').Navigation} navigation
 * @returns {string}
 */
export function getPageTransitionType(navigation) {
	const to = navigation.to?.url.pathname ?? '';
	const from = navigation.from?.url.pathname ?? '';

	if (to.startsWith('/videos/') && (from === '/' || from.startsWith('/summit-'))) {
		return TransitionType.ThumbsToVideo;
	}
	if (from.startsWith('/videos/') && (to === '/' || to.startsWith('/summit-'))) {
		return TransitionType.VideoToThumbs;
	}
	if ((from === '/' || from.startsWith('/summit-')) && (to === '/' || to.startsWith('/summit-'))) {
		return TransitionType.ThumbsToThumbs;
	}
	if (from.startsWith('/videos/') && to.startsWith('/videos/') && from !== to) {
		return TransitionType.VideoToVideo;
	}
	return TransitionType.Other;
}

/**
 * copied from Jake Archibald's explainer
 * https://developer.chrome.com/docs/web-platform/view-transitions/#not-a-polyfill
 * @returns {ViewTransition}
 */
function transitionHelper({ skipTransition = false, classNames = [], updateDOM }) {
	if (skipTransition || !document.startViewTransition) {
		const updateCallbackDone = Promise.resolve(updateDOM()).then(() => {});

		return {
			ready: Promise.reject(Error('View transitions unsupported')),
			updateCallbackDone,
			finished: updateCallbackDone,
			skipTransition: () => {}
		};
	}

	document.documentElement.classList.add(...classNames);

	const transition = document.startViewTransition(updateDOM);

	// this bit isn't in the explainer version, but is in the HTTP-203 demo
	globalThis.ongoingTransition = transition;

	transition.finished.finally(() => {
		document.documentElement.classList.remove(...classNames);
		globalThis.ongoingTransition = undefined;
	});

	return transition;
}
