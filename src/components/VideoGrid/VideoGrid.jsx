import { useState } from 'react';
import Video from './Video';

export default function VideoGrid({ ownSource, peerSource }) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <div
      id='video-grid'
      className={`flex justify-center gap-8 mt-24 ${
        isFullScreen ? 'group is-fullscreen' : ''
      }`}
    >
      {ownSource?.id && (
        <Video source={ownSource} setIsFullScreen={setIsFullScreen} />
      )}
      {peerSource?.id && (
        <Video source={peerSource} setIsFullScreen={setIsFullScreen} />
      )}
    </div>
  );
}
