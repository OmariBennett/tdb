<!-- http://localhost:3000/socket.io/ -->
<script>
	// @ts-check
	import { onDestroy } from 'svelte';
	import io from 'socket.io-client';

	const socket = io('http://localhost:3000');
	// const ENDPOINT = 'http://localhost:3000';
	// const FILE_NAME = 'test file';

	// @ts-ignore
	let messages = ['apple'];
	let message = '';

	socket.on('chat message', (data) => {
		// @ts-ignore
		messages = [...messages, data];
	});

	function sendMessage() {
		socket.emit('chat message', message);
		message = '';
	}

	// onDestroy(() => {
	// 	console.log('the component is being destroyed');
	// });
	const handleSubmit = () => {
		// console.log(FILE_NAME);
	};
</script>

<!-- !Cross-Origin Request Blocked: -->
<!-- The Same Origin Policy disallows reading the remote resource at  -->
<!-- http://localhost:3000/socket.io/?EIO=4&transport=polling&t=ODs-Eca. -->
<!-- (Reason: CORS header ‘Access-Control-Allow-Origin’ missing). -->
<!-- Status code: 200. -->

<!-- ?(issue): console output on the client server -->
<!-- !Cross-Origin Request Blocked: -->
<!-- ?(why): The Same Origin Policy disallows reading the remote resource at http://localhost:3000/socket.io/  -->
<!-- *(Reason: CORS header ‘Access-Control-Allow-Origin’ missing). -->

<svelte:head>
	<title>Budget App</title>
</svelte:head>

<main>
	<h1>Budget App</h1>
	<ul>
		{#each messages as message}
			<li>
				{message}
			</li>
		{/each}
	</ul>

	<form on:submit|preventDefault={sendMessage} action="" method="get">
		<label for="inbox">Submit message</label>
		<input bind:value={message} placeholder="Message..." type="text" />
		<button on:click={sendMessage}>Send</button>
	</form>
</main>

{message}

<style>
	h1 {
		color: indigo;
	}
</style>
