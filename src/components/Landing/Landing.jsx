import { Suspense, lazy, useContext, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useContextBridge } from '@react-three/drei';
// import Scene from './Scene';
import { useDetectGPU } from '@react-three/drei';
import Scene from './Scene';
import LoadingScreen from '../LoadingScreen';

import { LandingContext, GlobalContext } from '../../lib/context';

const UserControls = lazy(() => import('../UserControls'));
// const Scene = lazy(() => import('./Scene'));

export default function Landing() {
  const ContextBridge = useContextBridge(GlobalContext, LandingContext);
  const landingContext = useContext(LandingContext);
  const gpu = useDetectGPU();

  useEffect(() => {
    document.querySelector('#loader').classList.add('invisible', 'hidden');
  }, []);

  const [isCanvasLoaded, setIsCanvasLoaded] = useState(false);

  return (
    <div className='h-screen w-screen '>
      <Suspense fallback={<LoadingScreen />}>
        {isCanvasLoaded && landingContext.controlsAreVisible && (
          <UserControls />
        )}
        <Canvas
          frameloop='demand'
          shadows={gpu.tier < 1 ? false : 'soft'}
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
          <ContextBridge>
            <Scene setIsCanvasLoaded={setIsCanvasLoaded} />
          </ContextBridge>
        </Canvas>
      </Suspense>
    </div>
  );
}
