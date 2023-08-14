import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { io } from 'socket.io-client';

import {
  GlobalContext,
  initialGlobalContext,
  LandingContext,
  initialLandingContext,
} from './lib/context';

import {
  Room,
  Lobby,
  Homepage,
  Signin,
  SignUp,
  Landing,
  Screensaver,
  LoadingScreen,
  TunnelCanvas,
} from './components';

const WS_URL = import.meta.env.VITE_WS_URL;

const socket = io(WS_URL);

export default function App() {
  const [globalContext, setGlobalContext] = useState(initialGlobalContext);
  const [landingContext, setLandingContext] = useState(initialLandingContext);

  useEffect(() => {
    setGlobalContext((prev) => ({
      ...prev,
      setContext: setGlobalContext,
      reset: () =>
        setGlobalContext((prev) => ({
          ...initialGlobalContext,
          reset: prev.reset,
          setContext: prev.setContext,
        })),
    }));
  }, []);

  useEffect(() => {
    setLandingContext((prev) => ({
      ...prev,
      setContext: setLandingContext,
      reset: () => {
        console.log('resetting landing context');
        setLandingContext((prev) => ({
          ...initialLandingContext,
          reset: prev.reset,
          setContext: prev.setContext,
        }));
      },
      // releaseZoom: function releaseZoom() {
      //   console.log('going back home');
      //   setLandingContext((prev) => ({
      //     ...prev,
      //     targetLabel: null,
      //     targetPosition: null,
      //     camPosition: null,
      //     controlsAreEnabled: true,
      //   }));
      //   // landingContext.zoomToObject('initPosition');
      // },
    }));
  }, []);

  return (
    <div className='home-view h-screen overflow-hidden w-screen '>
      <GlobalContext.Provider value={globalContext}>
        <LandingContext.Provider value={landingContext}>
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/landing' element={<Landing />} />
            <Route path='/loading' element={<LoadingScreen />} />
            <Route path='/tunnel' element={<TunnelCanvas />} />
            <Route path='/screensaver' element={<Screensaver />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/room' element={<Room socket={socket} />} />
            <Route path='/room/:roomId' element={<Room socket={socket} />} />
            <Route path='/lobby' element={<Lobby socket={socket} />} />
          </Routes>
        </LandingContext.Provider>
      </GlobalContext.Provider>
    </div>
  );
}
