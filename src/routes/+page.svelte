<script>
	import Switch from '$lib/Switch.svelte';
	import { page } from '$app/stores';
	import VideoList from '$lib/VideoList.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {import('./$types').Snapshot} */
	export const snapshot = {
		capture: () => window.scrollY,
		// restore scroll position when navigating back
		restore: (scrollY) => window.scrollTo({ top: scrollY })
	};
</script>

<svelte:head>
	<title>Svelte Summit</title>
</svelte:head>

<div>
	<Switch selectedYear={$page.params.year} />
	<VideoList videos={data.videos} />
</div>
