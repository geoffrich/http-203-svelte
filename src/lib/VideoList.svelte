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

	let navigationTarget = '';

	beforePageTransition(({ to, type }) => {
		if (type === TransitionType.ThumbsToVideo) {
			navigationTarget = to.pathname;
		}
	});

	whileIncomingTransition(({ from, type }) => {
		if (type === TransitionType.VideoToThumbs) {
			navigationTarget = from.pathname;
		}
	});

	afterPageTransition(() => {
		navigationTarget = '';
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
					style:view-transition-name={navigationTarget === href ? 'embed-container' : ''}
				/>
				<p
					class="video-meta"
					style:view-transition-name={navigationTarget === href ? 'video-details' : ''}
				>
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
