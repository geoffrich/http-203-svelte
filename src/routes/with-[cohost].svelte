<script>
	import CohostSwitch from '$lib/CohostSwitch.svelte';
	import { page } from '$app/stores';
	import VideoList from '$lib/VideoList.svelte';

	export let videos;

	$: selectedCohost = $page.params.cohost;
</script>

<svelte:head>
	<title>HTTP 203 - {selectedCohost[0].toUpperCase() + selectedCohost.slice(1)}</title>
</svelte:head>

<div>
	<CohostSwitch {selectedCohost} />
	<VideoList {videos} />
</div>
