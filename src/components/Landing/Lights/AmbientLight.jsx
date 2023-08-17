import { useDetectGPU } from '@react-three/drei';


export default function AmbientLight({ lightIsOn }) {
  // const ambient = useControls('Ambient Light', {
  //   ambientLightIntensity: {
  //     value: 0.4,
  //     min: 0,
  //     max: 3,
  //   },
  //   color: {
  //     value: '#478667',
  //   },
  // });


  const gpu = useDetectGPU();
  return (
    <ambientLight
      intensity={gpu.tier === 0 ? 0.2 : .4}
      color={gpu.tier === 0 ? '#ede6b1' : '#478667' }
    />
  );
}
