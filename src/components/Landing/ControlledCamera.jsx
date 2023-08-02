import { useState, useRef, useEffect, useMemo } from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useControls } from 'leva';
import { Vector3 } from 'three';
import { useFrame, useThree } from '@react-three/fiber';

export default function ControlledCamera({ position }) {
  const initPosition = useMemo(() => new Vector3(12.9, 3.5, 0.9), []);
  const [returnPosition, setReturnPosition] = useState(initPosition);
  const camera = useRef(null);

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
          position.focus
            ? [
                position.focus.x + 1.25,
                position.focus.y,
                position.focus.z - 0.75,
              ]
            : initPosition
        }
      />
      <OrbitControls
        // object={camera.current}
        makeDefault={true}
        enableDamping={enableDamping}
        minAzimuthAngle={minAzimuthAngle}
        maxAzimuthAngle={maxAzimuthAngle}
        minPolarAngle={minPolarAngle}
        maxPolarAngle={maxPolarAngle}
        minDistance={minDistance}
        maxDistance={maxDistance}
        target={position.focus ? position.focus : [0, 2, 0]}
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
