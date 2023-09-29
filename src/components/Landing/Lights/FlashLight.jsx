import { useState } from 'react';
import { Object3D, Vector3 } from 'three';
import { SpotLight } from '@react-three/drei';

export default function FlashLight() {
  const [target] = useState(() => new Object3D());

  return (
    <>
      <SpotLight
        intensity={2}
        color={'#fff9c7'}
        position={[3.4, 2.6, 1.45]}
        target={target}
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
      <primitive object={target} position={new Vector3(30, -2.8, -4.5)} />
    </>
  );
}
