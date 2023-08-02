import { useControls } from 'leva';

export default function LavaLampLight({ lightIsOn }) {
  const { castShadow, intensity, distance, color } = useControls(
    'Lava Lamp Settings',
    {
      castShadow: {
        value: true,
      },
      intensity: {
        value: 0.75,
        min: 0,
        max: 5,
      },
      distance: {
        value: 7.5,
        min: 0,
        max: 10,
      },
      color: {
        value: '#ff00dd',
      },
    },
  );

  const { x, y, z } = useControls('Lava Lamp Position', {
    x: {
      value: 3.8,
      min: -10,
      max: 10,
    },
    y: {
      value: 5.4,
      min: -10,
      max: 10,
    },
    z: {
      value: 0.2,
      min: -10,
      max: 10,
    },
  });
  return (
    <pointLight
      castShadow={castShadow}
      intensity={lightIsOn ? intensity : 0}
      position={[x, y, z]}
      distance={distance}
      color={color}
    ></pointLight>
  );
}
