import { useState } from 'react';
import { Object3D, Vector3 } from 'three';
import { SpotLight } from '@react-three/drei';

export default function ClockLight({ lightIsOn }) {
  const [clockLightTarget] = useState(() => new Object3D());

  // const {
  //   castShadow,
  //   intensity,
  //   distance,
  //   color,
  //   angle,
  //   anglePower,
  //   penumbra,
  //   attenuation,
  // } = useControls('Clock Light Settings', {
  //   castShadow: {
  //     value: true,
  //   },
  //   intensity: {
  //     value: 2.6,
  //     min: 0,
  //     max: 10,
  //   },
  //   distance: {
  //     value: 2.1,
  //     min: 0,
  //     max: 10,
  //   },
  //   color: {
  //     value: '#ff0000',
  //   },
  //   penumbra: {
  //     value: 0.14,
  //     min: 0,
  //     max: 1,
  //   },
  //   attenuation: {
  //     value: .3,
  //     min: 0,
  //     max: 20,
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
  // });

  // const { x, y, z } = useControls('Clock Light Position', {
  //   x: {
  //     value: 8.65,
  //     min: -20,
  //     max: 20,
  //   },
  //   y: {
  //     value: 2.1,
  //     min: -19,
  //     max: 20,
  //   },
  //   z: {
  //     value: -2.2,
  //     min: -20,
  //     max: 20,
  //   },
  // });

  // const {targetX, targetY, targetZ} = useControls('Clock Light Target', {
  //   targetX: {
  //     value: 10.2,
  //     min: -10,
  //     max: 20
  //   },
  //   targetY: {
  //     value: -13,
  //     min: -15,
  //     max: 20
  //   },
  //   targetZ: {
  //     value: 25,
  //     min: -10,
  //     max: 25
  //   },
  // })
  return (
    <>
      <SpotLight
        castShadow={true}
        intensity={lightIsOn ? 2.6 : 0}
        position={[8.65, 2.1, -2.2]}
        distance={2.1}
        color={'#ff0000'}
        target={clockLightTarget}
        penumbra={0.14}
        angle={Math.PI / 3}
        anglePower={4.5}
        attenuation={lightIsOn ? 0.3 : 0}
      />
      <primitive
        object={clockLightTarget}
        position={new Vector3(10.2, -13, 25)}
      />
    </>
  );
}
