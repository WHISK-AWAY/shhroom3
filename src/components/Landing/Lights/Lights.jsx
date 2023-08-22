import { useDetectGPU } from '@react-three/drei';

import CornerWallLight from './CornerWallLight';
import FlashLight from './FlashLight';
import WindowLightVolumetric from './WindowLightVolumetric';
import ClockLight from './ClockLight';
import OverheadLight from './OverheadLight';
import LavaLampLight from './LavaLampLight';
import ShhroomLampLight from './ShhroomLampLight';
import AmbientLight from './AmbientLight';
import DeskLampLight from './DeskLampLight';

export default function Lights() {
  const gpu = useDetectGPU();

  return (
    <>
      {gpu.fps > 70 && (
        <>
          <CornerWallLight />
          <FlashLight />
        </>
      )}
      {gpu.tier === 3 && (
        <>
          <WindowLightVolumetric lightIsOn={true} />
          <ClockLight lightIsOn={true} />
        </>
      )}
      {gpu.tier >= 2 && (
        <>
          <OverheadLight lightIsOn={true} />
          <LavaLampLight lightIsOn={true} />
        </>
      )}
      {gpu.tier >= 1 && <ShhroomLampLight lightIsOn={true} />}

      {gpu.tier >= 0 && (
        <>
          <AmbientLight lightIsOn={true} />
          <DeskLampLight lightIsOn={true} />
        </>
      )}
    </>
  );
}
