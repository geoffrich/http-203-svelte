<script>
	import { pageTransitionType, TransitionType } from './page-transition';

	import { formatDate, ytSrcset } from './utils';
	export let videos;
</script>

<ol class="video-list">
	{#each Object.entries(videos) as [slug, video]}
		<li>
			<a class="video-link" href={`/videos/${slug}/`}>
				<img
					class="video-thumb"
					srcset={ytSrcset(video.id)}
					alt={video.title}
					style:page-transition-tag={$pageTransitionType === TransitionType.ThumbsToVideo
						? 'embed-container'
						: ''}
				/>
				<p
					class="video-meta"
					style:page-transition-tag={$pageTransitionType === TransitionType.ThumbsToVideo
						? 'video-details'
						: ''}
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
