<script>
	import { ytSrcset } from '$lib/utils';
	import { afterPageTransition, beforePageTransition } from './page-transition';

	/** @type {import('./types').Video}*/
	export let video;

	// TODO: better way?
	let renderIframe = !globalThis.ongoingTransition;
	let iframeReady = false;

	// this previously used a #key, but ran into race conditions with the transition
	beforePageTransition(() => {
		renderIframe = false;
		iframeReady = false;
	});

	afterPageTransition(() => {
		renderIframe = true;
	});
</script>

<div class="embed-container">
	{#if renderIframe}
		<iframe
			on:load={() => (iframeReady = true)}
			class="embed"
			width="560"
			height="315"
			src={`https://www.youtube-nocookie.com/embed/${video.id}`}
			title="YouTube video player"
			frameBorder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowFullScreen
		/>
	{/if}
	<img
		class="video-img"
		style:opacity={iframeReady ? '0' : '1'}
		srcset={ytSrcset(video.id)}
		alt={video.title}
		fetchpriority="high"
	/>
</div>

<style lang="postcss">
	.embed,
	.video-img {
		display: block;
		aspect-ratio: 16/9;
		width: 100%;
		height: auto;
	}

	.video-img {
		object-fit: cover;
		object-position: center;
		will-change: opacity;
		transition: opacity 500ms ease-in-out;
		pointer-events: none;
	}

	.embed-container {
		display: grid;
		contain: paint;
		view-transition-name: embed-container;

		:global(.transition-video-to-video) & {
			view-transition-name: none;
		}

		& > * {
			grid-area: 1 / 1;
		}
	}
</style>
