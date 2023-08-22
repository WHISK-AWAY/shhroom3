import { useState } from 'react';
import { SpotLight } from '@react-three/drei';
import { Object3D, Vector3 } from 'three';

export default function DeskLampLight({ lightIsOn }) {
  const [target] = useState(() => new Object3D());

  return (
    <>
      <SpotLight
        intensity={lightIsOn ? 3.84 : 0}
        penumbra={0.4}
        target={target}
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
      <primitive object={target} position={new Vector3(5.87, -1.24, 2.82)} />
    </>
  );
}
