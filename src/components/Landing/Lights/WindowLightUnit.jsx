import { useState } from 'react';
import { SpotLight } from '@react-three/drei';
import { Object3D, Vector3 } from 'three';

const defaultControlSettings = {
  intensity: {
    value: 3,
    min: 0,
    max: 3,
  },
  penumbra: {
    value: 0.8,
    min: 0,
    max: 1,
  },
  attenuation: {
    value: 6.5,
    min: 0,
    max: 15,
  },
  distance: {
    value: 30,
    min: 0,
    max: 30,
  },
  angle: {
    value: 0,
    min: 0,
    max: Math.PI / 2,
  },
  anglePower: {
    value: 0,
    min: 0,
    max: 10,
  },
  castShadow: {
    value: false,
  },
  color: {
    value: '#fff',
  },
};

const defaultPositionSettings = {
  x: {
    value: 5.4,
    min: 4,
    max: 15,
  },
  y: {
    value: 5.86,
    min: 2,
    max: 10,
  },
  z: {
    value: -7.8,
    min: -20,
    max: 1,
  },
};

const defaultTargetSettings = {
  x: {
    value: 5,
    min: 0,
    max: 10,
  },
  y: {
    value: 0.9,
    min: -5,
    max: 10,
  },
  z: {
    value: 3.2,
    min: -2,
    max: 15,
  },
};

export default function WindowLightUnit({
  // lightLabel,
  settings = defaultControlSettings,
  lightPosition = defaultPositionSettings,
  targetPosition = defaultTargetSettings,
}) {
  const [target] = useState(() => new Object3D());

  // const {
  //   intensity,
  //   penumbra,
  //   attenuation,
  //   distance,
  //   angle,
  //   anglePower,
  //   castShadow,
  //   color,
  // } = useControls(`${lightLabel} Settings`, {
  //   intensity: {
  //     ...defaultControlSettings.intensity,
  //     ...settings.intensity,
  //   },
  //   penumbra: {
  //     ...defaultControlSettings.penumbra,
  //     ...settings.penumbra,
  //   },
  //   attenuation: {
  //     ...defaultControlSettings.attenuation,
  //     ...settings.attenuation,
  //   },
  //   distance: {
  //     ...defaultControlSettings.distance,
  //     ...settings.distance,
  //   },
  //   angle: {
  //     ...defaultControlSettings.angle,
  //     ...settings.angle,
  //   },
  //   anglePower: {
  //     ...defaultControlSettings.anglePower,
  //     ...settings.anglePower,
  //   },
  //   castShadow: {
  //     value:
  //       settings.castShadow?.value || defaultControlSettings.castShadow!.value,
  //   },
  //   color: {
  //     value: settings.color?.value || defaultControlSettings.color!.value,
  //   },
  // });

  // const lightPos = useControls(`${lightLabel} Position`, {
  //   x: {
  //     value: lightPosition.x.value,
  //     min: lightPosition.x.min
  //       ? lightPosition.x.min
  //       : lightPosition.x.value - 5,
  //     max: lightPosition.x.max
  //       ? lightPosition.x.max
  //       : lightPosition.x.value + 5,
  //   },
  //   y: {
  //     value: lightPosition.y.value,
  //     min: lightPosition.y.min
  //       ? lightPosition.y.min
  //       : lightPosition.y.value - 5,
  //     max: lightPosition.y.max
  //       ? lightPosition.y.max
  //       : lightPosition.y.value + 5,
  //   },
  //   z: {
  //     value: lightPosition.z.value,
  //     min: lightPosition.z.min
  //       ? lightPosition.z.min
  //       : lightPosition.z.value - 5,
  //     max: lightPosition.z.max
  //       ? lightPosition.z.max
  //       : lightPosition.z.value + 5,
  //   },
  // });

  // const targetPos = useControls(`${lightLabel} Target`, {
  //   x: {
  //     value: targetPosition.x.value,
  //     min: targetPosition.x.min
  //       ? targetPosition.x.min
  //       : targetPosition.x.value - 5,
  //     max: targetPosition.x.max
  //       ? targetPosition.x.max
  //       : targetPosition.x.value + 5,
  //   },
  //   y: {
  //     value: targetPosition.y.value,
  //     min: targetPosition.y.min
  //       ? targetPosition.y.min
  //       : targetPosition.y.value - 5,
  //     max: targetPosition.y.max
  //       ? targetPosition.y.max
  //       : targetPosition.y.value + 5,
  //   },
  //   z: {
  //     value: targetPosition.z.value,
  //     min: targetPosition.z.min
  //       ? targetPosition.z.min
  //       : targetPosition.z.value - 5,
  //     max: targetPosition.z.max
  //       ? targetPosition.z.max
  //       : targetPosition.z.value + 5,
  //   },
  // });

  return (
    <>
      <SpotLight
        intensity={settings.intensity?.value}
        penumbra={settings.penumbra?.value}
        target={target}
        position={[
          lightPosition.x.value,
          lightPosition.y.value,
          lightPosition.z.value,
        ]}
        attenuation={settings.attenuation?.value}
        distance={settings.distance?.value}
        angle={settings.angle?.value}
        color={settings.color?.value}
        anglePower={settings.anglePower?.value}
        castShadow={settings.castShadow?.value || false}
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
      />
      <primitive
        object={target}
        position={
          new Vector3(
            targetPosition.x.value,
            targetPosition.y.value,
            targetPosition.z.value,
          )
        }
      />
    </>
  );
}
