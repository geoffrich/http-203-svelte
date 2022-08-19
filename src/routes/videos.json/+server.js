import { json } from '@sveltejs/kit';
import videos from '$lib/video-data';

// return from an endpoint so we can process the JSON server side
export const GET = function () {
	return json(videos);
};
