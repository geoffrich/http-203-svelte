<script>
	import '../app.css';
	import {
		preparePageTransition,
		TransitionType,
		beforePageTransition,
		afterPageTransition,
		whileIncomingTransition
	} from '$lib/page-transition';
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';

	let showBackIcon = $page.url.pathname.includes('/videos');
	let backUrl = '/';

	afterNavigate(({ from, to }) => {
		if (
			(from?.pathname.startsWith('/summit-') || from?.pathname === '/') &&
			to.pathname.includes('/videos')
		) {
			backUrl = from.pathname;
		} else {
			backUrl = '/';
		}
	});

	preparePageTransition();

	beforePageTransition(({ type }) => {
		switch (type) {
			case TransitionType.ThumbsToVideo:
				document.documentElement.classList.add('transition-home-to-video');
				break;
			case TransitionType.VideoToThumbs:
				document.documentElement.classList.add('transition-video-to-home');
				break;
			case TransitionType.VideoToVideo:
				document.documentElement.classList.add('transition-video-to-video');
		}
		// TODO: apply back transition, somehow
	});

	whileIncomingTransition(({ to }) => {
		// TODO: this doesn't run if browser doesn't support transitions
		// This feels hacky, but it seems to work
		// Previously, showBackIcon was derived from $page.url.pathname
		// However, this caused a race condition where the $page store updated
		// before the transition started, causing the back icon to disappear too soon
		// This will likely be an issue with any shared component on the page that needs to be
		// derived from the URL and wants to participate in the transition
		showBackIcon = to.pathname.includes('/videos');
	});

	afterPageTransition(() => {
		document.documentElement.classList.remove(
			'back-transition',
			'transition-home-to-video',
			'transition-video-to-home',
			'transition-video-to-video'
		);
	});
</script>

<div class="main-layout">
	<header class="header" class:show-back-icon={showBackIcon}>
		<a href={backUrl} class="home-link">
			<svg class="back-icon" viewBox="0 0 24 24">
				<path d="M20 11H7.8l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.8 13H20v-2z" />
			</svg>
			<span class="header-text">Svelte Summit</span>
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
