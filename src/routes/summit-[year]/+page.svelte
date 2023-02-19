<script>
	import Switch from '$lib/Switch.svelte';
	import { page } from '$app/stores';
	import VideoList from '$lib/VideoList.svelte';

	const videos = $page.data.videos;

	$: selectedYear = $page.params.year;
	$: filteredVideos = Object.fromEntries(
		Object.entries(videos).filter(([_, data]) => data.category === selectedYear)
	);

	/** @type { HTMLElement}  */
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
	<title>Svelte Summit - {selectedYear}</title>
</svelte:head>

<div bind:this={container}>
	<Switch {selectedYear} />
	<VideoList videos={filteredVideos} />
</div>
