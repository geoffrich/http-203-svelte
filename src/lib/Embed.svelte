<script>
	import { ytSrcset } from '$lib/utils';

	export let video;

	let renderIframe = true;
	let iframeReady = false;
</script>

<div class="embed-container">
	<!-- We need the #key to avoid updating the history stack when src changes -->
	{#key video.id}
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
	{/key}
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
		page-transition-tag: embed-container;

		:global(.transition-video-to-video) & {
			page-transition-tag: none;
		}

		& > * {
			grid-area: 1 / 1;
		}
	}
</style>
