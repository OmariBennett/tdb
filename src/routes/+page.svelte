<!-- <script context="module">
  export const FILE_NAME = 'test file';

</script> -->
<script>
	// import { createFolder } from '../project/csv/budget/index';
	const FILE_NAME = 'test file';

	const init = () => {
		console.log(FILE_NAME);
		// createFolder(FILE_NAME);
	};
</script>

<h1>Budget App</h1>
<input type="button" name="init" id="init" value="Init program" on:click={init} />
