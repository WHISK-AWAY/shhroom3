import { useEffect, useState, lazy, Suspense } from 'react';
import { useThree } from '@react-three/fiber';
import {
  AdaptiveDpr,
  BakeShadows,
  Preload,
  useDetectGPU,
} from '@react-three/drei';
import Lights from './Lights/Lights';
import Model from '../../Model_Test_4';
import ControlledCamera from './ControlledCamera';
// import SceneEffects from './SceneEffects';
import renderNewMeetingText from './renderNewMeetingText';
import shhroomText from './renderShhroomText';
import ModelClock from '../../Model_Clock';
// import signInHelperText from './SignInHelperText';
import { exportGltf } from '../../../utils/gltfExporter';
import RoomOne from '../../RoomOne'

const SceneEffects = lazy(() => import('./SceneEffects'));
// const RoomOne = lazy(() => import('../../RoomOne')) 
const RoomTwo = lazy(() => import('../../RoomTwo')) 
const RoomThree = lazy(() => import('../../RoomThree')) 
const RoomFour = lazy(() => import('../../RoomFour')) 

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
      {/**
      <Model />
    */}
    <RoomOne/>
    <Suspense fallback={null}>
    <RoomTwo/>
    </Suspense>
    <Suspense fallback={null}>
    <RoomThree/>
    </Suspense>
    <Suspense fallback={null}>
    <RoomFour/>
    </Suspense>
      <ModelClock/>
      {/**
      <BakeShadows />
    */}
      <AdaptiveDpr />
      {gpu.tier === 3 && !gpu.isMobile && <SceneEffects />}
      <Preload all={true} />
    </>
  );
}
