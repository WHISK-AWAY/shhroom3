import { useControls } from 'leva';

export default function LavaLampLight({ lightIsOn }) {
  // const { castShadow, intensity, distance, color } = useControls(
  //   'Lava Lamp Settings',
  //   {
  //     castShadow: {
  //       value: true,
  //     },
  //     intensity: {
  //       value: 2.20,
  //       min: 0,
  //       max: 5,
  //     },
  //     distance: {
  //       value: 5.7,
  //       min: 0,
  //       max: 10,
  //     },
  //     color: {
  //       value: '#ff00dd',
  //     },
  //   },
  // );

  // const { x, y, z } = useControls('Lava Lamp Position', {
  //   x: {
  //     value: 3.8,
  //     min: -10,
  //     max: 10,
  //   },
  //   y: {
  //     value: 5.4,
  //     min: -10,
  //     max: 10,
  //   },
  //   z: {
  //     value: 0.2,
  //     min: -10,
  //     max: 10,
  //   },
  // });
  return (
    <pointLight
      castShadow={true}
      intensity={lightIsOn ? 4.10 : 0}
      position={[3.8, 5.4, 0.2]}
      distance={5.7}
      color={'#ff00bf'}
    ></pointLight>
  );
}
