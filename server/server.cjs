require("dotenv").config();
const SECRET = process.env.JWT;
const CLIENT_URL = process.env.CLIENT_URL;

const express = require("express");
const app = express();
const cors = require("cors");
const server = require("http").Server(app);
const path = require("path");
const { User, syncAndSeed } = require("./db/db.cjs");

const io = require("socket.io")(server, {
  cors: {
    origin: CLIENT_URL,
  },
});

app.use(express.static("public"));
app.use(express.json());
app.use(
  cors({
    origin: CLIENT_URL,
  }),
);

async function requireToken(req, res, next) {
  try {
    const token = req.headers.authorization;
    const user = await User.verifyByToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

app.post("/api/auth", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    res.send({ token: await User.authenticate({ username, password }) });
  } catch (err) {
    next(err);
  }
});

app.get("/api/auth", requireToken, (req, res, next) => {
  try {
    res.send(req.user);
  } catch (err) {
    next(err);
  }
});

app.put("/api/user/:userId", requireToken, async (req, res, next) => {
  try {
    // need to store user's public key in the database
    const { publicKey } = req.body;
    const { userId } = req.params;

    await User.update({ publicKey: publicKey }, { where: { id: userId } });

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

app.use("*", (req, res, next) => {
  res.status(200).sendFile(path.join(__dirname, "../public/index.html"));
});

const roomList = [];

io.on("connection", (socket) => {
  socket.on("room-created", (roomId) => {
    roomList.push(roomId);
    console.log('server heard "room connected"');
    io.emit("room-list", roomList);
  });

  console.log("hello form server");

  socket.on("new-lobby", () => {
    console.log("new lobby joined");
    socket.emit("room-list", roomList);
  });

  socket.on("join-room", (peerId, roomId, userId, publicKey) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-connected", peerId, userId, publicKey);

    socket.on("disconnect", () => {
      socket.to(roomId).emit("user-disconnected", peerId, userId);
    });
  });
});

async function init() {
  await syncAndSeed();

  console.log("Allowing CORS traffic from " + CLIENT_URL);

  server.listen(3002, () => {
    console.log("WS server listening at", 3002);
  });
  app.listen(3000, () => {
    console.log("HTTP server listening at", 3000);
  });
}

init();
