<script>
	import 'lite-youtube-embed/src/lite-yt-embed.css';
	import { onMount } from 'svelte';

	export let video;

	onMount(() => {
		import('lite-youtube-embed/src/lite-yt-embed');
	});
</script>

<div class="embed-container">
	{#key video.id}
		<lite-youtube videoid={video.id} class="embed" />
	{/key}
</div>

<style lang="postcss">
	lite-youtube {
		max-width: unset;
	}

	.embed {
		display: block;
		aspect-ratio: 16/9;
		width: 100%;
		height: auto;
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
