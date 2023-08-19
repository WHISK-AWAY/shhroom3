import { useState, useEffect } from 'react';
import Video from './Video';

export default function VideoGrid({
  ownSource,
  peerSource,
  isUserControlsOpen,
  setIsUserControlsOpen,
  thisShhroomer,
  partnerUsername,
}) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsUserControlsOpen(true);
    }, 4000);
  }, [setIsUserControlsOpen]);

  return (
    <div
      id='video-grid'
      className={`flex justify-center gap-8 pt-[5%] h-1/2 ${
        isFullScreen ? 'group is-fullscreen' : ''
      } ${
        isUserControlsOpen
          ? 'w-[80%] flex justify-end items-end self-end align-end ml-[14%] mx-auto'
          : ''
      }`}
    >
      {ownSource?.id && (
        <Video
          source={ownSource}
          setIsFullScreen={setIsFullScreen}
          fullScreenRole='us'
          thisShhroomer={thisShhroomer}
        />
      )}
      {peerSource?.id && (
        <Video
          source={peerSource}
          setIsFullScreen={setIsFullScreen}
          fullScreenRole='them'
          partnerUsername={partnerUsername}
        />
      )}
    </div>
  );
}
