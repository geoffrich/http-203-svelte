const ytImageSizes = [
	[320, 'mq'],
	[480, 'hq'],
	[640, 'sd'],
	[1280, 'maxres']
];

/**
 * @param {string} id
 * @returns {string}
 */
export function ytSrcset(id) {
	return ytImageSizes
		.map(([width, urlPart]) => `https://i.ytimg.com/vi/${id}/${urlPart}default.jpg ${width}w`)
		.join(', ');
}

/**
 * @param {Date} date
 * @returns {string}
 */
export function formatDate(date) {
	return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
		.getDate()
		.toString()
		.padStart(2, '0')}`;
}
