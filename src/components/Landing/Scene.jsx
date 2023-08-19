import { useEffect, useState, lazy, Suspense } from 'react';
import { useThree } from '@react-three/fiber';
import {
  AdaptiveDpr,
  BakeShadows,
  Preload,
  useDetectGPU,
} from '@react-three/drei';
import Lights from './Lights/Lights';
import Model from './Model_Test_4';
import ControlledCamera from './ControlledCamera';
// import SceneEffects from './SceneEffects';
import renderNewMeetingText from './renderNewMeetingText';
import shhroomText from './renderShhroomText';
// import signInHelperText from './SignInHelperText';
import { exportGltf } from '../../../utils/gltfExporter';
const SceneEffects = lazy(() => import('./SceneEffects'));
const ShroomsModel = lazy(() => import('./ShroomsModel'))
const ClockModel = lazy(() => import('./ClockModel'))

// const WallArtLoader = lazy(() => import('./WallArtLoader'));
const WallArt = lazy(() => import('./WallArt'))

export default function Scene({ setIsCanvasLoaded }) {
  const [isUControlsClose, setisUControlsClose] = useState(true);

  const gpu = useDetectGPU();

  useEffect(() => {
    console.log('gpu', gpu);
  }, []);

  const { scene } = useThree();

  useEffect(() => {
    // exportGltf(scene);
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
      <Suspense fallback={null}>
      <ClockModel/>
      </Suspense>
      <Suspense fallback={null}>
      <ShroomsModel/>
      </Suspense>
      <Suspense fallbach={null}>
      <WallArt/>
      </Suspense>
      {/**
      <BakeShadows />
    */}
      <AdaptiveDpr />
      {gpu.tier === 3 && !gpu.isMobile && <SceneEffects />}
      <Preload all={true} />
    </>
  );
}
