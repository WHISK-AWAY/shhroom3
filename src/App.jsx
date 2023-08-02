import { Routes, Route } from 'react-router-dom';
import {
  Room,
  Lobby,
  Homepage,
  Navbar,
  Signin,
  SignUp,
  Landing,
} from './components';
import { io } from 'socket.io-client';

const WS_URL = import.meta.env.VITE_WS_URL;

const socket = io(WS_URL);

export default function App() {
  return (
    <div className='home-view h-screen overflow-hidden bg-dark-purple000 bg-gradient-to-r from-black via-dark-purple00 to-dark-purple5 text-white animate-gradient-x'>
      <Navbar />

      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/room' element={<Room socket={socket} />} />
        <Route path='/room/:roomId' element={<Room socket={socket} />} />
        <Route path='/lobby' element={<Lobby socket={socket} />} />
      </Routes>
    </div>
  );
}
