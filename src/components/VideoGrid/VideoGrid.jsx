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
      className={` flex justify-center gap-8 py-[2.5dvh] w-[85%] h-[65dvh]  items-end self-end align-end  
       ${isFullscreen ? 'group is-fullscreen' : ''}
    `}
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
