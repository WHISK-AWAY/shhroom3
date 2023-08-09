import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { useThree } from '@react-three/fiber';
import { GlobalContext } from '../../lib/context';
import { useContext, useEffect, useRef } from 'react';

export default function renderNewMeetingText() {
  const globalContext = useContext(GlobalContext)
  const state = useThree();
  const text = 'NEW MEETING';
  let textMesh = useRef(null)
  let geometry;


  const loader = new FontLoader();
  loader.load('/fonts/Train One_Regular.json', function (font) {
     geometry = new TextGeometry(text, {
      font: font,
      size: 0.14,
      height: 0.12,
      curveSegments: 12,
    });

    textMesh.current = new THREE.Mesh(geometry, [

      new THREE.MeshStandardMaterial({
        emissive: '#2dfff8',
        emissiveIntensity: globalContext.isSignedIn ? 2.5 : 0,
        toneMapped: false,
      }),
      new THREE.MeshStandardMaterial({ color: '#2dfff8' }),
    ]);

    state.scene.add(textMesh.current);

    textMesh.current.position.set(7.02, 4.67, -2.61);
  });

  
  useEffect(() => {

  }, [globalContext.isSignedIn])

  return;
}
