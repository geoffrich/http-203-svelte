import data from './data.json';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

// TODO: use Svelte Society data
function processData() {
	const entries = data.map((dataItem) => {
		const title = dataItem.snippet.title
			.replace(/ [-|] HTTP ?203( Advent)?$/, '')
			.replace(/^HTTP 203: /, '')
			.replace(/ \(S\d, Ep\d\)$/, '');

		return [
			title
				.replace(/[^a-z0-9 ]/gi, '')
				.replace(/\s+/gi, '-')
				.toLowerCase(),
			{
				id: dataItem.snippet.resourceId.videoId,
				title,
				description: DOMPurify.sanitize(
					marked.parse(dataItem.snippet.description, {
						gfm: true,
						breaks: true
					})
				),
				published: dataItem.snippet.publishedAt
			}
		];
	});

	const firstAdaVid = 'F-rZOIBGIaQ';
	const firstSurmaVid = 'PYSOnC2CrD8';
	const firstPaulVid = 'k2DRz0KIZAU';
	const firstAdaIndex = entries.findIndex((entry) => entry[1].id === firstAdaVid);
	const firstSurmaIndex = entries.findIndex((entry) => entry[1].id === firstSurmaVid);
	const firstPaulIndex = entries.findIndex((entry) => entry[1].id === firstPaulVid);

	for (const [index, entry] of entries.entries()) {
		if (index < firstAdaIndex) {
			entry[1].cohost = 'Cassie';
		} else if (index < firstSurmaIndex) {
			entry[1].cohost = 'Ada';
		} else if (index < firstPaulIndex) {
			entry[1].cohost = 'Surma';
		} else {
			entry[1].cohost = 'Paul';
		}
	}

	const processedData = Object.fromEntries(entries);
	return processedData;
}

const videos = processData();

export default videos;
