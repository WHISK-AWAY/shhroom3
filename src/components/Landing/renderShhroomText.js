import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { useThree } from '@react-three/fiber';


export default function shhroomText() {

 const state = useThree();
 const text = 'shhroom_3.0';
 let textMesh;

 const loader = new FontLoader();
 loader.load('/fonts/Tektur_Regular.json', function (font) {
   const geometry = new TextGeometry(text, {
     font: font,
     size: 0.06,
     height: 0.12,
     curveSegments: 12,
   });

   textMesh = new THREE.Mesh(geometry, [
     new THREE.MeshStandardMaterial({
       emissive: '#068325',
       emissiveIntensity: 18.5,
       toneMapped: false,
     }),
     new THREE.MeshStandardMaterial({ color: '#46ff74' }),
   ]);

   state.scene.add(textMesh);
   textMesh.position.set(3.0639, 3.91, -1.3944);
   textMesh.rotation.set(Math.PI / 2, 7.8, -Math.PI / 2);
 });


  return 
}
