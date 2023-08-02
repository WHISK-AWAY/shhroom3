import { useControls } from 'leva';

export default function ShhroomLampLight({ lightIsOn }) {
  const { castShadow, intensity, distance, color } = useControls(
    'Shhroom Primary Settings',
    {
      castShadow: {
        value: true,
      },
      intensity: {
        value: 3,
        min: 0,
        max: 5,
      },
      distance: {
        value: 4.4,
        min: 0,
        max: 10,
      },
      color: {
        value: '#46ff74',
      },
    },
  );

  const {
    castShadow: secondaryShadow,
    intensity: secondaryIntensity,
    distance: secondaryDistance,
    color: secondaryColor,
  } = useControls('Shhroom Secondary Settings', {
    castShadow: {
      value: false,
    },
    intensity: {
      value: 0.52,
      min: 0,
      max: 1,
    },
    distance: {
      value: 1.7,
      min: 0,
      max: 10,
    },
    color: {
      value: '#1baa3e',
    },
  });

  const { x, y, z } = useControls('Shhroom Primary Pos', {
    x: {
      value: 8.12,
      min: 6,
      max: 10,
    },
    y: {
      value: 2.39,
      min: 1,
      max: 4,
    },
    z: {
      value: -2.2,
      min: -4,
      max: 0,
    },
  });

  const secondaryPos = useControls('Shhroom Secondary Pos', {
    x: {
      value: 8.12,
      min: 6,
      max: 10,
    },
    y: {
      value: 2.54,
      min: 1,
      max: 4,
    },
    z: {
      value: -2.12,
      min: -4,
      max: 0,
    },
  });

  return (
    <>
      <pointLight
        castShadow={castShadow}
        intensity={lightIsOn ? intensity : 0}
        position={[x, y, z]}
        distance={distance}
        color={color}
      />
      <pointLight
        castShadow={secondaryShadow}
        intensity={lightIsOn ? secondaryIntensity : 0}
        position={[secondaryPos.x, secondaryPos.y, secondaryPos.z]}
        distance={secondaryDistance}
        color={secondaryColor}
      />
    </>
  );
}
