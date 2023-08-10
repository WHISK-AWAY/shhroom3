import { useControls } from 'leva';
import { useState } from 'react';
import * as THREE from 'three';
import { SpotLight } from '@react-three/drei';

export default function CornerWallLight() {
  const [cornerWall] = useState(() => new THREE.Object3D());

  const { intensity, distance, color, attenuation, anglePower, angle } =
    useControls('Corner Wall Light', {
      intensity: {
        value: 1.6,
        min: 0,
        max: 10,
      },
      distance: {
        value: 3.34,
        min: 1,
        max: 10,
      },
      color: {
        value: '#66ff8c',
      },
      attenuation: {
        value: 21.5,
        min: 0,
        max: 50,
      },
  
    });

  const { targetX, targetY, targetZ } = useControls('Corner Wall Target', {
    targetX: {
      value: -3.6,
      min: -10,
      max: 10,
    },
    targetY: {
      value: -6.8,
      min: -20,
      max: 30,
    },
    targetZ: {
      value: -3.5,
      min: -20,
      max: 30,
    },
  });

  const { x, y, z } = useControls('Corner Wall Position', {
    x: {
      value: 4.2,
      min: 0,
      max: 20,
    },
    y: {
      value: 4.6,
      min: 0,
      max: 20,
    },
    z: {
      value: -1.45,
      min: -20,
      max: 20,
    },
  });

  return (
    <>
      <pointLight
        intensity={intensity}
        color={color}
        position={[x, y, z]}
        target={cornerWall}
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
        attenuation={attenuation}
       
        distance={distance}
        
      />
      <primitive
        object={cornerWall}
        position={new THREE.Vector3(targetX, targetY, targetZ)}
      />
    </>
  );
}
