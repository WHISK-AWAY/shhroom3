import { useState, useRef, useMemo, useContext, useEffect } from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useControls } from 'leva';
import { Euler, Vector3 } from 'three';
import { ZoomContext } from './Landing';
import { gsap } from 'gsap';

const objectPositions = {
  monitor: {
    position: new Vector3(
      4.698239424611961,
      3.187951515813853,
      1.3237225403016146,
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
      7.7084461220869285,
      3.760683379409692,
      1.4263831780533351,
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
  shelves: {
    position: new Vector3(
      6.473615611674839,
      4.678454382392811,
      -0.8232107616752935,
    ),
    angle: {
      azimuth: 1.529334831594238,
      polar: 1.5414218840606617,
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
    () => new Vector3(12.638605380728347, 4.068811215722277, 6.536314274451858),
    [],
  );
  const initTarget = useMemo(
    // () => new Vector3(10.16071, 3.55448, 3.91621),
    () => new Vector3(0, 2, 0),
    [],
  );
  const initRotation = useMemo(
    () =>
      new Euler(-0.23411310882365968, 0.8144339482297054, 0.17175091638566334),
  );
  const camera = useRef(null);
  const controls = useRef(null);
  const zoomTimeline = useRef(null);
  const zoom = useContext(ZoomContext);
  const {
    zoomMode,
    setZoom,
    controlsEnabled,
    targetLabel,
    targetPosition,
    isUserSigned,
  } = zoom;

  const [position, setPosition] = useState(initPosition);
  const [target, setTarget] = useState(initTarget);
  const [rotation, setRotation] = useState(initRotation);

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

  useEffect(() => {
    // provide reference to cam & controls objects to zoom context
    if (camera.current && controls.current) {
      setZoom((prev) => ({
        ...prev,
        camera: camera.current,
        controls: controls.current,
      }));
    }
  }, [camera.current, controls.current]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (zoomMode) {
        const { x, y, z } = objectPositions[targetLabel]?.position;
        const tl = gsap.timeline({ ease: 'power2.inOut' });
        console.log('animating to', targetLabel);

        tl.to(controls.current.target, {
          x: targetPosition.x,
          y: targetPosition.y,
          z: targetPosition.z,
          duration: 0.5,
          onUpdate: () => controls.current.update(),
        });

        tl.to(
          camera.current.position,
          {
            x,
            y,
            z,
            onUpdate: () => controls.current.update(),
            duration: 1,
          },
          '<',
        );

        zoomTimeline.current = tl;
      }
    });

    return () => {
      if (zoomTimeline.current)
        zoomTimeline.current.reverse().then(() => {
          ctx.revert();
        });
      else ctx.revert();
    };
  }, [zoomMode]);

  // useEffect(() => {
  //   if(isUserSigned) {

  //     setTimeout(() => {

  //       setZoom((prev) => ({
  //         ...prev,
  //         zoomMode: true,
  //         targetLabel: 'newMeeting',
  //         targetPosition: [7.71108, 3.65457, -2.58681],
  //         controlsEnabled: true,
  //         isUserSigned: false,
  //       }));
  //     }, 1000)
  //   }
  // }, [isUserSigned])

  // !
  // useEffect(() => {
  //   if (zoomMode) {
  //     setPosition(objectPositions[targetLabel]?.position);
  //     setTarget(targetPosition);
  //     // controls.current.enabled = false;
  //     // camera.current.position.set(objectPositions[targetLabel]?.position);
  //     // controls.current.update();
  //     // controls.current.enabled = true;
  //   } else {
  //     setPosition(initPosition);
  //     setTarget(initTarget);
  //     setRotation(initRotation);
  //   }
  // }, [zoomMode]);

  useEffect(() => {
    function onKeys(e) {
      if (e.keyCode === 27) {
        // Press ESC to return to initial camera/controls setup
        // Does nothing if zoomMode is already false
        setZoom((prev) => ({
          ...prev,
          zoomMode: false,
          targetPosition: null,
          targetLabel: null,
          controlsEnabled: true,
        }));
      } else if (e.keyCode === 32) {
        // Press Space to log out the camera & controls state
        console.log('Camera:', camera.current);
        console.log('Controls:', controls.current);
        console.log('Azimuthal angle:', controls.current.getAzimuthalAngle());
        console.log('Polar angle:', controls.current.getPolarAngle());
        console.log('ZoomContext:', zoom);
      }
    }

    window.addEventListener('keydown', onKeys);

    return () => window.removeEventListener('keydown', onKeys);
  });

  return (
    <>
      <PerspectiveCamera
        ref={camera}
        makeDefault={true}
        far={50}
        rotation={rotation}
        position={position}
        // position={
        //   zoomMode ? objectPositions[targetLabel]?.position : initPosition
        // }
        // onUpdate={(self) => console.log('cam rotation:', self.rotation)}
      />
      <OrbitControls
        ref={controls}
        // enabled={controlsEnabled}
        // makeDefault={true}
        zoomToCursor={true}
        enableDamping={enableDamping}
        minAzimuthAngle={minAzimuthAngle}
        maxAzimuthAngle={maxAzimuthAngle}
        minPolarAngle={minPolarAngle}
        maxPolarAngle={maxPolarAngle}
        minDistance={minDistance}
        maxDistance={maxDistance}
        target={target}
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
