import { Suspense, createContext, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import Scene from './Scene';

const initialContext = {
  zoomMode: false,
  targetPosition: null,
  targetLabel: null,
  setZoom: null,
};

export const ZoomContext = createContext(initialContext);

export default function Landing() {
  const [zoom, setZoom] = useState(initialContext);

  useEffect(() => {
    setZoom({ ...zoom, setZoom });
  }, []);

  return (
    <ZoomContext.Provider value={zoom}>
      <div className='h-screen w-screen'>
        <Suspense fallback={<h1>Loading canvas...</h1>}>
          <Canvas
            frameloop='demand'
            shadows={'soft'}
            linear={false}
            // camera={cam}
            // camera={{ position: [10, 3, 8], far: 50, fov: 70 }}
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
