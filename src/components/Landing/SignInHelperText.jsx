import { useEffect, useState } from 'react';

import { Text3D } from '@react-three/drei';
import { MeshStandardMaterial } from 'three';
import font from '../../../public/fonts/Press Start 2P_Regular.json'


export const SignInHelperText = () => {
const [intensity, setIntensity] = useState(0)

  // useEffect(() => {
  //   setInterval(() => {
  //     setIntensity((prev) => (prev === 1 ? 1.6 : 1) )
  //     console.log('blink')
  //   }, 200)
  // }, [])


  return (
    <Text3D
      font={font}
      size={0.25}
      height={0.3}
      rotation={[0, Math.PI / 2, 0]}
      position={[1.4, 1.6, 4.9]}
      material={[
        new MeshStandardMaterial({
          emissive: '#00FFCC',
          emissiveIntensity: 2.3,
          toneMapped: false,
          // visible: !isSignedIn,
        }),
        new MeshStandardMaterial({
          color: '#cbc9b3',
          // visible: true,
        }),
      ]}
    >
      {`click on screen\n to log in`}
    </Text3D>
  );
}