import { useRef, useContext, useEffect, useMemo, useLayoutEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useControls } from 'leva';
import { gsap } from 'gsap';
import { objectPositions } from './objectPositions.js';

import { GlobalContext, LandingContext } from '../../lib/context';
import { Vector3 } from 'three';

const MIN_AZ = 0.42;
const MAX_AZ = 1.14;

export default function ControlledCamera() {
  const camera = useRef(null);
  const controls = useRef(null);
  const zoomTimeline = useRef(null);

  // const [minAzimuthAngle, setMinAzimuthAngle] = useState(undefined);
  // const [maxAzimuthAngle, setMaxAzimuthAngle] = useState(undefined);

  const raycaster = useThree((state) => state.raycaster);

  const globalContext = useContext(GlobalContext);
  const landingContext = useContext(LandingContext);

  // const {
  //   // enableDamping,
  //   // minAzimuthAngle,
  //   // maxAzimuthAngle,
  //   minPolarAngle,
  //   maxPolarAngle,
  //   // minDistance,
  //   // maxDistance,
  // } = useControls('Controls Settings', {
  //   enableDamping: {
  //     value: true,
  //   },
  //   // minAzimuthAngle: {
  //   //   value: 0.42,
  //   //   min: Math.PI / -1,
  //   //   max: Math.PI / 1,
  //   // },
  //   // maxAzimuthAngle: {
  //   //   value: 1.14,
  //   //   min: Math.PI / -1,
  //   //   max: Math.PI / 1,
  //   // },
  //   minPolarAngle: {
  //     // value: 1.32,
  //     value: 1.42,
  //     min: Math.PI / -1,
  //     max: Math.PI / 1,
  //   },
  //   maxPolarAngle: {
  //     // value: 1.44,
  //     value: 1.64,
  //     min: Math.PI / -1,
  //     max: Math.PI / 1,
  //   },
  //   // minDistance: {
  //   //   value: -10,
  //   //   min: -10,
  //   //   max: 15,
  //   // },
  //   // maxDistance: {
  //   //   value: 10.5,
  //   //   min: 0,
  //   //   max: 50,
  //   // },
  // });

  useEffect(() => {
    if (landingContext.atHomePosition) {
      controls.current.minAzimuthAngle = MIN_AZ;
      controls.current.maxAzimuthAngle = MAX_AZ;
    } else {
      controls.current.minAzimuthAngle = -Infinity;
      controls.current.maxAzimuthAngle = Infinity;
    }
    controls.current.update();
  }, [landingContext.atHomePosition]);

  /**
   * * PAN LIMITER
   */

  const MIN_PAN = useMemo(() => {
    return new Vector3(2, 2, 2);
  }, []);
  const MAX_PAN = useMemo(() => {
    return new Vector3(15, 4, 15);
  }, []);

  function panLimiter() {
    // console.log('onchange');
    if (landingContext.controlsAreEnabled) {
      const tempVector = new Vector3();
      tempVector.copy(controls.current.target);
      controls.current.target.clamp(MIN_PAN, MAX_PAN);
      tempVector.sub(controls.current.target);
      camera.current.position.sub(tempVector);
    }

    return;
  }

  useEffect(() => {
    if (landingContext.panningIsLimited) {
      // console.log('setting pan limit');
      // controls.current.addEventListener('change', onChange);
    } else controls.current.removeEventListener('change', panLimiter);

    return () => {
      // console.log('releasing pan limit');
      controls.current.removeEventListener('change', panLimiter);
    };
  }, [landingContext.panningIsLimited]);

  /**
   * * ZOOM TO OBJECT
   * @param label: string (keyof objectPositions)
   */

  function zoomToObject(label) {
    // console.log('zooming to passed-in label:', label);

    if (!objectPositions[label]) {
      console.error(`No position information for label ${label}`);
      return;
    }

    const { camPosition, targetPosition } = objectPositions[label];

    landingContext.setContext((prev) => ({
      ...prev,
      targetLabel: label,
      targetPosition: targetPosition,
      camPosition: camPosition,
      controlsAreEnabled: false,
      signInHintIsVisible:
        label === 'monitor' ? false : prev.signInHintIsVisible,
    }));
  }

  /**
   * * RELEASE ZOOM
   */

  function releaseZoom() {
    zoomToObject('initPosition');
  }

  useEffect(() => {
    // Add zoomToObject & releaseZoom to landing context

    landingContext.setContext((prev) => ({
      ...prev,
      zoomToObject,
      releaseZoom,
    }));
  }, []);

  useEffect(() => {
    // set up raycaster to select only 'layer1' objects
    // objects are tagged 'layer1' in the Model file
    // raycaster.layers.set(1);
  }, [raycaster]);

  /**
   * * ZOOM IN/OUT ANIMATION
   */
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (landingContext.targetLabel) {
        // animate to target
        const tl = gsap.timeline({
          defaults: {
            duration: 1,
            ease: 'power1.inOut',
          },
          onUpdate: () => {
            controls.current.update();
          },
          onStart: () => {
            landingContext.setContext((prev) => ({
              ...prev,
              panningIsLimited: false,
              atHomePosition: false,
            }));
          },
          onComplete: () => {
            landingContext.setContext((prev) => ({
              ...prev,
              isZoomed: true,
            }));
          },
          onReverseComplete: () => {
            landingContext.setContext((prev) => ({
              ...prev,
              isZoomed: false,
              panningIsLimited: true,
            }));
          },
        });

        tl.to(controls.current.target, {
          x: landingContext.targetPosition.x,
          y: landingContext.targetPosition.y,
          z: landingContext.targetPosition.z,
        });
        tl.to(
          camera.current.position,
          {
            x: landingContext.camPosition.x,
            y: landingContext.camPosition.y,
            z: landingContext.camPosition.z,
          },
          '<',
        );

        zoomTimeline.current = tl;
      } else zoomTimeline.current = null;
    });

    return () => {
      if (zoomTimeline.current) {
        zoomTimeline.current
          // .duration(zoomTimeline.current.duration() / 2)
          .reverse()
          .then(() => {
            landingContext.setContext((prev) => ({
              ...prev,
              atHomePosition: prev.targetLabel === 'initPosition',
            }));
            ctx.revert();
          });
      } else ctx.revert();
    };
  }, [landingContext.targetLabel]);

  useEffect(() => {
    // set up keypress events

    function onKeys(e) {
      if (e.keyCode === 27) {
        // Press ESC to return to initial camera/controls setup
        // Does nothing if zoomMode is already false
        landingContext.releaseZoom();
      } else if (e.keyCode === 32) {
        // Press Space to log out the camera & controls state
        console.log('Camera:', camera.current);
        console.log('Controls:', controls.current);
        console.log('GlobalContext:', globalContext);
        console.log('LandingContext:', landingContext);
      }
    }

    window.addEventListener('keydown', onKeys);

    return () => window.removeEventListener('keydown', onKeys);
  });

  if (!landingContext) return null;

  return (
    <>
      <PerspectiveCamera
        ref={camera}
        makeDefault={true}
        far={50}
        position={objectPositions.initPosition.camPosition}
      />
      <OrbitControls
        ref={controls}
        enabled={true}
        enableZoom={true}
        maxDistance={15.5}
        // enableZoom={landingContext.controlsAreEnabled}
        enableRotate={landingContext.atHomePosition}
        // enableRotate={landingContext.controlsAreEnabled}
        //enablePan={
          //landingContext.isZoomed &&
         // !['monitor', 'initPosition'].includes(landingContext.targetLabel)
       // }
       enablePan={true}
        makeDefault={true}
        zoomToCursor={true}
        enableDamping={true}
        dampingFactor={0.1}
        minAzimuthAngle={0.42}
        maxAzimuthAngle={1.14}
        minPolarAngle={1.42}
        maxPolarAngle={1.64}
        target={objectPositions.initPosition.targetPosition}
        panSpeed={0.5}
      />
    </>
  );
}
