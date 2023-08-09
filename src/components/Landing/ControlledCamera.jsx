import { useState, useRef, useMemo, useContext, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useControls } from 'leva';
import { Euler, Vector3 } from 'three';
import { gsap } from 'gsap';
import { objectPositions } from './objectPositions.js';

import { GlobalContext, LandingContext } from '../../lib/context';

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

  const raycaster = useThree((state) => state.raycaster);

  const globalContext = useContext(GlobalContext);
  const landingContext = useContext(LandingContext);

  const position = useRef(initPosition);
  const target = useRef(initTarget);
  const rotation = useRef(initRotation);

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
      value: 15,
      min: 0,
      max: 50,
    },
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
        const tl = gsap.timeline({ duration: 1 });

        tl.to(
          camera.current.position,
          {
            x: landingContext.camPosition.x,
            y: landingContext.camPosition.y,
            z: landingContext.camPosition.z,
            onUpdate: () => controls.current.update(),
          },
          '<',
        );

        tl.to(
          controls.current.target,
          {
            x: landingContext.targetPosition.x,
            y: landingContext.targetPosition.y,
            z: landingContext.targetPosition.z,
            onUpdate: () => controls.current.update(),
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
        // rotation={rotation.current}
        position={position.current}
      />
      <OrbitControls
        ref={controls}
        enabled={landingContext?.targetLabel !== 'monitor'}
        enableZoom={landingContext.controlsAreEnabled}
        enableRotate={landingContext.controlsAreEnabled}
        // makeDefault={true}
        zoomToCursor={true}
        enableDamping={enableDamping}
        minAzimuthAngle={minAzimuthAngle}
        maxAzimuthAngle={maxAzimuthAngle}
        minPolarAngle={minPolarAngle}
        maxPolarAngle={maxPolarAngle}
        minDistance={minDistance}
        maxDistance={maxDistance}
        target={target.current}
      />
    </>
  );
}
