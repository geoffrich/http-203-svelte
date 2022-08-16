<script>
	import {
		TransitionType,
		beforePageTransition,
		afterPageTransition,
		whileIncomingTransition
	} from './page-transition';

	import { formatDate, ytSrcset } from './utils';
	export let videos;

	/** @type {HTMLElement} */
	let list;

	/** @type {HTMLElement[]} */
	let elementsToCleanup = [];

	beforePageTransition(({ to, type }) => {
		if (type === TransitionType.ThumbsToVideo) {
			/** @type {HTMLElement?} */
			const thumb = list.querySelector(`a[href="${to.pathname}"] .video-thumb`);
			/** @type {HTMLElement?} */
			const details = list.querySelector(`a[href="${to.pathname}"] .video-meta`);

			if (thumb && details) {
				elementsToCleanup.push(thumb, details);
				thumb.style.pageTransitionTag = 'embed-container';
				details.style.pageTransitionTag = 'video-details';
			}
		}
	});

	whileIncomingTransition(({ from, type }) => {
		if (type === TransitionType.VideoToThumbs) {
			// TODO: make this state driven?
			// limited by the fact that it needs to work synchronously
			// any component state needs to wait a tick to apply, and we don't have that time
			// so we need to interact with the DOM elements directly
			// at the least, bind directly to the element to avoid scoping issues

			/** @type {HTMLElement?} */
			const thumb =
				list.querySelector(`a[href="${from.pathname}"] .video-thumb`) ||
				list.querySelector('.video-thumb');
			/** @type {HTMLElement?} */
			const details =
				list.querySelector(`a[href="${from.pathname}"] .video-meta`) ||
				list.querySelector('.video-thumb');

			if (thumb && details) {
				elementsToCleanup.push(thumb, details);
				thumb.style.pageTransitionTag = 'embed-container';
				details.style.pageTransitionTag = 'video-details';
			}
		}
	});

	afterPageTransition(({ from, to }) => {
		while (elementsToCleanup.length) {
			const el = elementsToCleanup.pop();
			if (el) {
				el.style.pageTransitionTag = '';
			}
		}
	});
</script>

<ol class="video-list" bind:this={list}>
	{#each Object.entries(videos) as [slug, video]}
		<li>
			<a class="video-link" href={`/videos/${slug}`}>
				<img class="video-thumb" srcset={ytSrcset(video.id)} alt={video.title} />
				<p class="video-meta">
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
