import camera from '/svg/camera_test.svg';
import cameraRed from '/svg/camera_test_red.svg';
import mic from '/svg/mic.svg'
import micRed from '/svg/mic_red.svg'
import fullScreen from '/svg/full_screen.svg'
import gsap from 'gsap'
import { useEffect, useRef } from 'react';

export default function AudioVideoControls({
  videoState,
  setVideoState,
  fullScreenRole,
}) {
  const { audioIsMuted, videoIsMuted, isFullscreen } = videoState;
  const controlsContainer = useRef(null);

  // useEffect(() => {
  //   const ctx = gsap.context(() => {
  //     gsap.from(controlsContainer.current, {
  //       height: '100%',

  //     })
  //   })


  //   return () => {
  //     ctx.revert();
  //   }
  // }, [])

  

  return (
    <div ref={controlsContainer} className='audio-video-controls bg-gray-500/60 flex gap-1 -top-9 justify-center  group-[.is-fullscreen]:static items-center peer-[.peer-video]:absolute relative peer-[.peer-video]:bottom-0 peer-[.peer-video]:right-[40vw] my-1 py-1   '>
      <button
        className='video  transition-all duration-300 hover:scale-[1.1]'
        onClick={() =>
          setVideoState((prev) => ({ ...prev, videoIsMuted: !videoIsMuted }))
        }
      >
        {videoIsMuted ? (
          <img src={cameraRed} alt='' className='w-[80%]' />
        ) : (
          <img src={camera} alt='' className='w-[80%]' />
        )}
      </button>
      {fullScreenRole === 'them' && (
        <button
          className='resize  transition-all duration-300 hover:scale-[1.2]'
          onClick={() =>
            setVideoState((prev) => ({ ...prev, isFullscreen: !isFullscreen }))
          }
        >
          <img src={fullScreen} alt='' className='w-[70%]'/>
        </button>
      )}
      <button
        className='audio  transition-all duration-300 hover:scale-[1.2]'
        onClick={() =>
          setVideoState((prev) => ({ ...prev, audioIsMuted: !audioIsMuted }))
        }
      >
        {audioIsMuted ? (
          <img src={mic} className='w-[70%]' />
        ) : (
          <img src={micRed} className='w-[70%]' />
        )}
      </button>
    </div>
  );
}
