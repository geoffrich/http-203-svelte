<script>
	import Switch from '$lib/Switch.svelte';
	import { page } from '$app/stores';
	import VideoList from '$lib/VideoList.svelte';

	// TODO: type this properly (waiting on https://github.com/sveltejs/kit/issues/5951 ?)
	const videos = $page.data.videos;

	$: selectedYear = $page.params.year;
</script>

<svelte:head>
	<title>Svelte Summit</title>
</svelte:head>

<div>
	<Switch {selectedYear} />
	<VideoList {videos} />
</div>
