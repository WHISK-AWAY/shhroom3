import { useThree } from '@react-three/fiber';
import { Mesh, MeshStandardMaterial } from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

export default function RenderShhroomText() {
  const state = useThree();
  const text = 'shhroom_3.0';
  let textMesh;

  const loader = new FontLoader();
  loader.load('/fonts/Tektur_Regular.json', function (font) {
    const geometry = new TextGeometry(text, {
      font: font,
      size: 0.06,
      height: 0.12,
    });

    textMesh = new Mesh(geometry, [
      new MeshStandardMaterial({
        emissive: '#068325',
        emissiveIntensity: 18.5,
        toneMapped: false,
      }),
      new MeshStandardMaterial({ color: '#46ff74' }),
    ]);

    textMesh.position.set(3.0639, 3.91, -1.3944);
    textMesh.rotation.set(Math.PI / 2, 7.8, -Math.PI / 2);

    state.scene.add(textMesh);
  });

  return <></>;
}
