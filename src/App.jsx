import { Routes, Route } from "react-router-dom";
import { Room, Lobby, Homepage, Navbar, Signin } from "./components";
import { io } from "socket.io-client";

const socket = io("ws://localhost:3002/");

export default function App() {
  return (
    <div className="home-view h-screen overflow-hidden bg-dark-purple000 bg-gradient-to-r from-black via-dark-purple00 to-dark-purple5 text-white animate-gradient-x">
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/room" element={<Room socket={socket} />} />
        <Route path="/room/:roomId" element={<Room socket={socket} />} />
        <Route path="/lobby" element={<Lobby socket={socket} />} />
      </Routes>
    </div>
  );
}
