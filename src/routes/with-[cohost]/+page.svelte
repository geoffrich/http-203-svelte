<script>
	import CohostSwitch from '$lib/CohostSwitch.svelte';
	import { page } from '$app/stores';
	import VideoList from '$lib/VideoList.svelte';
	import { getContext } from 'svelte';

	const videos = getContext('videos');

	$: selectedCohost = $page.params.cohost;
	$: filteredVideos = Object.fromEntries(
		Object.entries(videos).filter(([_, data]) => data.cohost.toLowerCase() === selectedCohost)
	);
</script>

<svelte:head>
	<title>HTTP 203 - {selectedCohost[0].toUpperCase() + selectedCohost.slice(1)}</title>
</svelte:head>

<div>
	<CohostSwitch {selectedCohost} />
	<VideoList videos={filteredVideos} />
</div>
