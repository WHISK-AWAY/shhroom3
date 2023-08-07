import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

import { LoadingScreen, Tunnel } from '../../components';
import { Euler, Vector3 } from 'three';

export default function TunnelCanvas() {
  const ww = window.innerWidth;
  const wh = window.innerHeight;

  return (
    <div className='h-screen w-screen'>
      <Canvas
        frameloop='demand'
        gl={{
          antialias: true,
        }}
        camera={{
          near: 0.01,
          far: 1000,
          fov: 15,
          aspect: ww / wh,
          position: new Vector3(0, 0, 0),
        }}
      >
        <Suspense fallback={<LoadingScreen />}>
          {/* <OrbitControls makeDefault={true} /> */}
          <color attach='background' args={['#444']} />
          <Tunnel />
        </Suspense>
      </Canvas>
    </div>
  );
}
