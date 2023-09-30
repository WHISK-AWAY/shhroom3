import { lazy, useEffect } from 'react';
import { useDetectGPU, BakeShadows, AdaptiveDpr } from '@react-three/drei';

const Lights = lazy(() => import('./Lights/Lights'));
const ControlledCamera = lazy(() => import('./ControlledCamera'));
const Model = lazy(() => import('./Model_Test_4'));
const ClockModel = lazy(() => import('./ClockModel'));
const ShroomsModel = lazy(() => import('./ShroomsModel'));
const WallArtTierOne = lazy(() => import('./WallArtTierOne'));
const WallArtTierTwo = lazy(() => import('./WallArtTierTwo'));
const WallArtTierThree = lazy(() => import('./WallArtTierThree'));
const RenderMeetingText = lazy(() => import('./RenderNewMeetingText'));
const RenderShhroomText = lazy(() => import('./RenderShhroomText'));
const SceneEffects = lazy(() => import('./SceneEffects'));

export default function Scene({ setIsCanvasLoaded }) {
  const { tier, isMobile } = useDetectGPU();

  useEffect(() => {
    // notify parent that we're finished loading
    setIsCanvasLoaded(true);
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      const e = new Event('landingReady');
      window.dispatchEvent(e);
    });
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
      <RenderMeetingText />
      <RenderShhroomText />
      <BakeShadows />
      <AdaptiveDpr />
      {tier === 3 && !isMobile && <SceneEffects />}
    </>
  );
}
