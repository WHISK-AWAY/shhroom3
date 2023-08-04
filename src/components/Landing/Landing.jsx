import { Suspense, createContext, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';
import LoadingScreen from '../LoadingScreen';

const initialContext = {
  zoomMode: false,
  targetPosition: null,
  targetLabel: null,
  setZoom: null,
  controlsEnabled: true,
  isUserSigned: false,
};

export const ZoomContext = createContext(initialContext);

export default function Landing() {
  const [zoom, setZoom] = useState(initialContext);

  useEffect(() => {
    setZoom((prev) => ({ ...prev, setZoom }));
  }, []);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <ZoomContext.Provider value={zoom}>
        <div className='h-screen w-screen'>
          <Canvas
            frameloop='demand'
            shadows={'soft'}
            linear={false}
            gl={{
              powerPreference: 'high-performance',
              alpha: false,
              antialias: false,
              stencil: false,
              depth: true,
            }}
          >
            <color attach='background' args={['#0e0e0e']} />
            <Scene />
          </Canvas>
        </div>
      </ZoomContext.Provider>
    </Suspense>
  );
}
