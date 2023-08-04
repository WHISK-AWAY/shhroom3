import { AdaptiveDpr, BakeShadows, Preload } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import Lights from './Lights/Lights';
import font from './font';
import Model from './Model';
import ControlledCamera from './ControlledCamera';
import SceneEffects from './SceneEffects';
import shhroomText from './ShhroomText';

export default function Scene() {
  // Render 3d text signs
  font();
  shhroomText();

  return (
    <>
      <Lights />
      <ControlledCamera />
      <Model />
      <BakeShadows />
      <AdaptiveDpr />
      <SceneEffects />
      <Perf position='top-left' />
      <Preload all={true} />
    </>
  );
}
