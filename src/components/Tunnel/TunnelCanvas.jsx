import { Suspense, useEffect } from 'react';
import { Vector3 } from 'three';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, OrbitControls } from '@react-three/drei';

import Tunnel from './Tunnel';

export default function TunnelCanvas() {
  const ww = window.innerWidth;
  const wh = window.innerHeight;


  return (
    <div className='h-screen w-screen bg-black'>
      <Canvas
        frameloop='always'
        gl={{
          antialias: false,
        }}
        camera={{
          fov: 20,
          aspect: ww / wh,
          near: 0.01,
          far: 100,
          position: new Vector3(0, 0, 0.01),
        }}
      >
        <Suspense fallback={null}>
          <ambientLight />
          <OrbitControls makeDefault={true} />
          <color attach='background' args={['#000']} />
          <Tunnel />
          <AdaptiveDpr />
        </Suspense>
      </Canvas>
    </div>
  );
}
