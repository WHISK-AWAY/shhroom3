import { useState } from 'react';
import Video from './Video';

export default function VideoGrid({ ownSource, peerSource, isUserControlsOpen }) {
  const [isFullScreen, setIsFullScreen] = useState(false);


  return (
    <div
      id='video-grid'
      className={`flex justify-center gap-8 pt-24 ${
        isFullScreen ? 'group is-fullscreen' : ''
      } ${isUserControlsOpen ? 'w-[90%] flex justify-end items-end self-end align-end ml-[14%]' : ''}`}
    >
      {ownSource?.id && (
        <Video
          source={ownSource}
          setIsFullScreen={setIsFullScreen}
          fullScreenRole='us'
        />
      )}
      {peerSource?.id && (
        <Video
          source={peerSource}
          setIsFullScreen={setIsFullScreen}
          fullScreenRole='them'
        />
      )}
    </div>
  );
}
