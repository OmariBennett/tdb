// @ts-check
/*  Problem Solving: If I had an hour to solve a problem, I'd spend 55 minutes thinking about the problem and 5 minutes thinking about solutions." -Albert Einstein */

//  Problem Solving Steps:
//    Step  1. Identify - the first step is to identify and understand the nature of the problem
//    Step  2. Research & Refine - At this step you should have a main problem broken down into a few subproblem
//    Step  3. Pseudocode
//     todo    - focus on logic, NOT syntax
//*            - added benefit of writing pseudocode is that you can focus naming things before your code gets
//*              filled up with a bunch of other syntax
//     todo    - goal is to write an outline for how you will implement your code
//*            - the idea is that you focus onto logic of your code without having to worry about the syntax or
//*              implementiation details

// 						 Display CSV data from the backend server to the front-end
//		step	A2		Set up express server
import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
//		todo [ ]			Serving HTML
app.get('/', (req, res) => {
	res.send('<h1>Hello world</h1>');
});

//		todo [ ]			Integrating Socket.IO
// io.on('connection', (socket) => {
// 	console.log('a user connected');
// 	socket.on('disconnect', () => {
// 		console.log('user disconnected');
// 	});
// });

io.on('connection', (socket) => {
	console.log('a user connected');
	socket.on('chat message', (msg) => {
		console.log('message: ' + msg);
		io.emit('chat message', msg);
	});
});

server.listen(3000, () => {
	console.log('listening on *:3000');
});

//		todo [ ]   			Emitting events
//		todo [ ] 				Broadcasting
//		step	A1		Load data from the CSV file

//    Step 4. Test-Driven Development (TDD)
//    Step 5. Implement
//     todo    - try to get it done as quicky as possible
//*            - "Done is better than perfect"
//     todo    - have all your test passing and have a working prototype in the least amount of time as possible
//todo           even if the code is not perfect
//*            - the reason for that is psychological Solving a big problem is a collection of small staps
//    Step 6. Practice
//*            - "To become really good at anything, you have to practice and repeat, practice and repeat,
//*               until the technique becomes intuitive."
//    Step 7. Repeat
