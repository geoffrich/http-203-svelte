export interface JSONVideo {
	snippet: {
		title: string;
		resourceId: {
			videoId: string;
		};
		description: string;
		publishedAt: string;
	};
}

export interface Video {
	id: string;
	title: string;
	description: string;
	published: string;
	category: string;
}
