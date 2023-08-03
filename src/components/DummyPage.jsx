import { useContext, useEffect, useMemo } from 'react';
import { Vector3 } from 'three';
import { ZoomContext } from './Landing/Landing';

export default function DummyPage({ zoom }) {
  const monitorZoomPosition = useMemo(
    () => new Vector3(3.54909, 3.20587, 2.15376),
  );

  return (
    <div className='bg-slate-800 h-screen aspect-square'>
      <div
        className='h-screen aspect-square bg-white'
        onClick={(e) => {
          if (zoom.zoomMode) {
            e.stopPropagation();
          } else {
            zoom.setZoom((prev) => ({
              ...prev,
              targetPosition: monitorZoomPosition,
              targetLabel: 'monitor',
              zoomMode: true,
            }));
          }
        }}
      >
        <div className='text-center font-sans w-1/2 mx-auto py-[25vh] border border-slate-950 bg-slate-700 text-white'>
          <h1 className='text-[5rem]'>Hello</h1>
          <p className='text-xl'>World</p>
          <button
            className='px-20 py-12 border border-black bg-slate-400'
            onClick={(e) => {
              if (zoom.zoomMode) {
                zoom.setZoom((prev) => ({
                  ...prev,
                  targetPosition: null,
                  targetLabel: null,
                  zoomMode: false,
                }));
              } else {
                zoom.setZoom((prev) => ({
                  ...prev,
                  targetPosition: monitorZoomPosition,
                  targetLabel: 'monitor',
                  zoomMode: true,
                }));
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
