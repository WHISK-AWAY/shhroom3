import { useControls } from 'leva';
import DeskLampLight from './DeskLampLight';
import OverheadLight from './OverheadLight';
import LavaLampLight from './LavaLampLight';
import ShhroomLampLight from './ShhroomLampLight';
import ClockLight from './ClockLight';
import WindowLightVolumetric from './WindowLightVolumetric';
import AmbientLight from './AmbientLight';
import FlashLight from './FlashLight';

export default function Lights() {
  const {
    overheadLightIsOn,
    shhroomLampIsOn,
    deskLampIsOn,
    windowLightIsOn,
    lavaLampIsOn,
    clockLightIsOn,
    ambientLightIsOn,
  } = useControls('Lights', {
    overheadLightIsOn: {
      value: true,
    },
    deskLampIsOn: {
      value: true,
    },
    windowLightIsOn: {
      value: true,
    },
    lavaLampIsOn: {
      value: true,
    },
    shhroomLampIsOn: {
      value: true,
    },
    clockLightIsOn: {
      value: false,
    },
    ambientLightIsOn: {
      value: true,
    },
  });

  return (
    <>
      <OverheadLight lightIsOn={overheadLightIsOn} />

      <WindowLightVolumetric lightIsOn={windowLightIsOn} />

      <DeskLampLight lightIsOn={deskLampIsOn} />

      <LavaLampLight lightIsOn={lavaLampIsOn} />

      <ShhroomLampLight lightIsOn={shhroomLampIsOn} />

      <ClockLight lightIsOn={clockLightIsOn} />

      <AmbientLight lightIsOn={ambientLightIsOn} />

      <FlashLight />
    </>
  );
}
