import { useState, useEffect, useContext } from 'react';
import Video from './Video';
import { RoomContext } from '../../lib/context';

export default function VideoGrid({
  ownSource,
  peerSource,
  isUserControlsOpen,
  setIsUserControlsOpen,
  thisShhroomer,
  partnerUsername,
}) {
  // const [isFullscreen, setIsFullscreen] = useState(false);

  const roomContext = useContext(RoomContext);
  const { isFullscreen } = roomContext;

  // useEffect(() => {
  //   setIsFullscreen(roomContext.isFullscreen);
  //   console.log('isfullscreen:', isFullscreen);
  // }, [roomContext.isFullscreen]);

  useEffect(() => {
    setTimeout(() => {
      setIsUserControlsOpen(true);
    }, 4000);
  }, [setIsUserControlsOpen]);

  return (
    <div
      id='video-grid'
      className={`border border-red-700 flex justify-center gap-8 py-[2.5dvh] h-[65dvh] ${
        isFullscreen ? 'group is-fullscreen' : ''
      } ${
        isUserControlsOpen
          ? 'w-[80%] flex justify-end items-end self-end align-end ml-[14%] mx-auto'
          : ''
      }`}
    >
      {ownSource?.id && (
        <Video
          source={ownSource}
          // setIsFullScreen={setIsFullScreen}
          fullScreenRole='us'
          thisShhroomer={thisShhroomer}
        />
      )}
      {peerSource?.id && (
        <Video
          source={peerSource}
          // setIsFullScreen={setIsFullScreen}
          fullScreenRole='them'
          partnerUsername={partnerUsername}
        />
      )}
    </div>
  );
}
