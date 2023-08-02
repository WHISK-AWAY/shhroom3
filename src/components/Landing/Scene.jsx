import { AdaptiveDpr, BakeShadows, Preload } from '@react-three/drei';
import Lights from './Lights/Lights';
import font from './font';
import Model from './Model';
import { Suspense, useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import ControlledCamera from './ControlledCamera';

export default function Scene() {
  const camera = useThree((state) => state.camera);
  const [position, setPosition] = useState({
    focus: null,
    returnPosition: null,
    zoomMode: false,
  });

  // Render 3d text signs
  font();

  function zoomTo(zoomTarget) {
    console.log('clicked:', { position: camera.position });

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
      }));
    }
  }

  useEffect(() => {
    console.log('position:', position);
  }, [position]);

  return (
    <>
      <Suspense fallback={null}>
        <Lights />
        <ControlledCamera position={position} />
        <Model zoomTo={zoomTo} />
        <BakeShadows />
        <AdaptiveDpr />
      </Suspense>
      <Preload all={true} />
    </>
  );
}
