import { Suspense, useEffect, useState } from 'react';
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

  function zoomTo(zoomTarget, targetLabel) {
    if (position.zoomMode === true) {
      setPosition((prev) => ({
        zoomMode: false,
        returnPosition: camera.position,
        focus: null,
      }));
    } else {
      setPosition((prev) => ({
        zoomMode: true,
        returnPosition: prev.returnPosition,
        focus: zoomTarget,
        focusLabel: targetLabel,
      }));
    }
  }

  return (
    <>
      <Suspense fallback={null}>
        <Lights />
        <ControlledCamera position={position} />
        <Model zoomTo={zoomTo} />
        <BakeShadows />
        <AdaptiveDpr />
        <SceneEffects />
        <Perf position='top-left' />
        <Preload all={true} />
      </Suspense>
    </>
  );
}
