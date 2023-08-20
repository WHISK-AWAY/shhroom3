import { useEffect, useState, lazy, Suspense } from 'react';
import { useThree } from '@react-three/fiber';
import {
  AdaptiveDpr,
  BakeShadows,
  Preload,
  useDetectGPU,
} from '@react-three/drei';
import Model from './Model_Test_4';
import ControlledCamera from './ControlledCamera';
// import SceneEffects from './SceneEffects';
// import renderNewMeetingText from './RenderNewMeetingText';
// import shhroomText from './renderShhroomText';
// import signInHelperText from './SignInHelperText';
// import { exportGltf } from '../../../utils/gltfExporter';
const Lights = lazy(() => import('./Lights/Lights'));
const SceneEffects = lazy(() => import('./SceneEffects'));
const ShroomsModel = lazy(() => import('./ShroomsModel'));
const ClockModel = lazy(() => import('./ClockModel'));
const RenderMeetingText = lazy(() => import('./RenderNewMeetingText'));
const RenderShhroomText = lazy(() => import('./RenderShhroomText'));
const WallArtTierOne = lazy(() => import('./WallArtTierOne'));
const WallArtTierTwo = lazy(() => import('./WallArtTierTwo'));
const WallArtTierThree = lazy(() => import('./WallArtTierThree'));

export default function Scene({ setIsCanvasLoaded }) {
  const [isUControlsClose, setisUControlsClose] = useState(true);

  const { tier, isMobile } = useDetectGPU();

  const { scene } = useThree();

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
      <Suspense fallback={null}>
        <ClockModel />
      </Suspense>
      <Suspense fallback={null}>
        <ShroomsModel />
      </Suspense>
      <Suspense fallbach={null}>
        <WallArtTierOne />
      </Suspense>
      <Suspense fallback={null}>
        <WallArtTierTwo />
      </Suspense>
      <Suspense fallback={null}>
        <WallArtTierThree />
      </Suspense>
      <Suspense fallback={null}>
        <RenderMeetingText />
      </Suspense>
      <Suspense fallback={null}>
        <RenderShhroomText />
      </Suspense>
      <BakeShadows />
      {/* <AdaptiveDpr /> */}
      {tier === 3 && !isMobile && <SceneEffects />}
      {/* <Preload all={true} /> */}
    </>
  );
}
