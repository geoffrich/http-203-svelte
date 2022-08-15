import videos from '$lib/video-data';

/** @type {import('./__types/with-[cohost]').RequestHandler} */
export const GET = function (event) {
	const cohost = event.params.cohost;
	const filteredVideos = Object.fromEntries(
		Object.entries(videos).filter(([_, data]) => data.cohost.toLowerCase() === cohost)
	);
	return { body: { videos: filteredVideos } };
};
