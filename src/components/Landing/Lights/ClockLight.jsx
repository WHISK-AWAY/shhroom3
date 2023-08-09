import { useControls } from 'leva';
import { useState } from 'react';
import * as THREE from 'three';
import { SpotLight } from '@react-three/drei';
export default function ClockLight({ lightIsOn }) {

  const [clockLightTarget] = useState(() => new THREE.Object3D());


  const {
    castShadow,
    intensity,
    distance,
    color,
    angle,
    anglePower,
    penumbra,
    attenuation,
  } = useControls('Clock Light Settings', {
    castShadow: {
      value: true,
    },
    intensity: {
      value: 2.6,
      min: 0,
      max: 10,
    },
    distance: {
      value: 3.2,
      min: 0,
      max: 10,
    },
    color: {
      value: '#ff0000',
    },
    penumbra: {
      value: 0.14,
      min: 0,
      max: 1,
    },
    attenuation: {
      value: .3,
      min: 0,
      max: 20,
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
  });

  const { x, y, z } = useControls('Clock Light Position', {
    x: {
      value: 8.65,
      min: -20,
      max: 20,
    },
    y: {
      value: 2.1,
      min: -19,
      max: 20,
    },
    z: {
      value: -2.2,
      min: -20,
      max: 20,
    },
  });

  const {targetX, targetY, targetZ} = useControls('Clock Light Target', {
    targetX: {
      value: 10.2,
      min: -10, 
      max: 20
    },
    targetY: {
      value: -13,
      min: -15, 
      max: 20
    },
    targetZ: {
      value: 25,
      min: -10, 
      max: 25
    },
  })
  return (
    <>
    <SpotLight
    castShadow={castShadow}
    intensity={lightIsOn ? intensity : 0}
    position={[x, y, z]}
    distance={distance}
    color={color}
    target={clockLightTarget}
    penumbra={penumbra}
    angle={angle}
    anglePower={anglePower}
    attenuation={lightIsOn ? attenuation: 0}
    />
    <primitive
    object={clockLightTarget}
    position={new THREE.Vector3(targetX, targetY, targetZ)}
    />
    </>
  );
}
