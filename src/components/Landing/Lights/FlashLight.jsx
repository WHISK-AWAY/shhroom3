import { useControls } from 'leva';
import { useState } from 'react';
import * as THREE from 'three';
import { SpotLight } from '@react-three/drei';

export default function FlashLight() {
  const [monitorTarget] = useState(() => new THREE.Object3D());

  // const { intensity, distance, color, attenuation, anglePower, angle } =
  //   useControls('FlashLight', {
  //     intensity: {
  //       value: 2,
  //       min: 0,
  //       max: 10,
  //     },
  //     distance: {
  //       value: 1.54,
  //       min: 1,
  //       max: 10,
  //     },
  //     color: {
  //       value: '#fff9c7',
  //     },
  //     attenuation: {
  //       value: 0,
  //       min: 0,
  //       max: 50,
  //     },
  //     anglePower: {
  //       value: 0,
  //       min: 0,
  //       max: 10,
  //     },
  //     angle: {
  //       value: 0.2,
  //       min: 0,
  //       max: Math.PI / 2,
  //     },
  //   });

  // const { targetX, targetY, targetZ } = useControls('Flashlight Target', {
  //   targetX: {
  //     value: 30,
  //     min: -50,
  //     max: 30,
  //   },
  //   targetY: {
  //     value: -2.8,
  //     min: -20,
  //     max: 30,
  //   },
  //   targetZ: {
  //     value: -4.5,
  //     min: -20,
  //     max: 30,
  //   },
  // });

  // const { x, y, z } = useControls('Flashlight position', {
  //   x: {
  //     value: 3.4,
  //     min: 0,
  //     max: 20,
  //   },
  //   y: {
  //     value: 2.6,
  //     min: 0,
  //     max: 20,
  //   },
  //   z: {
  //     value: 1.45,
  //     min: 0,
  //     max: 20,
  //   },
  // });

  return (
    <>
      <SpotLight
        intensity={2}
        color={'#fff9c7'}
        position={[3.4, 2.6, 1.45]}
        target={monitorTarget}
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
        attenuation={0}
        anglePower={0}
        distance={1.54}
        angle={0.2}
      />
      <primitive
        object={monitorTarget}
        position={new THREE.Vector3(30, -2.8, -4.5)}
      />
    </>
  );
}
