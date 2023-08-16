import { useEffect, useState, lazy } from 'react';
import {
  AdaptiveDpr,
  BakeShadows,
  Preload,
  useDetectGPU,
} from '@react-three/drei';
import Lights from './Lights/Lights';
import Model from './Model';
import ControlledCamera from './ControlledCamera';
// import SceneEffects from './SceneEffects';
import renderNewMeetingText from './renderNewMeetingText';
import shhroomText from './renderShhroomText';
// import signInHelperText from './SignInHelperText';

const SceneEffects = lazy(() => import('./SceneEffects'));

export default function Scene({ setIsCanvasLoaded }) {
  const [isUControlsClose, setisUControlsClose] = useState(true);

  const gpu = useDetectGPU();

  useEffect(() => {
    console.log('gpu', gpu);
  }, []);

  // Render 3d text signs
  renderNewMeetingText();
  shhroomText();

  useEffect(() => {
    // document.querySelector('#loader').classList.add('invisible');
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
      {gpu.tier === 3 && !gpu.isMobile && <SceneEffects />}
      <Preload all={true} />
    </>
  );
}
