import { AdaptiveDpr, BakeShadows, Preload } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import Lights from './Lights/Lights';
import font from './font';
import Model from './Model';
import ControlledCamera from './ControlledCamera';
import SceneEffects from './SceneEffects';
import shhroomText from './shhroomText';
import { useEffect, useState } from 'react';
import UserControls from '../UserControls';

export default function Scene({ setIsCanvasLoaded }) {
  const [isSceneLoaded, setIsSceneLoaded] = useState(false);
  const [isUControlsClose, setisUControlsClose] = useState(true);
  // Render 3d text signs
  font();
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
