<script>
	import CohostSwitch from '$lib/CohostSwitch.svelte';
	import { page } from '$app/stores';
	import VideoList from '$lib/VideoList.svelte';

	// TODO: type this properly (waiting on https://github.com/sveltejs/kit/issues/5951 ?)
	const videos = $page.data.videos;

	$: selectedCohost = $page.params.cohost;
</script>

<svelte:head>
	<title>HTTP 203</title>
</svelte:head>

<div>
	<CohostSwitch {selectedCohost} />
	<VideoList {videos} />
</div>
