import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { Mesh, MeshStandardMaterial } from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { useThree } from '@react-three/fiber';
import { GlobalContext } from '../../lib/context';
import { useContext, useEffect, useRef, useState } from 'react';

export default function renderNewMeetingText() {
  const globalContext = useContext(GlobalContext);
  const state = useThree();
  const text = 'NEW MEETING';
  let textMesh = useRef(null);
  let geometry;
  // let intensity = 2.5
  const [intensity, setIntensity] = useState(true);

  const loader = new FontLoader();
  loader.load('/fonts/Train One_Regular.json', function (font) {
    geometry = new TextGeometry(text, {
      font: font,
      size: 0.14,
      height: 0.12,
      curveSegments: 12,
    });

    textMesh.current = new Mesh(geometry, [
      new MeshStandardMaterial({
        emissive: '#2dfff8',
        emissiveIntensity: globalContext.isSignedIn && intensity ? 10 : 0,
        toneMapped: false,
      }),
      new MeshStandardMaterial({ color: '#2dfff8' }),
    ]);

    state.scene.add(textMesh.current);

    textMesh.current.position.set(6.99, 4.67, -2.61);
  });

  useEffect(() => {}, [globalContext.isSignedIn]);

  // useEffect(() => {
  //   if(!intensity) {

  //     setTimeout(() => {
  //       setIntensity(true)
  //     }, 500)
  //     // setIntensity(false)
  //   }
  // }, [intensity])

  // useEffect(() => {
  //   if(!globalContext.isSignedIn) {
  //    let interval =  setInterval(() => {
  //       setIntensity((prev) => !prev)
  //     }, 1000)
  //   }

  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [])
  return;
}
