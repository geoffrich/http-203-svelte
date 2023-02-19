<script>
	import Switch from '$lib/Switch.svelte';
	import { page } from '$app/stores';
	import VideoList from '$lib/VideoList.svelte';

	const videos = $page.data.videos;

	$: selectedYear = $page.params.year;
	$: filteredVideos = Object.fromEntries(
		Object.entries(videos).filter(([_, data]) => data.category === selectedYear)
	);
</script>

<svelte:head>
	<title>Svelte Summit - {selectedYear}</title>
</svelte:head>

<div>
	<Switch {selectedYear} />
	<VideoList videos={filteredVideos} />
</div>
