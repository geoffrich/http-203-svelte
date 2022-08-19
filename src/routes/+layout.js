import videos from '$lib/video-data';

/** @type { import('./$types').LayoutLoad} */
export const load = async () => {
	// TODO: move to layout.server so we can process the JSON server side
	// waiting on https://github.com/sveltejs/kit/pull/6056 to not re-run server load every pageload
	return {
		videos
	};
};
