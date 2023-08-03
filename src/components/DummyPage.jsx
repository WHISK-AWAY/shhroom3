import { useEffect, useMemo } from 'react';
import { Vector3 } from 'three';

export default function DummyPage({ zoomMode, zoomTo, setZoomMode }) {
  const monitorZoomPosition = useMemo(
    () => new Vector3(3.54909, 3.20587, 2.15376),
  );

  useEffect(() => {
    console.log(zoomMode);
  }, [zoomMode]);

  return (
    <div className='bg-slate-800 h-screen aspect-square'>
      <div
        className='h-screen aspect-square bg-white'
        onClick={(e) => {
          console.log('zoom mode is', zoomMode);
          if (zoomMode) {
            e.stopPropagation();
          } else {
            zoomTo(monitorZoomPosition, 'monitor');
            setZoomMode(true);
          }
        }}
      >
        <div className='text-center font-sans w-1/2 mx-auto py-[25vh] border border-slate-950 bg-slate-700 text-white'>
          <h1 className='text-[5rem]'>Hello</h1>
          <p className='text-xl'>World</p>
          <button
            className='px-20 py-12 border border-black bg-slate-400'
            onClick={() => {
              if (zoomMode) {
                setZoomMode(false);
                zoomTo(monitorZoomPosition, 'monitor');
              }
            }}
          >
            BACK
          </button>
        </div>
      </div>
    </div>
  );
}
