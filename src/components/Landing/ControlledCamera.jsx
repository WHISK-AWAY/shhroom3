import { useState, useRef, useMemo, useContext, useEffect } from 'react';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useControls } from 'leva';
import { Euler, Vector3 } from 'three';
import { ZoomContext } from './Landing';
import { gsap } from 'gsap';
import { objectPositions } from './objectPositions.js';

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
  const { zoomMode, setZoom, controlsEnabled, targetLabel, targetPosition } =
    zoom;

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

  useEffect(() => {
    function onKeys(e) {
      if (e.keyCode === 27) {
        // Press ESC to return to initial camera/controls setup
        // Does nothing if zoomMode is already false
        zoom.reset();
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
      />
      <OrbitControls
        ref={controls}
        enabled={zoom?.targetLabel !== 'monitor'}
        enableZoom={controlsEnabled}
        enableRotate={controlsEnabled}
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
      />
    </>
  );
}
