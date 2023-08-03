import { Suspense, createContext, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';

const initialContext = {
  zoomMode: false,
  targetPosition: null,
  targetLabel: null,
  setZoom: null,
  controlsEnabled: true,
};

export const ZoomContext = createContext(initialContext);

/**
 * After lunch:
 * Create controls context (or augment existing one since it's related)
 * Optionally disable controls upon zoom (for certain items, like the computer screen)
 */

export default function Landing() {
  const [zoom, setZoom] = useState(initialContext);

  useEffect(() => {
    setZoom((prev) => ({ ...prev, setZoom }));
  }, []);

  return (
    <ZoomContext.Provider value={zoom}>
      <div className='h-screen w-screen'>
        <Suspense fallback={<h1>Loading canvas...</h1>}>
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
            <Suspense fallback={null}>
              {/* <PerspectiveCamera makeDefault={true} position={[x, y, z]} /> */}

              <Scene />
            </Suspense>
          </Canvas>
        </Suspense>
      </div>
    </ZoomContext.Provider>
  );
}
