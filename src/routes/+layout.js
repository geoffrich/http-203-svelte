/** @type { import('./$types').LayoutLoad} */
export const load = async ({ fetch }) => {
	// fetch in the layout and throw into a context since a bunch of disparate endpoints need this data
	// layout endpoint/$data store will make this easier
	const videos = await fetch('/videos.json').then((v) => v.json());
	return {
		videos
	};
};
