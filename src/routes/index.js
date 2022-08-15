import videos from '$lib/video-data';

/** @type {import('./__types').RequestHandler} */
export const GET = function () {
	return { body: { videos } };
};
