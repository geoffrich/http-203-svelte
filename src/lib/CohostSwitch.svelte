<script>
	import { cohosts } from '$lib/data';
	/** @type {string?} */
	export let selectedCohost = null;
</script>

<ol class="cohost-switch">
	<li class:current-cohost={!selectedCohost}>
		<a href="/">All</a>
	</li>
	{#each cohosts as cohost}
		<li class:current-cohost={selectedCohost === cohost.toLowerCase()}>
			<a href={`/with-${cohost.toLowerCase()}/`}>{cohost}</a>
		</li>
	{/each}
</ol>

<style lang="postcss">
	.cohost-switch {
		display: flex;
		flex-flow: row wrap;
		padding: 0;
		margin: 0 auto;
		margin-top: var(--content-padding);
		background: var(--white);
		padding: 0.3rem 0.4rem;
		width: fit-content;
		border-radius: 19px;

		& > * {
			display: block;
		}

		& a {
			color: var(--primary-color);
			display: block;
			padding: 0.1rem 0.9rem;
			border-radius: 1000px;
		}
	}

	.current-cohost {
		& a {
			background: var(--primary-color);
			color: #fff;
		}
	}
</style>
