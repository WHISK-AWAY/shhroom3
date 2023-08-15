import { useControls } from 'leva';

export default function OverheadLight({ lightIsOn }) {
  // const { overheadLightIntensity, color } = useControls(
  //   'Overhead Light Settings',
  //   {
  //     overheadLightIntensity: {
  //       value: 0.47,
  //       min: 0,
  //       max: 3,
  //     },
  //     color: {
  //       value: '#528fba',
  //     },
  //   },
  // );

  // const { x, y, z } = useControls('Overhead Light Position', {
  //   x: {
  //     value: 3.8,
  //     min: -3,
  //     max: 20,
  //   },
  //   y: {
  //     value: 2.6,
  //     min: -3,
  //     max: 20,
  //   },
  //   z: {
  //     value: 0,
  //     min: -3,
  //     max: 20,
  //   },
  // });

  return (
    <>
      <directionalLight
        intensity={lightIsOn ? 0.47 : 0}
        color={'#528fba'}
        position={[3.8, 2.6, 0]}
      />
      <directionalLight
        intensity={lightIsOn ? 0.2 : 0}
        color='#245f3d'
        position={[-3, -3, 20]}
      />
    </>
  );
}
