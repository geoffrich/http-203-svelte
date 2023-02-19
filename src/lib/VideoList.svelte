<script>
	import {
		TransitionType,
		beforePageTransition,
		afterPageTransition,
		whileIncomingTransition
	} from './page-transition';

	import { formatDate, ytSrcset } from './utils';
	/** @type {Record<string, import('./types').Video>}*/
	export let videos;

	/** @type {HTMLElement[]} */
	let elementsToCleanup = [];

	/** @type {Record<string, HTMLElement>} */
	let thumbElements = {};
	/** @type {Record<string, HTMLElement>} */
	let metaElements = {};

	beforePageTransition(({ to, type }) => {
		if (type === TransitionType.ThumbsToVideo) {
			/** @type {HTMLElement?} */
			const thumb = thumbElements[to.pathname];
			/** @type {HTMLElement?} */
			const details = metaElements[to.pathname];

			if (thumb && details) {
				elementsToCleanup.push(thumb, details);
				thumb.style.viewTransitionName = 'embed-container';
				details.style.viewTransitionName = 'video-details';
			}
		}
	});

	whileIncomingTransition(({ from, type }) => {
		if (type === TransitionType.VideoToThumbs) {
			// limited by the fact that it needs to work synchronously
			// any component state needs to wait a tick to apply, and we don't have that time
			// so we need to interact with the DOM elements directly

			/** @type {HTMLElement?} */
			const thumb = thumbElements[from.pathname];
			/** @type {HTMLElement?} */
			const details = metaElements[from.pathname];

			if (thumb && details) {
				elementsToCleanup.push(thumb, details);
				thumb.style.viewTransitionName = 'embed-container';
				details.style.viewTransitionName = 'video-details';
			}
		}
	});

	afterPageTransition(() => {
		while (elementsToCleanup.length) {
			const el = elementsToCleanup.pop();
			if (el) {
				el.style.viewTransitionName = '';
			}
		}
	});
</script>

<ol class="video-list">
	{#each Object.entries(videos) as [slug, video] (video.id)}
		{@const href = `/videos/${slug}`}
		<li>
			<a class="video-link" {href}>
				<img
					class="video-thumb"
					srcset={ytSrcset(video.id)}
					alt={video.title}
					bind:this={thumbElements[href]}
				/>
				<p class="video-meta" bind:this={metaElements[href]}>
					<time>{formatDate(new Date(video.published))}</time>
				</p>
			</a>
		</li>
	{/each}
</ol>

<style lang="postcss">
	.video-list {
		display: grid;
		margin: 0;
		padding: var(--content-padding);
		grid-template-columns: var(--video-list-columns, repeat(auto-fill, minmax(300px, 1fr)));
		gap: var(--content-padding);
		background: var(--divider);
		grid-auto-flow: var(--video-list-auto-flow);
		grid-auto-columns: var(--video-list-auto-columns);
		grid-auto-rows: var(--video-list-auto-rows);

		& > li {
			display: block;
			box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
		}
	}

	.video-thumb {
		width: 100%;
		height: auto;
		display: block;
		aspect-ratio: 16 / 9;
		object-fit: cover;
		object-position: center;
		contain: paint;
	}

	.video-meta {
		background: var(--white);
		margin: 0;
		padding: 0.4rem 1rem;
		contain: paint;
	}

	.video-link {
		color: inherit;

		&:hover {
			text-decoration: none;
		}
	}
</style>
