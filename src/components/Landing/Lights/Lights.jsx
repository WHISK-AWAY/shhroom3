// import { useControls } from 'leva';
import DeskLampLight from './DeskLampLight';
import OverheadLight from './OverheadLight';
import LavaLampLight from './LavaLampLight';
import ShhroomLampLight from './ShhroomLampLight';
import ClockLight from './ClockLight';
import WindowLightVolumetric from './WindowLightVolumetric';
import AmbientLight from './AmbientLight';
import FlashLight from './FlashLight';
import CornerWallLight from './CornerWallLight';

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

  return (
    <>
      <OverheadLight lightIsOn={true} />

      <WindowLightVolumetric lightIsOn={true} />

      <DeskLampLight lightIsOn={true} />

      <LavaLampLight lightIsOn={true} />

      <ShhroomLampLight lightIsOn={true} />

      <ClockLight lightIsOn={true} />

      <AmbientLight lightIsOn={true} />

      <FlashLight />

      <CornerWallLight lightIsOn={true} />
    </>
  );
}
