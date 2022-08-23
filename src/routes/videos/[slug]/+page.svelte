<script>
	import Embed from '$lib/Embed.svelte';
	import VideoList from '$lib/VideoList.svelte';
	import { formatDate } from '$lib/utils';
	import { page } from '$app/stores';

	const videos = $page.data.videos;
	$: video = videos[$page.params.slug];
</script>

<svelte:head>
	<title>{video.title} - Svelte Summit</title>
</svelte:head>

<div class="video-layout">
	<div class="video-and-details">
		<Embed {video} />

		<div class="video-details">
			<h1 class="video-title">{video.title}</h1>
			<time>{formatDate(new Date(video.published))}</time>
			<div class="description">{@html video.description}</div>
		</div>
	</div>
	<div class="scroller">
		<VideoList {videos} />
	</div>
</div>

<style lang="postcss">
	.video-layout {
		display: grid;
		grid-template-rows: min-content 1fr;

		@media (min-width: 900px) {
			grid-template-columns: 1fr 230px;
			grid-template-rows: none;
			height: 100%;
		}
	}

	.video-and-details {
		@media (min-width: 900px) {
			overflow-x: hidden;
			overflow-y: auto;
			display: grid;
			grid-template-rows: max-content minmax(max-content, 1fr);
		}
	}

	.video-details {
		padding: var(--content-padding);
		background: var(--white);
		overflow: hidden;
		contain: paint;
		page-transition-tag: video-details;

		:global(.transition-video-to-video) & {
			page-transition-tag: none;
		}
	}

	.video-title {
		font-weight: 600;
		margin: 0;
		font-size: 1.6rem;
		max-width: 43ch;
	}

	.description {
		max-width: 67ch;
		line-height: 1.6;
	}

	.scroller {
		overflow-x: auto;
		overflow-y: hidden;
		contain: paint;
		page-transition-tag: related-videos;
		min-height: 159px;
		--video-list-columns: none;
		--video-list-auto-flow: column;
		--video-list-auto-columns: 135px;
		background: var(--divider);
		display: grid;
		align-items: start;

		@media (min-width: 900px) {
			height: auto;
			--video-list-auto-flow: row;
			--video-list-auto-columns: auto;
			--video-list-auto-rows: auto;
			overflow-x: hidden;
			overflow-y: auto;
		}
	}
</style>
