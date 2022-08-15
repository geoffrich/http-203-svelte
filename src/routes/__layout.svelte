<script context="module">
	/** @type { import('./__types/__layout').Load} */
	export const load = async ({ fetch }) => {
		// fetch in the layout and throw into a context since a bunch of disparate endpoints need this data
		// layout endpoint/$data store will make this easier
		const videos = await fetch('/videos.json').then((v) => v.json());
		return {
			props: {
				videos
			}
		};
	};
</script>

<script>
	import '../app.css';
	import { setContext } from 'svelte';
	import { page, navigating } from '$app/stores';
	import {
		preparePageTransition,
		pageTransitionType,
		TransitionType,
		getPageTransitionType
	} from '$lib/page-transition';
	import { browser } from '$app/env';
	import { beforeNavigate } from '$app/navigation';

	export let videos;

	setContext('videos', videos);

	// TODO: add classes/transition tags in beforeNavigate to avoid timing issues
	// then see if there's a more declarative way to refactor
	beforeNavigate(({ from: fromUrl, to: toUrl }) => {
		const from = fromUrl.pathname;
		const to = toUrl?.pathname ?? '';

		pageTransitionType.set(getPageTransitionType(from, to));
	});

	preparePageTransition();

	$: console.log($navigating);
	$: console.log($pageTransitionType);

	$: switch ($pageTransitionType) {
		case TransitionType.ThumbsToVideo:
			document.documentElement.classList.add('transition-home-to-video');
			break;
		case TransitionType.VideoToThumbs:
			document.documentElement.classList.add('transition-video-to-home');
			break;
		case TransitionType.VideoToVideo:
			document.documentElement.classList.add('transition-video-to-video');
		default:
			if (browser) {
				document.documentElement.classList.remove(
					'back-transition',
					'transition-home-to-video',
					'transition-video-to-home',
					'transition-video-to-video'
				);
			}
	}

	$: showBackIcon = $page.url.href.includes('/videos');
</script>

<div class="main-layout">
	<header class="header" class:show-back-icon={showBackIcon}>
		<a href="/" class="home-link">
			<svg class="back-icon" viewBox="0 0 24 24">
				<path d="M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20v-2z" />
			</svg>
			<span class="header-text">HTTP 203</span>
		</a>
	</header>
	<div class="main">
		<slot />
	</div>
</div>

<style lang="postcss">
	.main-layout {
		height: 100%;
		display: grid;
		grid-template-rows: auto 1fr;
	}

	.header {
		background: var(--primary-color);
		color: var(--white);
		height: 54px;
		display: grid;
		align-items: center;
		padding: 0 var(--content-padding);
		contain: paint;
		page-transition-tag: site-header;
	}

	.show-back-icon.header {
		padding: 0 10px;
	}

	.main {
		overflow-x: hidden;
		overflow-y: auto;
		display: grid;
		grid-template-columns: 100%;

		@media (min-width: 900px) {
			display: block;
		}
	}

	.home-link {
		fill: var(--white);
		color: inherit;
		width: max-content;
		contain: paint;
	}

	.show-back-icon .home-link {
		display: grid;
		grid-template-columns: 31px 1fr;
		align-items: center;
		gap: 0.3rem;
	}

	.back-icon {
		display: none;
	}

	.show-back-icon .back-icon {
		display: block;
	}

	.header-text {
		display: block;
		contain: paint;
		page-transition-tag: header-text;
	}
</style>
