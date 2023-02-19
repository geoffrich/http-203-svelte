<script>
	import Switch from '$lib/Switch.svelte';
	import { page } from '$app/stores';
	import VideoList from '$lib/VideoList.svelte';

	/** @type {import('./$types').PageData} */
	export let data;

	/** @type {HTMLElement} */
	let container;

	/** @type {import('./$types').Snapshot} */
	export const snapshot = {
		capture: () => {
			// we need to manually restore the scroll of the parent element
			// SvelteKit won't, because it's not the window scroll
			// TODO: is this better in an afterNavigate/afterTransition?
			return container.parentElement?.scrollTop;
		},
		restore: (scrollTop) => {
			if (container.parentElement) {
				container.parentElement.scrollTop = scrollTop;
			}
		}
	};
</script>

<svelte:head>
	<title>Svelte Summit</title>
</svelte:head>

<div bind:this={container}>
	<Switch selectedYear={$page.params.year} />
	<VideoList videos={data.videos} />
</div>
