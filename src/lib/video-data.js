import _2020 from './data/2020.json';
import _2021 from './data/fall-2021.json';
import _2022 from './data/spring-2022.json';

import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

function processPlaylist(data, category) {
	return data.map((dataItem) => {
		const title = dataItem.snippet.title;

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
				published: dataItem.snippet.publishedAt,
				category
			}
		];
	});
}

function processData() {
	const entries = [
		...processPlaylist(_2022, '2022'),
		...processPlaylist(_2021, '2021'),
		...processPlaylist(_2020, '2020')
	];

	const processedData = Object.fromEntries(entries);
	return processedData;
}

const videos = processData();

export default videos;
