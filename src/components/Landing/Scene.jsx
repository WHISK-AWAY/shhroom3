import { AdaptiveDpr, BakeShadows, Preload } from '@react-three/drei';
import Lights from './Lights/Lights';
import Model from './Model';
import ControlledCamera from './ControlledCamera';
import SceneEffects from './SceneEffects';
import renderNewMeetingText from './renderNewMeetingText';
import shhroomText from './renderShhroomText';
import { useEffect, useState } from 'react';

export default function Scene({ setIsCanvasLoaded }) {
  const [isUControlsClose, setisUControlsClose] = useState(true);

  // Render 3d text signs
  renderNewMeetingText();
  shhroomText();

  useEffect(() => {
    document.querySelector('#loader').classList.add('invisible');
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
      {/* <SceneEffects /> */}
      <Preload all={true} />
    </>
  );
}
