import { useState } from 'react';
import { useControls } from 'leva';
import { SpotLight } from '@react-three/drei';
import * as THREE from 'three';

export default function DeskLampLight({ lightIsOn }) {
  const [deskLampTarget] = useState(() => new THREE.Object3D());

  const {
    intensity,
    penumbra,
    attenuation,
    distance,
    angle,
    anglePower,
    castShadow,
    color,
  } = useControls('Desk Lamp Settings', {
    intensity: {
      value: 3.84,
      min: 0,
      max: 6,
    },
    penumbra: {
      value: 0.4,
      min: 0,
      max: 1,
    },
    attenuation: {
      value: 0.84,
      min: 0,
      max: 4,
    },
    distance: {
      value: 7.6,
      min: 1,
      max: 15,
    },
    angle: {
      value: Math.PI / 3,
      min: 0,
      max: Math.PI / 2,
    },
    anglePower: {
      value: 4.5,
      min: 0,
      max: 10,
    },
    castShadow: {
      value: true,
    },
    color: {
      value: '#cbc9b3',
    },
  });

  const { lampX, lampY, lampZ } = useControls('Desk Lamp Position', {
    lampX: {
      value: 3.68,
      min: 3,
      max: 4.25,
    },
    lampY: {
      value: 2.82,
      min: 2,
      max: 4,
    },
    lampZ: {
      value: 0.15,
      min: -0.25,
      max: 1,
    },
  });

  const { lampTargetX, lampTargetY, lampTargetZ } = useControls(
    'Desk Lamp Target',
    {
      lampTargetX: {
        value: 5.87,
        min: 5,
        max: 6.5,
      },
      lampTargetY: {
        value: -1.24,
        min: -2,
        max: 0,
      },
      lampTargetZ: {
        value: 2.82,
        min: 2.5,
        max: 3.5,
      },
    },
  );

  return (
    <>
      <SpotLight // Desk lamp
        intensity={lightIsOn ? intensity : 0}
        penumbra={penumbra}
        target={deskLampTarget}
        position={[lampX, lampY, lampZ]}
        attenuation={lightIsOn ? attenuation : 0}
        distance={distance}
        angle={angle}
        anglePower={anglePower}
        castShadow={castShadow}
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
        color={color}
      />
      <primitive
        object={deskLampTarget}
        position={new THREE.Vector3(lampTargetX, lampTargetY, lampTargetZ)}
      />
    </>
  );
}
