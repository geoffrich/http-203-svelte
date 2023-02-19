import _2020 from './data/2020.json';
import _2021 from './data/fall-2021.json';
import _2022 from './data/spring-2022.json';

import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

/**
 * @param {import('./types').JSONVideo[]} data
 * @param {string} category
 */
function processPlaylist(data, category) {
	/** @type {Record<string, import('./types').Video>} */
	const processed = {};
	return data.reduce((acc, dataItem) => {
		const title = dataItem.snippet.title;
		const slug = title
			.replace(/[^a-z0-9 ]/gi, '')
			.replace(/\s+/gi, '-')
			.toLowerCase();
		acc[slug] = {
			id: dataItem.snippet.resourceId.videoId,
			title,
			description: DOMPurify.sanitize(
				marked.parse(dataItem.snippet.description, {
					gfm: true,
					breaks: true
				})
			),
			published: dataItem.snippet.publishedAt,
			category
		};
		return acc;
	}, processed);
}

function processData() {
	const processedData = {
		...processPlaylist(_2022, '2022'),
		...processPlaylist(_2021, '2021'),
		...processPlaylist(_2020, '2020')
	};

	return processedData;
}

const videos = processData();

export default videos;
