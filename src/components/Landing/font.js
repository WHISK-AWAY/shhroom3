import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { useThree } from '@react-three/fiber';
export default function font() {
  const state = useThree();
  const text = 'NEW MEETING';
  let textMesh;
 

  const loader = new FontLoader();
  loader.load('/fonts/Train One_Regular.json', function (font) {
    const geometry = new TextGeometry(text, {
      font: font,
      size: 0.14,
      height: 0.12,
      curveSegments: 12,
    });

    textMesh = new THREE.Mesh(geometry, [
      new THREE.MeshStandardMaterial({
        emissive: '#2dfff8',
        emissiveIntensity: 2.5,
        toneMapped: false,
      }),
      new THREE.MeshStandardMaterial({ color: '#2dfff8' }),
    ]);

    state.scene.add(textMesh);
    // textMesh.scale = new Vector3(.1, .1, .1);
    textMesh.position.set(7.02, 4.67, -2.61);
  });

  return;
}
