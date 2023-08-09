import { useState } from 'react';
import Video from './Video';

export default function VideoGrid({ ownSource, peerSource }) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <div
      id='video-grid'
      className={`flex justify-center gap-8 pt-24 ${
        isFullScreen ? 'group is-fullscreen' : ''
      }`}
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
