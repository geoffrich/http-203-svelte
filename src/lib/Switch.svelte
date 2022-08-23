<script>
	/** @type {string?} */
	export let selectedYear = null;
</script>

<ol class="year-switch">
	<li class:current-year={!selectedYear}>
		<a href="/">All</a>
	</li>
	{#each ['2022', '2021', '2020'] as year}
		<li class:current-year={selectedYear === year}>
			<a href={`/summit-${year}/`}>{year}</a>
		</li>
	{/each}
</ol>

<style lang="postcss">
	.year-switch {
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

	.current-year {
		& a {
			background: var(--primary-color);
			color: #fff;
		}
	}
</style>
