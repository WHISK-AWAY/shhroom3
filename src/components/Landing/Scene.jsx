import { AdaptiveDpr, BakeShadows, Preload } from '@react-three/drei';
import Lights from './Lights/Lights';
import renderNewMeetingText from './renderNewMeetingText';
import Model from './Model';
import ControlledCamera from './ControlledCamera';
import SceneEffects from './SceneEffects';
import shhroomText from './renderShhroomText';
import { useEffect, useState } from 'react';

export default function Scene({ setIsCanvasLoaded }) {
  const [isUControlsClose, setisUControlsClose] = useState(true);

  // Render 3d text signs
  renderNewMeetingText();
  shhroomText();

  useEffect(() => {
    setIsCanvasLoaded(true);
    setTimeout(() => {
      setisUControlsClose(false);
    }, 3000);
  }, []);

  return (
    <>
      <Lights />
      <ControlledCamera />
      <Model />
      <BakeShadows />
      <AdaptiveDpr />
      <SceneEffects />
      <Preload all={true} />
    </>
  );
}
