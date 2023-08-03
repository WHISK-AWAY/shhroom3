import { Routes, Route } from 'react-router-dom';
import {
  Room,
  Lobby,
  Homepage,
  Navbar,
  Signin,
  SignUp,
  Landing,
  Screensaver,
  LoadingScreen
} from './components';
import { io } from 'socket.io-client';

const WS_URL = import.meta.env.VITE_WS_URL;

const socket = io(WS_URL);

export default function App() {
  return (
    <div className='home-view h-screen overflow-hidden w-screen '>

      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='/loading' element={<LoadingScreen />} />
        <Route path='/screensaver' element={<Screensaver/>}/>
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/room' element={<Room socket={socket} />} />
        <Route path='/room/:roomId' element={<Room socket={socket} />} />
        <Route path='/lobby' element={<Lobby socket={socket} />} />
      </Routes>
    </div>
  );
}
