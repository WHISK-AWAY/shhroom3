import { Suspense, lazy, useContext, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';
import LoadingScreen from '../LoadingScreen';
// import UserControls from '../UserControls';

import { LandingContext } from '../../lib/context';

const UserControls = lazy(() => import('../UserControls'));
// const Scene = lazy(() => import('./Scene'));

export default function Landing() {
  const landingContext = useContext(LandingContext);

  useEffect(() => {
    document.querySelector('#loader').classList.add('invisible', 'hidden');
  }, []);

  const [isCanvasLoaded, setIsCanvasLoaded] = useState(false);

  return (
    <div className='h-screen w-screen '>
      {/* <Suspense fallback={<LoadingScreen />}> */}
      <Suspense fallback={<LoadingScreen />}>
        {isCanvasLoaded && landingContext.controlsAreVisible && (
          <UserControls />
        )}
        <Canvas
          frameloop='demand'
          shadows={'soft'}
          linear={false}
          raycaster={{
            far: 100,
            params: { Line: { threshold: 0.1 }, Points: { threshold: 0.1 } },
          }}
          gl={{
            powerPreference: 'high-performance',
            alpha: false,
            antialias: false,
            stencil: false,
            depth: true,
          }}
        >
          <color attach='background' args={['#030303']} />
          <Scene setIsCanvasLoaded={setIsCanvasLoaded} />
        </Canvas>
      </Suspense>
    </div>
  );
}
