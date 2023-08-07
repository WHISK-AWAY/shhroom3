import { Suspense, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Tube } from '@react-three/drei';

import { LoadingScreen } from '../../components';
import {
  Curve,
  CatmullRomCurve3,
  TubeGeometry,
  Vector3,
  MeshBasicMaterial,
  DoubleSide,
  Vector2,
} from 'three';

export default function Tunnel() {
  const { camera, controls } = useThree((state) => ({
    camera: state.camera,
    controls: state.controls,
  }));

  const ww = window.innerWidth;
  const wh = window.innerHeight;

  // useEffect(() => {
  //   camera.rotateY(Math.PI);
  //   camera.updateProjectionMatrix();
  // }, []);

  function setupCurve() {
    const points = [];

    for (let i = 0; i < 5; i++) {
      points.push(new Vector3(0, 0, 3 * (i / -4)));
    }

    points[4].y = -0.06;
    const curve = new CatmullRomCurve3(points);
    curve.type = 'catmullrom';

    return curve;
  }

  return (
    <Tube args={[setupCurve(), 70, 0.02, 30, false]}>
      <meshBasicMaterial wireframe />
    </Tube>
  );
}
