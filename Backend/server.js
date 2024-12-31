const http = require('http');
const app = require('./app');
const {initializeSocket} = require('./socket')
const port = process.env.PORT || 4001

const server = http.createServer(app);

initializeSocket(server);

server.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});

// The HTTP server is created and listens on the specified port.
// Socket.IO is attached to this server and waits for client connections.
// When a client connects, it logs the connection ID (socket.id).
// You can send messages to specific clients using their socketId.
// When a client disconnects, it logs a disconnect message.