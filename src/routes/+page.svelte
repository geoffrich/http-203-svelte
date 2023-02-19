<script>
	import Switch from '$lib/Switch.svelte';
	import { page } from '$app/stores';
	import VideoList from '$lib/VideoList.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>Svelte Summit</title>
</svelte:head>

<div>
	<Switch selectedYear={$page.params.year} />
	<VideoList videos={data.videos} />
</div>
