import { Suspense, lazy, useContext, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useDetectGPU } from '@react-three/drei';
import { useContextBridge } from '@react-three/drei';

import { LandingContext, GlobalContext } from '../../lib/context';
import useVerifyToken from '../hooks/useVerifyToken';

// import Scene from './Scene';
import LoadingScreen from '../LoadingScreen';

const UserControls = lazy(() => import('../UserControls'));
const Scene = lazy(() => import('./Scene'));

export default function Landing() {
  const ContextBridge = useContextBridge(GlobalContext, LandingContext);
  const landingContext = useContext(LandingContext);
  const gpu = useDetectGPU();

  const [isCanvasLoaded, setIsCanvasLoaded] = useState(false);


  useVerifyToken();
  return (
    <div className='h-screen w-screen '>
      <Suspense fallback={<LoadingScreen />}>
        {isCanvasLoaded && landingContext.controlsAreVisible && (
          <UserControls />
        )}
        <Canvas
          frameloop='demand'
          shadows={gpu.tier < 1 ? false : 'soft'}
          // shadows={false}
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
