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

  const [isCanvasLoaded, setIsCanvasLoaded] = useState(false);


  return (
    <div>
      <ZoomContext.Provider value={zoom}>
        <div className='h-screen w-screen '>
          <Suspense fallback={<LoadingScreen />}>
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
              <Scene setIsCanvasLoaded={setIsCanvasLoaded} />
            </Canvas>
            {isCanvasLoaded && <UserControls/>}
          </Suspense>
        </div>
      </ZoomContext.Provider>
    </div>
  );
}
