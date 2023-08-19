import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { Mesh, MeshStandardMaterial } from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { useThree } from '@react-three/fiber';
import { GlobalContext } from '../../lib/context';
import { useContext } from 'react';

export default function RenderNewMeetingText() {
  const globalContext = useContext(GlobalContext);
  const state = useThree();
  const text = 'NEW MEETING';

  const loader = new FontLoader();
  loader.load('/fonts/Train One_Regular.json', function (font) {
    // loader.load(train, function (font) {
    const geometry = new TextGeometry(text, {
      font: font,
      size: 0.14,
      height: 0.12,
    });

    const textMesh = new Mesh(geometry, [
      new MeshStandardMaterial({
        emissive: '#2dfff8',
        emissiveIntensity: isSignedIn ? 10 : 0,
        toneMapped: false,
      }),
      new MeshStandardMaterial({ color: '#2dfff8' }),
    ]);

    textMesh.position.set(6.99, 4.67, -2.61);

    state.scene.add(textMesh);
  });

  // useEffect(() => {}, [globalContext.isSignedIn]);

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
  return <></>;
}
