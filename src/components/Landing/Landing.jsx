import { Suspense, useContext, useEffect, useState, lazy } from 'react';
import { Canvas } from '@react-three/offscreen';
import { useDetectGPU } from '@react-three/drei';

// import Scene from './Scene';
// import LoadingScreen from '../LoadingScreen';
// import { Canvas } from '@react-three/fiber';
import LoadingScreen from '../LoadingScreen';
import UserControls from '../UserControls';

import { LandingContext } from '../../lib/context';

export default function Landing() {
  const landingContext = useContext(LandingContext);

  const [isCanvasLoaded, setIsCanvasLoaded] = useState(false);
  // const [dpr, setDpr] = useState(1);

  // useEffect(() => {
  //   console.log('current dpr', dpr);
  // }, [dpr]);

  // const Scene = lazy(() => import('./Scene'));
  const worker = new Worker(new URL('./worker.jsx', import.meta.url), {
    type: 'module',
  });

  return (
    <div className='h-screen w-screen '>
      {/* <Suspense fallback={<LoadingScreen />}> */}
      <Suspense fallback={<LoadingScreen />}>
        {isCanvasLoaded && landingContext.controlsAreVisible && (
          <UserControls />
        )}
        <Canvas
          worker={worker}
          // fallback={<Scene />}
          // frameloop='demand'
          // // dpr={dpr}
          // shadows={false}
          // linear={false}
          // flat={false}
          // raycaster={{
          //   far: 100,
          //   params: { Line: { threshold: 0.1 }, Points: { threshold: 0.1 } },
          // }}
          // gl={
          //   {
          // powerPreference: 'high-performance',
          // alpha: false,
          // antialias: false,
          // stencil: false,
          // depth: true,
          //   }
          // }
        >
          {/* <PerformanceMonitor
            onIncline={(stuff) => {
              console.log('performanceMonitor onIncline:', stuff);
              setDpr((prev) => Math.min(prev + 0.25, 3));
            }}
            onDecline={(stuff) => {
              console.log('performanceMonitor onDecline:', stuff);
              setDpr((prev) => Math.max(0, prev - 0.25));
            }}
          /> */}
          {/* <color attach='background' args={['#030303']} />
          <Scene setIsCanvasLoaded={setIsCanvasLoaded} /> */}
        </Canvas>
      </Suspense>
    </div>
  );
}
