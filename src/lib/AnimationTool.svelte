<script>
	import { browser } from '$app/env';

	let duration = 300;
	let override = false;

	$: if (browser) {
		if (override) {
			document.documentElement?.style.setProperty('--animation-duration', `${duration}ms`);
		} else {
			document.documentElement?.style.removeProperty('--animation-duration');
		}
	}
</script>

<div>
	<label
		>Override animation duration ({duration})
		<input type="checkbox" bind:checked={override} /></label
	>
	<label>Duration<input type="range" min="0" max="2000" bind:value={duration} /></label>
</div>

<style>
	div {
		position: fixed;
		bottom: 0;
		right: 0;
		padding: 1rem;
		background: white;
	}
	label {
		display: block;
	}
</style>
