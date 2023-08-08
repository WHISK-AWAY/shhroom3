import { Suspense } from 'react';
import { AmbientLight, Euler, Vector3 } from 'three';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  PerspectiveCamera,
  useTexture,
} from '@react-three/drei';

import { LoadingScreen, Tunnel } from '../../components';

export default function TunnelCanvas() {
  const ww = window.innerWidth;
  const wh = window.innerHeight;

  return (
    <div className='h-screen w-screen'>
      <Canvas
        frameloop='always'
        gl={{
          antialias: true,
        }}
        camera={{
          near: 0.01,
          far: 100,
          fov: 90,
          aspect: ww / wh,
          position: new Vector3(0, 0, 0.01),
        }}
      >
        <Suspense fallback={null}>
          <ambientLight />
          {/* <OrbitControls makeDefault={true} /> */}
          <color attach='background' args={['#444']} />
          <Tunnel />
        </Suspense>
      </Canvas>
    </div>
  );
}
