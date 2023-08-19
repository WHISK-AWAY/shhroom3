import { useEffect, useState, lazy } from 'react';
import { BakeShadows, useDetectGPU } from '@react-three/drei';
// import Model from './Model_Test_4';
import renderNewMeetingText from './renderNewMeetingText';
import shhroomText from './renderShhroomText';
// import signInHelperText from './SignInHelperText';
// import { exportGltf } from '../../../utils/gltfExporter';
const Lights = lazy(() => import('./Lights/Lights'));
const SceneEffects = lazy(() => import('./SceneEffects'));
const ShroomsModel = lazy(() => import('./ShroomsModel'));
const ClockModel = lazy(() => import('./ClockModel'));
const ControlledCamera = lazy(() => import('./ControlledCamera'));
// const WallArt = lazy(() => import('./WallArt'));
// import Lights from './Lights/Lights';
// import ControlledCamera from './ControlledCamera';
// import SceneEffects from './SceneEffects';
// import ShroomsModel from './ShroomsModel';
// import ClockModel from './ClockModel';
// import WallArt from './WallArt';

// const WallArtLoader = lazy(() => import('./WallArtLoader'));
// const WallArt = lazy(() => import('./WallArt'))
const Model = lazy(() => import('./Model_Test_4'));
const WallArtTierOne = lazy(() => import('./WallArtTierOne'));
const WallArtTierTwo = lazy(() => import('./WallArtTierTwo'));
const WallArtTierThree = lazy(() => import('./WallArtTierThree'));

export default function Scene({ setIsCanvasLoaded }) {
  const [isUControlsClose, setisUControlsClose] = useState(true);

  const { tier, isMobile } = useDetectGPU();

  // const { scene } = useThree();

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
      <ClockModel />
      <ShroomsModel />
      <WallArtTierOne />
      <WallArtTierTwo />
      <WallArtTierThree />
      <BakeShadows />
      {/* <AdaptiveDpr /> */}
      {tier === 3 && !isMobile && <SceneEffects />}
      {/* <Preload all={true} /> */}
    </>
  );
}
