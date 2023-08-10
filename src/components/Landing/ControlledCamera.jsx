import { useRef, useContext, useEffect, useLayoutEffect, useMemo } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useControls } from 'leva';
import { gsap } from 'gsap';
import { objectPositions } from './objectPositions.js';

import { GlobalContext, LandingContext } from '../../lib/context';
import { Vector3 } from 'three';

export default function ControlledCamera() {
  const camera = useRef(null);
  const controls = useRef(null);
  const zoomTimeline = useRef(null);

  const raycaster = useThree((state) => state.raycaster);

  const globalContext = useContext(GlobalContext);
  const landingContext = useContext(LandingContext);

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
      value: -10,
      min: -10,
      max: 15,
    },
    maxDistance: {
      value: 50,
      min: 0,
      max: 50,
    },
  });

  const MIN_PAN = useMemo(() => {
    return new Vector3(4.5, -15, -4);
  }, []);
  const MAX_PAN = useMemo(() => {
    return new Vector3(6, 15, 4);
  }, []);

  useLayoutEffect(() => {
    function onChange() {
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

    controls.current.addEventListener('change', onChange);

    return () => {
      console.log('releasing pan limit');
      controls.current.removeEventListener('change', onChange);
    };
  });

  useEffect(() => {
    // set up zoomToTarget function
    // label: string (keyof objectPositions)
    function zoomToObject(label) {
      console.log('zooming to passed-in label:', label);

      if (!objectPositions[label]) {
        console.error(`No position information for label ${label}`);
        return;
      }

      const { camPosition, targetPosition } = objectPositions[label];

      landingContext.setContext((prev) => ({
        ...prev,
        isZoomed: true,
        targetLabel: label,
        targetPosition: targetPosition,
        camPosition: camPosition,
        controlsAreEnabled: false,
        signInHintIsVisible:
          label === 'monitor' ? false : prev.signInHintIsVisible,
      }));
    }

    landingContext.setContext((prev) => ({
      ...prev,
      zoomToObject,
    }));
  }, []);

  useEffect(() => {
    // set up raycaster to select only 'layer1' objects
    // objects are tagged 'layer1' in the Model file
    raycaster.layers.set(1);
  }, [raycaster]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (landingContext.targetLabel) {
        // animate to target
        const tl = gsap.timeline({
          duration: 1,
          onUpdate: () => {
            controls.current.update();
          },
        });

        tl.to(
          controls.current.target,
          {
            x: landingContext.targetPosition.x,
            y: landingContext.targetPosition.y,
            z: landingContext.targetPosition.z,
          },
          '<',
        );
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
          .duration(zoomTimeline.current.duration() / 2)
          .reverse()
          .then(() => ctx.revert());
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
        console.log('Raycaster:', raycaster);
        console.log('GlobalContext', globalContext);
        console.log('LandingContext', landingContext);
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
        position={objectPositions.initPosition.camPosition}
      />
      <OrbitControls
        ref={controls}
        enabled={true}
        enableZoom={landingContext.controlsAreEnabled}
        enableRotate={landingContext.controlsAreEnabled}
        enablePan={landingContext.targetLabel !== 'monitor'}
        makeDefault={true}
        zoomToCursor={true}
        enableDamping={true}
        dampingFactor={0.5}
        minAzimuthAngle={minAzimuthAngle}
        maxAzimuthAngle={maxAzimuthAngle}
        minPolarAngle={minPolarAngle}
        maxPolarAngle={maxPolarAngle}
        minDistance={minDistance}
        maxDistance={maxDistance}
        target={objectPositions.initPosition.targetPosition}
      />
    </>
  );
}
