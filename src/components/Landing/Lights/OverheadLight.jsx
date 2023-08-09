import { useControls } from 'leva';

export default function OverheadLight({ lightIsOn }) {
  const { overheadLightIntensity, color } = useControls(
    'Overhead Light Settings',
    {
      overheadLightIntensity: {
        value: 0.47,
        min: 0,
        max: 3,
      },
      color: {
        value: '#528fba',
      },
    },
  );

  const { x, y, z } = useControls('Overhead Light Position', {
    x: {
      value: 3.8,
      min: 0,
      max: 20,
    },
    y: {
      value: 2.6,
      min: 0,
      max: 20,
    },
    z: {
      value: 0,
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
