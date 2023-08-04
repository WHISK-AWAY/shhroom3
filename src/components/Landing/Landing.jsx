import {
  Suspense,
  createContext,
  useEffect,
  useState,
  lazy,
  useRef,
} from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';
import LoadingScreen from '../LoadingScreen';

const initialContext = {
  zoomMode: false,
  reset: null,
  targetPosition: null,
  targetLabel: null,
  setZoom: null,
  controlsEnabled: true,
  controls: null,
  camera: null,
};

export const ZoomContext = createContext(initialContext);

export default function Landing() {
  const [zoom, setZoom] = useState(initialContext);

  function reset() {
    setZoom((prev) => ({
      ...initialContext,
      setZoom,
      reset,
      controls: prev.controls,
      camera: prev.camera,
    }));

    return;
  }

  useEffect(() => {
    setZoom((prev) => ({
      ...prev,
      setZoom,
      reset,
    }));
  }, []);

  return (
    <ZoomContext.Provider value={zoom}>
      <Suspense fallback={<LoadingScreen />}>
        <div className='h-screen w-screen'>
          <Canvas
            frameloop='demand'
            shadows={'soft'}
            linear={false}
            gl={{
              powerPreference: 'high-performance',
              alpha: false,
              antialias: false,
              stencil: false,
              depth: true,
            }}
          >
            <color attach='background' args={['#0e0e0e']} />
            <Scene />
          </Canvas>
        </div>
      </Suspense>
    </ZoomContext.Provider>
  );
}
