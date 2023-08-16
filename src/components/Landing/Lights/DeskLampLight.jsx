import { useState } from 'react';
import { SpotLight } from '@react-three/drei';
import { Object3D, Vector3 } from 'three';

export default function DeskLampLight({ lightIsOn }) {
  const [deskLampTarget] = useState(() => new Object3D());

  // const {
  //   intensity,
  //   penumbra,
  //   attenuation,
  //   distance,
  //   angle,
  //   anglePower,
  //   castShadow,
  //   color,
  // } = useControls('Desk Lamp Settings', {
  //   intensity: {
  //     value: 3.84,
  //     min: 0,
  //     max: 6,
  //   },
  //   penumbra: {
  //     value: 0.4,
  //     min: 0,
  //     max: 1,
  //   },
  //   attenuation: {
  //     value: 0.84,
  //     min: 0,
  //     max: 4,
  //   },
  //   distance: {
  //     value: 7.6,
  //     min: 1,
  //     max: 15,
  //   },
  //   angle: {
  //     value: Math.PI / 3,
  //     min: 0,
  //     max: Math.PI / 2,
  //   },
  //   anglePower: {
  //     value: 4.5,
  //     min: 0,
  //     max: 10,
  //   },
  //   castShadow: {
  //     value: true,
  //   },
  //   color: {
  //     value: '#cbc9b3',
  //   },
  // });

  // const { lampX, lampY, lampZ } = useControls('Desk Lamp Position', {
  //   lampX: {
  //     value: 3.68,
  //     min: 3,
  //     max: 4.25,
  //   },
  //   lampY: {
  //     value: 2.82,
  //     min: 2,
  //     max: 4,
  //   },
  //   lampZ: {
  //     value: 0.15,
  //     min: -0.25,
  //     max: 1,
  //   },
  // });

  // const { lampTargetX, lampTargetY, lampTargetZ } = useControls(
  //   'Desk Lamp Target',
  //   {
  //     lampTargetX: {
  //       value: 5.87,
  //       min: 5,
  //       max: 6.5,
  //     },
  //     lampTargetY: {
  //       value: -1.24,
  //       min: -2,
  //       max: 0,
  //     },
  //     lampTargetZ: {
  //       value: 2.82,
  //       min: 2.5,
  //       max: 3.5,
  //     },
  //   },
  // );

  return (
    <>
      <SpotLight // Desk lamp
        intensity={lightIsOn ? 3.84 : 0}
        penumbra={0.4}
        target={deskLampTarget}
        position={[3.68, 2.82, 0.15]}
        attenuation={lightIsOn ? 0.84 : 0}
        distance={7.6}
        angle={Math.PI / 3}
        anglePower={4.5}
        castShadow={true}
        shadowCameraFov={undefined}
        shadowCameraLeft={undefined}
        shadowCameraRight={undefined}
        shadowCameraTop={undefined}
        shadowCameraBottom={undefined}
        shadowCameraNear={undefined}
        shadowCameraFar={undefined}
        shadowBias={undefined}
        shadowMapWidth={undefined}
        shadowMapHeight={undefined}
        color={'#cbc9b3'}
      />
      <primitive
        object={deskLampTarget}
        position={new Vector3(5.87, -1.24, 2.82)}
      />
    </>
  );
}
