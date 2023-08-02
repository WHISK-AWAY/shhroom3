import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Scene from './Scene';

export default function Landing() {
  return (
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
            antialias: true,
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
  );
}
