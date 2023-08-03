import { Suspense, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { AdaptiveDpr, BakeShadows, Preload } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import Lights from './Lights/Lights';
import font from './font';
import Model from './Model';
import ControlledCamera from './ControlledCamera';
import SceneEffects from './SceneEffects';

export default function Scene() {
  const camera = useThree((state) => state.camera);
  const [position, setPosition] = useState({
    focus: null,
    focusLabel: null,
    returnPosition: null,
    zoomMode: false,
  });

  // Render 3d text signs
  font();

  return (
    <>
      <Suspense fallback={null}>
        <Lights />
        <ControlledCamera position={position} />
        <Model />
        <BakeShadows />
        <AdaptiveDpr />
        <SceneEffects />
        <Perf position='top-left' />
        <Preload all={true} />
      </Suspense>
    </>
  );
}
