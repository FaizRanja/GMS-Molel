const net = require('net');

const SERVER_PORT = 8888;
const SERVER_IP = '0.0.0.0'; // Listen on all interfaces

// Create a TCP server
const server = net.createServer((socket) => {
  console.log('🌐 Client connected:', socket.remoteAddress, socket.remotePort);

  // Handle incoming data
  socket.on('data', (data) => {
    console.log('📥 Received data:', data.toString());
  });

  // Handle client disconnection
  socket.on('end', () => {
    console.log('❌ Client disconnected');
  });

  // Handle errors
  socket.on('error', (err) => {
    console.log('❌ Socket error:', err.message);
  });
});

// Start the server
server.listen(SERVER_PORT, SERVER_IP, () => {
  console.log(`🚀 Server is listening on ${SERVER_IP}:${SERVER_PORT}`);
});

// Handle server errors
server.on('error', (err) => {
  console.log('❌ Server error:', err.message);
});