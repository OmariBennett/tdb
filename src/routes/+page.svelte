<script>
	// @ts-check
	// import Budget from '../components/Budget.svelte';
	import Notes from '../components/Notes.svelte';
</script>

<main>
	<Notes />
</main>

<style>
	:global(*) {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		outline: 1px solid;
	}
	:global(body) {
		background-color: hsl(0, 0%, 85%);
	}
	main {
		padding: 1rem;
	}
</style>
