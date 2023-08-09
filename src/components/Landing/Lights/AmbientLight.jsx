import { useControls } from 'leva';

export default function AmbientLight({ lightIsOn }) {
  const ambient = useControls('Ambient Light', {
    ambientLightIntensity: {
      value: 0.4,
      min: 0,
      max: 3,
    },
    color: {
      value: '#478667',
    },
  });

  return (
    <ambientLight
      intensity={ambient.ambientLightIntensity}
      color={ambient.color}
    />
  );
}
