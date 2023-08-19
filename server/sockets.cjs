const CLIENT_URL = process.env.CLIENT_URL;
const WS_PORT = process.env.WS_PORT || 3002;

const expressApp = require('./server.cjs');
const server = require('http').Server(expressApp);

const io = require('socket.io')(server, {
  cors: {
    origin: require('./corsOriginTest.cjs'),
  },
});

const roomList = [];

io.on('connection', (socket) => {
  socket.on('room-created', (roomId) => {
    roomList.push(roomId);
    console.log('server heard "room connected"');
    io.emit('room-list', roomList);
  });

  // this isn't necessary, but I've grown to like seeing it
  console.log('hello form server');

  socket.on('new-lobby', () => {
    console.log('new lobby joined');
    socket.emit('room-list', roomList);
  });

  socket.on('join-room', (params) => {
    const { peerId, roomId, userId, publicKey, username } = params;
    console.log('join-room received');
    socket.join(roomId);
    socket.to(roomId).emit('user-connected', peerId, userId, publicKey);

    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', peerId, userId);
    });
    socket.on('leave-room', () => {
      socket.to(roomId).emit('user-disconnected', peerId, userId);
    });
  });
});

function init() {
  server.listen(WS_PORT, () => {
    console.log('WS server listening at', WS_PORT);
  });
}

init();
