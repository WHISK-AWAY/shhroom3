require('dotenv').config();
const CLIENT_URL = process.env.CLIENT_URL;

const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').Server(app);
const path = require('path');

const { ZodError } = require('zod');
const { fromZodError } = require('zod-validation-error');

const io = require('socket.io')(server, {
  cors: {
    origin: CLIENT_URL,
  },
});

app.use(express.static('public'));
app.use(express.json());
app.use(
  cors({
    origin: CLIENT_URL,
  }),
);

app.use('/api', require('./api/apiRoute.cjs'));

// app.use('*', (req, res, next) => {
//   res.status(200).sendFile(path.join(__dirname, '../public/index.html'));
// });

// * Zod validation error handler
app.use((err, req, res, next) => {
  if (err instanceof ZodError) {
    console.error(err);
    const validationError = fromZodError(err);
    return res.status(400).json({ message: validationError.message });
  }
  next(err);
});

const roomList = [];

io.on('connection', (socket) => {
  socket.on('room-created', (roomId) => {
    roomList.push(roomId);
    console.log('server heard "room connected"');
    io.emit('room-list', roomList);
  });

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

async function init() {
  console.log('Allowing CORS traffic from ' + CLIENT_URL);

  server.listen(3002, () => {
    console.log('WS server listening at', 3002);
  });
  app.listen(3000, () => {
    console.log('HTTP server listening at', 3000);
  });
}

init();
