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
import UserControls from '../UserControls';

const initialContext = {
  zoomMode: false,
  targetPosition: null,
  targetLabel: null,
  setZoom: null,
  controlsEnabled: true,
  isUserSigned: false,
};

// const LazyLoadingScreen = lazy(() => import('../LoadingScreen'));

export const ZoomContext = createContext(initialContext);

export default function Landing() {
  const [zoom, setZoom] = useState(initialContext);

  useEffect(() => {
    setZoom((prev) => ({ ...prev, setZoom }));
  }, []);

  //  const [isDOMLoaded, setIsDOMLoaded] = useState(false);
  // const [isCanvasLoaded, setIsCanvasLoaded] = useState(false);

  //  useEffect(() => {

  //    const handleLoad = () => {
  //      setIsDOMLoaded(true);
  //    };

  //    window.addEventListener('load', handleLoad);

  //    return () => {
  //      window.removeEventListener('load', handleLoad);
  //    };
  //  }, []);

  // useEffect(() => {
  //   const handleThreeJSReady = () => {
  //     setIsCanvasLoaded(true);
  //   };

  //   window.addEventListener('threejsready', handleThreeJSReady);

  //   return () => {
  //     window.removeEventListener('threejsready', handleThreeJSReady);
  //     setIsCanvasLoaded(false);
  //   };
  // }, [isCanvasLoaded]);

  //   const canvasRef = useRef(null);
  //  useEffect(() => {
  //    if (canvasRef.current && canvasRef.current.isReady) {
  //      setIsCanvasLoaded(true);
  //    }
  //  }, [isCanvasLoaded]);

  return (
    <div>
      <ZoomContext.Provider value={zoom}>
      <div className='h-screen w-screen '>
      <Suspense fallback={<LoadingScreen/>}>
      <UserControls/>
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
      </Suspense>
        </div>
      </ZoomContext.Provider>
    </div>
  );
}
