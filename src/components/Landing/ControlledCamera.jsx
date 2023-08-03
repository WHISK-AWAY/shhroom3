import { useState, useRef, useMemo, useContext, useEffect } from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useControls } from 'leva';
import { Vector3 } from 'three';
import { ZoomContext } from './Landing';

const objectPositions = {
  monitor: {
    position: new Vector3(
      4.662861799014388,
      3.217627551879577,
      1.403076791998954,
    ),
    angle: {
      azimuth: 2.1638593117057345,
      polar: 1.5620427410210445,
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

export default function ControlledCamera() {
  const initPosition = useMemo(
    // () => new Vector3(10.16071, 3.55448, 3.91621),
    () => new Vector3(12.57972143593413, 3.781479374657364, 6.883373967098847),
    [],
  );
  const initTarget = useMemo(
    // () => new Vector3(10.16071, 3.55448, 3.91621),
    () => new Vector3(0, 2, 0),
    [],
  );
  const camera = useRef(null);
  const controls = useRef(null);
  const zoom = useContext(ZoomContext);

  const [position, setPosition] = useState(initPosition);
  const [target, setTarget] = useState(initTarget);

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

  /**
   * ZoomContext: {
   *  zoomMode: boolean;
   *  targetPosition: Vector3;
   *  targetLabel: string;
   *  controlsEnabled: boolean;
   *  setZoom: state setter;
   * }
   */

  useEffect(() => {
    // Press ESC to return to initial camera/controls setup
    // Does nothing if zoomMode is already false
    function onEscape(e) {
      if (e.keyCode === 27) {
        zoom.setZoom((prev) => ({
          ...prev,
          zoomMode: false,
          targetPosition: null,
          targetLabel: null,
          controlsEnabled: true,
        }));
      }
    }

    window.addEventListener('keydown', onEscape);

    return () => window.removeEventListener('keydown', onEscape);
  }, []);

  useEffect(() => {
    console.log('camera:', camera.current);
    console.log('controls:', controls.current);
  });

  // useEffect(() => {
  //   if (zoom.zoomMode) {
  //     controls.current.saveState();
  //   } else {
  //     controls.current.reset();
  //   }
  // }, [zoom.zoomMode]);

  // useEffect(() => {
  //   if (zoom.zoomMode && zoom.targetLabel === 'monitor') {
  //     setTimeout(() => {
  //       // controls.current.enabled = false;
  //     }, 200);
  //     // camera.current.position.set(objectPositions[zoom.targetLabel]?.position);
  //     // controls.current.update();
  //   } else {
  //     // camera.current.position.set(initPosition);
  //     // controls.current.enabled = true;
  //     // console.log('az:', controls.current.getAzimuthalAngle());
  //     controls.current.target.set(0, 2, 0);
  //     controls.current.setAzimuthalAngle(0.8);
  //     controls.current.update();
  //   }
  // }, [zoom.zoomMode]);

  return (
    <>
      <PerspectiveCamera
        ref={camera}
        makeDefault={true}
        far={50}
        position={
          zoom.zoomMode
            ? objectPositions[zoom.targetLabel]?.position
            : initPosition
        }
      />
      <OrbitControls
        ref={controls}
        // object={camera.current}
        // enabled={zoom.controlsEnabled}
        makeDefault={true}
        zoomToCursor={true}
        enableDamping={enableDamping}
        minAzimuthAngle={minAzimuthAngle}
        maxAzimuthAngle={maxAzimuthAngle}
        minPolarAngle={minPolarAngle}
        maxPolarAngle={maxPolarAngle}
        minDistance={minDistance}
        maxDistance={maxDistance}
        target={zoom.zoomMode ? zoom.targetPosition : [0, 2, 0]}
        // target={zoom.targetPosition || [0, 2, 0]}
        // onChange={() => {
        //   console.log('position package:', {
        //     position: `new Vector3(${camera.current.position.x}, ${camera.current.position.y}, ${camera.current.position.z})`,
        //     azimuth: controls.current.getAzimuthalAngle(),
        //     polar: controls.current.getPolarAngle(),
        //   });
        // }}
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
