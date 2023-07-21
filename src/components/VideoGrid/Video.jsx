import { useState, useEffect, useRef } from 'react';
import AudioVideoControls from './AudioVideoControls';

const initialState = {
  audioIsMuted: false,
  videoIsMuted: false,
  isFullscreen: false,
};

export default function Video({ source, setIsFullScreen }) {
  const [videoState, setVideoState] = useState(initialState);
  const vidElement = useRef(null);

  useEffect(() => {
    source.current?.getVideoTracks().forEach((video) => {
      video.enabled = !videoState.videoIsMuted;
    });

    source.current?.getAudioTracks().forEach((audio) => {
      audio.enabled = !videoState.audioIsMuted;
    });

    setIsFullScreen(videoState.isFullscreen);
  }, [Object.values(videoState)]);

  useEffect(() => {
    vidElement.current.srcObject = source;
  }, [source]);

  return (
    <div className='flex flex-auto basis-1/4 flex-col max-w-[45%] order-1 group-[.is-fullscreen]:absolute group-[.is-fullscreen]:z-10 group-[.is-fullscreen]:max-w-[15vw] group-[.is-fullscreen]:left-8 group-[.is-fullscreen]:top-8'>
      <video
        muted={true}
        ref={vidElement}
        className='rounded-sm group-[.is-fullscreen]:rounded-[100%] group-[.is-fullscreen]:object-cover group-[.is-fullscreen]:aspect-square shadow-lg shadow-black/50 z-0'
        onLoadedMetadata={(e) => e.target.play()}
      ></video>
      <AudioVideoControls
        videoState={videoState}
        setVideoState={setVideoState}
      />
    </div>
  );
}
