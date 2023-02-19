import videos from '$lib/video-data';

export const prerender = true;

/** @type { import('./$types').LayoutServerLoad} */
export const load = async () => {
	return {
		videos
	};
};
