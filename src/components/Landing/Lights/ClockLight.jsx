import { useState } from 'react';
import { Object3D, Vector3 } from 'three';
import { SpotLight } from '@react-three/drei';

export default function ClockLight({ lightIsOn }) {
  const [clockLightTarget] = useState(() => new Object3D());

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
