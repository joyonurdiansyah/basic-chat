const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {});

// Serve static files from the 'asset' directory
app.use(express.static('asset'));

// Serve the static HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

let countUserOnline = 1;

io.on('connection', (socket) => {
    console.log('user connected');
    countUserOnline++;
    io.emit('countUserOnline', countUserOnline);  // Send updated user count

    // Handle join event
    socket.on('join', (param) => {
        console.log('user joined');
    });

    // Handle message event
    socket.on('message', (param) => {
        console.log('user sent a message');
        io.emit('message', param);  // Broadcast the message
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('user disconnected');
        countUserOnline--;
        io.emit('countUserOnline', countUserOnline);  // Send updated user count
    });
});

// Listen on port 3000
server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
