import videos from '$lib/video-data';

/** @type {import('./__types/[slug]').RequestHandler} */
export const GET = function (event) {
	// TODO: return all videos and individual video based on slug
	// should this be happening in an endpoint or on the client?
	return { body: { videos, video: videos[event.params.slug] } };
};
