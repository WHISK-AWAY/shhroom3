import { useState } from 'react';
import { Object3D, Vector3 } from 'three';

export default function CornerWallLight() {
  const [cornerWall] = useState(() => new Object3D());

  return (
    <>
      <pointLight
        intensity={1.3}
        color={'#66ff8c'}
        position={[3.4, 4.6, -1.3]}
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
        attenuation={21.5}
        distance={3.34}
      />
      <primitive object={cornerWall} position={new Vector3(-3.6, -6.8, -3.5)} />
    </>
  );
}
