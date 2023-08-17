import DeskLampLight from './DeskLampLight';
import OverheadLight from './OverheadLight';
import LavaLampLight from './LavaLampLight';
import ShhroomLampLight from './ShhroomLampLight';
import ClockLight from './ClockLight';
import WindowLightVolumetric from './WindowLightVolumetric';
import AmbientLight from './AmbientLight';
import FlashLight from './FlashLight';
import CornerWallLight from './CornerWallLight';
import { useDetectGPU } from '@react-three/drei';

export default function Lights() {
  // const {
  //   overheadLightIsOn,
  //   shhroomLampIsOn,
  //   deskLampIsOn,
  //   windowLightIsOn,
  //   lavaLampIsOn,
  //   clockLightIsOn,
  //   ambientLightIsOn,
  //   cornerWallLightIsOn
  // } = useControls('Lights', {
  //   overheadLightIsOn: {
  //     value: true,
  //   },
  //   deskLampIsOn: {
  //     value: true,
  //   },
  //   windowLightIsOn: {
  //     value: true,
  //   },
  //   lavaLampIsOn: {
  //     value: true,
  //   },
  //   shhroomLampIsOn: {
  //     value: true,
  //   },
  //   clockLightIsOn: {
  //     value: true,
  //   },
  //   ambientLightIsOn: {
  //     value: true,
  //   },
  //   cornerWallLightIsOn: {
  //     value: true
  //   }
  // });

  const gpu = useDetectGPU();

  return (
    <>
      {gpu.fps > 70 && (
        <>
          <CornerWallLight lightIsOn={true} />
          <FlashLight />
        </>
      )}
      {gpu.tier === 3 && <WindowLightVolumetric lightIsOn={true} />}

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
