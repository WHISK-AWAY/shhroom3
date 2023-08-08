import { useEffect, useRef } from 'react';
import {
  CatmullRomCurve3,
  Vector3,
  BackSide,
  RepeatWrapping,
  MirroredRepeatWrapping,
} from 'three';
import { useFrame } from '@react-three/fiber';
import { Tube, useTexture } from '@react-three/drei';
import { gsap } from 'gsap';

import bgTexture from '../../../public/bg/stars.jpg';

function setupCurve() {
  const points = [];

  for (let i = 0; i < 5; i++) {
    points.push(new Vector3(0, 0, 3 * (i / -4)));
  }

  // points[2].y = 0.03;
  points[4].y = -0.06;
  const curve = new CatmullRomCurve3(points);
  curve.type = 'catmullrom';

  return curve;
}

export default function Tunnel() {
  const materialRef = useRef(null);

  const texture = useTexture(bgTexture);
  texture.wrapS = MirroredRepeatWrapping;
  texture.wrapT = MirroredRepeatWrapping;

  const textureParams = useRef({
    offsetX: 2,
    offsetY: 0,
    repeatX: 10,
    repeatY: 4,
  });

  useFrame(() => {
    // update material position per-frame (in conjunction w / gsap animation)
    materialRef.current.map.offset.x = textureParams.current.offsetX;
    materialRef.current.map.offset.y = textureParams.current.offsetY;
    materialRef.current.map.repeat.set(
      textureParams.current.repeatX,
      textureParams.current.repeatY,
    );
  });

  useEffect(() => {
    // gsap animation to alter texture placement within tube
    const ctx = gsap.context(() => {
      const timelineTextureParams = textureParams.current;

      const tl = gsap.timeline({ repeat: -1 });

      tl.to(timelineTextureParams, {
        // wind up
        ease: 'power1.inOut',
        repeatX: 0.1,
        duration: 4,
      });

      tl.to(
        // fast section
        timelineTextureParams,
        {
          ease: 'power2.inOut',
          offsetX: 8,
          offsetY: 8,
          duration: 12,
        },
        0.5,
      );

      tl.to(
        // wind down
        timelineTextureParams,
        {
          ease: 'power1.inOut',
          duration: 6,
          repeatX: 10,
          offsetY: 6,
        },
        '-=5',
      );

      console.log(timelineTextureParams);
    });

    return () => ctx.revert();
  });

  return (
    <Tube scale={1.1} args={[setupCurve(), 70, 0.02, 30, false]}>
      <meshBasicMaterial
        ref={materialRef}
        map={texture}
        side={BackSide}
        displacementScale={0.4}
      />
    </Tube>
  );
}
