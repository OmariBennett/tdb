// @ts-check
import { writable } from 'svelte/store';
import { io } from 'socket.io-client';

const socket = io();

const messageStore = writable('');

function sendMessage(message) {
	console.log(message);
	// socket.emit('chat message', message);
}

export default {
	sendMessage,
	unsubscribe: messageStore.subscribe((value) => {
		console.log(value);
	})
};
