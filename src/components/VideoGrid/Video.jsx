import { useState, useEffect, useRef, useContext } from 'react';
import AudioVideoControls from './AudioVideoControls';
import { gsap } from 'gsap';
import { RoomContext } from '../../lib/context';

const fullScreenStyles = {
  us: {
    video:
      ' group-[.is-fullscreen]:rounded-full group-[.is-fullscreen]:object-cover group-[.is-fullscreen]:aspect-square',
    div: ' group-[.is-fullscreen]:absolute group-[.is-fullscreen]:z-10 group-[.is-fullscreen]:h-[15vw] group-[.is-fullscreen]:w-[15vw] group-[.is-fullscreen]:aspect-square group-[.is-fullscreen]:right-8 group-[.is-fullscreen]:top-8',
  },
  them: {
    video: ' group-[.is-fullscreen]:object-cover',
    div: ' group-[.is-fullscreen]:absolute group-[.is-fullscreen]:bottom-0 group-[.is-fullscreen]:h-screen group-[.is-fullscreen]:left-0 group-[.is-fullscreen]:w-screen',
  },
};

export default function Video({
  source,
  // setIsFullScreen,
  fullScreenRole,
  thisShhroomer,
  partnerUsername,
}) {
  const roomContext = useContext(RoomContext);

  const initialVideoState = {
    audioIsMuted: false,
    videoIsMuted: false,
  };

  const [videoState, setVideoState] = useState(initialVideoState);
  const vidElement = useRef(null);
  const controlsRef = useRef(null);

  useEffect(() => {
    // fullscreen transition animation
    const ctx = gsap.context(() => {
      if (roomContext.isFullscreen) {
        // ! going to have to sort out the us / them / full / not classes and use them in animation...
      }
    });

    return () => ctx.revert();
  }, [roomContext.isFullscreen]);

  useEffect(() => {
    source.getVideoTracks().forEach((video) => {
      video.enabled = !videoState.videoIsMuted;
    });

    source.getAudioTracks().forEach((audio) => {
      audio.enabled = !videoState.audioIsMuted;
    });
  }, [Object.values(videoState)]);

  useEffect(() => {
    vidElement.current.srcObject = source;
  }, [source, videoState]);

  const controls = controlsRef.current;

  return (
    <div
      className={
        ` flex h-full flex-col w-[45%] order-1 relative z-0 ` +
        fullScreenStyles[fullScreenRole].div
      }
    >
      <video
        muted={true}
        ref={vidElement}
        className={
          `rounded-sm object-cover h-full shadow-lg  shadow-black/50 z-0` +
          fullScreenStyles[fullScreenRole].video +
          (roomContext.isFullscreen && fullScreenRole === 'them'
            ? ' peer peer-video'
            : '')
        }
        onLoadedMetadata={(e) => e.target.play()}
      />
      <p
        className={`bg-black/30 px-4 py-1 absolute text-[1vw] font-vt text-white ${
          roomContext.isFullscreen
            ? fullScreenRole === 'us'
              ? 'bottom-0 left-1/2 translate-x-[-50%] -translate-y-full rounded-full invisible'
              : 'left-2 bottom-0 rounded-t-xl'
            : fullScreenRole === 'us'
            ? ''
            : ''
        } ${roomContext.isFullscreen ? '' : 'right-0 top-0 rounded-bl-xl'}`}
      >
        {fullScreenRole === 'us'
          ? thisShhroomer?.userInfo?.username
          : partnerUsername}
      </p>

      <AudioVideoControls
        videoState={videoState}
        setVideoState={setVideoState}
        fullScreenRole={fullScreenRole}
      />
    </div>
  );
}
