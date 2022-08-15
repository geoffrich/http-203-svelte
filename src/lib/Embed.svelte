<script>
	import { afterNavigate, beforeNavigate } from '$app/navigation';

	import { ytSrcset } from '$lib/utils';

	export let video;

	let renderIframe = true;
	let iframeReady = false;

	// beforeNavigate(() => {
	// 	renderIframe = false;
	// });

	// afterNavigate(() => {
	// 	renderIframe = true;
	// });

	/* // TODO: not sure if I need an equivalent
    useEffect(() => {
    if (!globalThis.ongoingTransition) return;

    globalThis.ongoingTransition
        .then(() => {
        setRenderIframe(true);
        })
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        .catch(() => {});
    }, []);
    */
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
		page-transition-tag: embed-container;

		:global(.transition-video-to-video) & {
			page-transition-tag: none;
		}

		& > * {
			grid-area: 1 / 1;
		}
	}
</style>
