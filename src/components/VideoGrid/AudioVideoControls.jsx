import camera from '/svg/camera_test.svg';
import cameraRed from '/svg/camera_test_red.svg';
import mic from '/svg/mic.svg';
import micRed from '/svg/mic_red.svg';
import fullScreen from '/svg/full_screen.svg';
import gsap from 'gsap';
import { useContext, useEffect, useRef } from 'react';
import { RoomContext } from '../../lib/context';

export default function AudioVideoControls({
  videoState,
  setVideoState,
  fullScreenRole,
}) {
  const { audioIsMuted, videoIsMuted } = videoState;
  const roomContext = useContext(RoomContext);
  const { isFullscreen, setContext } = roomContext;
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
    <div
      ref={controlsContainer}
      className={`audio-video-controls bg-zinc-600/80 flex gap-2 w-full -bottom-1 justify-center peer-[.peer-video]:flex  peer-[.peer-video]:bg-zinc-600 peer-[.peer-video]:h-20 group-[.is-fullscreen]:bg-zinc-600/80 group-[.is-fullscreen]:flex peer-[.peer-video]:w-[100dvw] items-center peer-[.peer-video]:absolute absolute  my-1 py-1 opacity-0 hover:opacity-100 transition-opacity duration-500 hover:delay-100 z-50 h-14`}
    >
      <button
        className='video transition-all duration-300 hover:scale-[1.4]'
        onClick={() =>
          setVideoState((prev) => ({ ...prev, videoIsMuted: !videoIsMuted }))
        }
      >
        {videoIsMuted ? (
          <img src={cameraRed} alt='' className='w-[98%]' />
        ) : (
          <img src={camera} alt='' className='w-[98%]' />
        )}
      </button>
      {fullScreenRole === 'them' && (
        <button
          className='resize transition-all duration-300 hover:scale-[1.4]'
          onClick={() =>
            setContext((prev) => ({ ...prev, isFullscreen: !isFullscreen }))
          }
        >
          <img src={fullScreen} alt='' className='w-[88%]' />
        </button>
      )}
      <button
        className='audio transition-all duration-300 hover:scale-[1.4]'
        onClick={() =>
          setVideoState((prev) => ({ ...prev, audioIsMuted: !audioIsMuted }))
        }
      >
        {audioIsMuted ? (
          <img src={micRed} className='w-[98%]' />
        ) : (
          <img src={mic} className='w-[98%]' />
        )}
      </button>
    </div>
  );
}
