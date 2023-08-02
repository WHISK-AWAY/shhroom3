import { useState, useRef, useEffect, useMemo } from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useControls } from 'leva';
import { Vector3 } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { object } from 'zod';

const objectPositions = {
  monitor: {
    position: new Vector3(4.6381804422498, 3.21644095212349, 1.367680231368329),
    angle: {
      azimuth: 2.1988344801812723,
      polar: 1.6225161318504906,
    },
  },
  sting: {
    position: new Vector3(
      8.744054639054083,
      3.544506309064059,
      -2.1159567013174625,
    ),
    angle: {
      azimuth: 0,
      polar: 1.510322935965452,
    },
  },
  newMeeting: {
    position: new Vector3(
      7.70950301070417,
      3.71810395421507,
      -0.18396312296402728,
    ),
    angle: {
      azimuth: 0.012257939116745217,
      polar: 1.7072616114694853,
    },
  },
  corkboard: {
    position: new Vector3(
      4.6169697324253685,
      4.269023824694518,
      1.8626983480977797,
    ),
    angle: {
      azimuth: 1.5415668172562578,
      polar: 1.5439007237722089,
    },
  },
  desktop: {
    position: new Vector3(
      5.785075623756164,
      3.8619187799492822,
      0.7723075650543063,
    ),
    angle: {
      azimuth: 1.7169396506616306,
      polar: 1.0750597335310477,
    },
  },
};

`
positionType = {
  zoomMode: boolean,
  returnPosition: Vector3,
  focus: Vector3,
  focusLabel: string,
}
`;

export default function ControlledCamera({ position }) {
  // const initPosition = useMemo(() => new Vector3(12.9, 3.5, 0.9), []);
  const initPosition = useMemo(
    () => new Vector3(10.16071, 3.55448, 3.91621),
    [],
  );
  const [controlsEnabled, setControlsEnabled] = useState(true);
  const camera = useRef(null);
  const controls = useRef(null);

  const {
    enableDamping,
    minAzimuthAngle,
    maxAzimuthAngle,
    minPolarAngle,
    maxPolarAngle,
    minDistance,
    maxDistance,
  } = useControls('Controls Settings', {
    enableDamping: {
      value: false,
    },
    minAzimuthAngle: {
      // value: 0.42,
      value: Math.PI / -1,
      min: Math.PI / -1,
      max: Math.PI / 1,
    },
    maxAzimuthAngle: {
      // value: 1.14,
      value: Math.PI,
      min: Math.PI / -1,
      max: Math.PI / 1,
    },
    minPolarAngle: {
      // value: 1.32,
      value: Math.PI / -1,
      min: Math.PI / -1,
      max: Math.PI / 1,
    },
    maxPolarAngle: {
      // value: 1.44,
      value: Math.PI,
      min: Math.PI / -1,
      max: Math.PI / 1,
    },
    minDistance: {
      value: 0,
      min: 0,
      max: 15,
    },
    maxDistance: {
      value: 15,
      min: 0,
      max: 50,
    },
  });

  return (
    <>
      <PerspectiveCamera
        ref={camera}
        makeDefault={true}
        position={
          position.zoomMode
            ? objectPositions[position.focusLabel]?.position
            : initPosition
        }
      />
      <OrbitControls
        // object={camera.current}
        ref={controls}
        enabled={controlsEnabled}
        makeDefault={true}
        enableDamping={enableDamping}
        minAzimuthAngle={minAzimuthAngle}
        maxAzimuthAngle={maxAzimuthAngle}
        minPolarAngle={minPolarAngle}
        maxPolarAngle={maxPolarAngle}
        minDistance={minDistance}
        maxDistance={maxDistance}
        target={position.zoomMode ? position.focus : [0, 2, 0]}
        onChange={() => {
          console.log('position package:', {
            position: `new Vector3(${camera.current.position.x}, ${camera.current.position.y}, ${camera.current.position.z})`,
            azimuth: controls.current.getAzimuthalAngle(),
            polar: controls.current.getPolarAngle(),
          });
        }}
      />
    </>
  );
}

// const cameraPosition = useControls('Camera Position', {
//   x: {
//     value: 11.481911718312443,
//     min: 0,
//     max: 15,
//   },
//   y: {
//     value: 4.1382137238851335,
//     min: 0,
//     max: 15,
//   },
//   z: {
//     value: 4.539515581805641,
//     min: 0,
//     max: 15,
//   },
// })
// const cameraTarget = useControls('Camera Target', {
//   x: {
//     value: 0.4,
//     min: -6,
//     max: 6,
//   },
//   y: {
//     value: 1.3,
//     min: -6,
//     max: 6,
//   },
//   z: {
//     value: -5.4,
//     min: -6,
//     max: 6,
//   },
// })
