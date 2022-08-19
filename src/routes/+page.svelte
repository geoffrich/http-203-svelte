<script>
	import CohostSwitch from '$lib/CohostSwitch.svelte';
	import { page } from '$app/stores';
	import VideoList from '$lib/VideoList.svelte';
	import { getContext } from 'svelte';

	const videos = getContext('videos');

	$: selectedCohost = $page.params.cohost;
</script>

<svelte:head>
	<title>HTTP 203</title>
</svelte:head>

<div>
	<CohostSwitch {selectedCohost} />
	<VideoList {videos} />
</div>
