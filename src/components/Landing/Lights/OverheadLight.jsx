import { useControls } from 'leva';

export default function OverheadLight({ lightIsOn }) {
  const { overheadLightIntensity, color } = useControls(
    'Overhead Light Settings',
    {
      overheadLightIntensity: {
        value: 0.2,
        min: 0,
        max: 3,
      },
      color: {
        value: '#5ba7a4',
      },
    },
  );

  const { x, y, z } = useControls('Overhead Light Position', {
    x: {
      value: 4.6,
      min: 0,
      max: 20,
    },
    y: {
      value: 1,
      min: 0,
      max: 20,
    },
    z: {
      value: 1.8,
      min: 0,
      max: 20,
    },
  });

  return (
    <directionalLight
      intensity={lightIsOn ? overheadLightIntensity : 0}
      color={color}
      position={[x, y, z]}
    />
  );
}
