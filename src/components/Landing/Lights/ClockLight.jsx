import { useControls } from 'leva';

export default function ClockLight({ lightIsOn }) {
  const { castShadow, intensity, distance, color } = useControls(
    'Clock Light Settings',
    {
      castShadow: {
        value: true,
      },
      intensity: {
        value: 0.25,
        min: 0,
        max: 1,
      },
      distance: {
        value: 5.7,
        min: 0,
        max: 10,
      },
      color: {
        value: '#ff0000',
      },
    },
  );

  const { x, y, z } = useControls('Clock Light Position', {
    x: {
      value: 8.68,
      min: 6,
      max: 10,
    },
    y: {
      value: 2.18,
      min: 1,
      max: 4,
    },
    z: {
      value: -2.0,
      min: -4,
      max: 0,
    },
  });
  return (
    <pointLight
      castShadow={castShadow}
      intensity={lightIsOn ? intensity : 0}
      position={[x, y, z]}
      distance={distance}
      color={color}
    />
  );
}
