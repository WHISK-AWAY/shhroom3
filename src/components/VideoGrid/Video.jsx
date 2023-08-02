import { useState, useEffect, useRef } from 'react';
import AudioVideoControls from './AudioVideoControls';

const fullScreenStyles = {
  us: {
    video:
      ' group-[.is-fullscreen]:rounded-[100%] group-[.is-fullscreen]:object-cover group-[.is-fullscreen]:aspect-square',
    div: ' group-[.is-fullscreen]:absolute group-[.is-fullscreen]:z-10 group-[.is-fullscreen]:max-w-[15vw] group-[.is-fullscreen]:left-8 group-[.is-fullscreen]:top-8',
  },
  them: {
    video:
      ' group-[.is-fullscreen]:absolute group-[.is-fullscreen]:bottom-0 group-[.is-fullscreen]:h-screen group-[.is-fullscreen]:object-cover group-[.is-fullscreen]:w-screen group-[.is-fullscreen]:left-0',
    div: '',
  },
};

const initialState = {
  audioIsMuted: false,
  videoIsMuted: false,
  isFullscreen: false,
};

export default function Video({ source, setIsFullScreen, fullScreenRole }) {
  const [videoState, setVideoState] = useState(initialState);
  const vidElement = useRef(null);

  useEffect(() => {
    source.getVideoTracks().forEach((video) => {
      video.enabled = !videoState.videoIsMuted;
    });

    source.getAudioTracks().forEach((audio) => {
      audio.enabled = !videoState.audioIsMuted;
    });

    setIsFullScreen(videoState.isFullscreen);
  }, [Object.values(videoState)]);

  useEffect(() => {
    vidElement.current.srcObject = source;
  }, [source, videoState]);

  return (
    <div
      className={
        `flex flex-auto basis-1/4 flex-col max-w-[45%] order-1` +
        fullScreenStyles[fullScreenRole].div
      }
    >
      <video
        muted={true}
        ref={vidElement}
        className={
          `rounded-sm  shadow-lg shadow-black/50 z-0` +
          fullScreenStyles[fullScreenRole].video +
          (videoState.isFullscreen && fullScreenRole === 'them'
            ? ' peer peer-video'
            : '')
        }
        onLoadedMetadata={(e) => e.target.play()}
      ></video>
      <AudioVideoControls
        videoState={videoState}
        setVideoState={setVideoState}
        fullScreenRole={fullScreenRole}
      />
    </div>
  );
}