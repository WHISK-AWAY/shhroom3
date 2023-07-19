import React from 'react';

export default function AudioVideoControls({
  isAudioMuted,
  isVideoMuted,
  muteAudio,
  muteVideo,
  setIsFullscreen,
  isFullscreen,
}) {
  // jimmy #peer-video: "rounded-sm shadow-lg shadow-black/50 z-0"

  // peerVideo.nextElementSibling.classList.toggle('absolute');
  // peerVideo.nextElementSibling.classList.toggle('bottom-0');
  // peerVideo.nextElementSibling.classList.toggle('relative');
  // peerVideo.nextElementSibling.classList.toggle('-top-7');
  // peerVideo.nextElementSibling.classList.toggle('right-[40vw]');
  // peerVideo.classList.toggle('absolute');
  // peerVideo.classList.toggle('bottom-0');
  // peerVideo.classList.toggle('h-screen');
  // peerVideo.classList.toggle('object-cover');
  // peerVideo.classList.toggle('w-screen');
  // peerVideo.classList.toggle('left-0');

  return (
    <div className='audio-video-controls flex gap-4 justify-center -top-7 group-[.is-fullscreen]:static items-end peer-[.peer-video]:absolute relative peer-[.peer-video]:bottom-0 peer-[.peer-video]:right-[40vw]'>
      <button className='video' onClick={() => muteVideo(!isVideoMuted)}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke={!isVideoMuted ? 'currentColor' : 'red'}
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            d='M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z'
          />
        </svg>
      </button>
      <button className='resize' onClick={() => setIsFullscreen(!isFullscreen)}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15'
          />
        </svg>
      </button>
      <button className='audio' onClick={() => muteAudio(!isAudioMuted)}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke={!isAudioMuted ? 'currentColor' : 'red'}
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z'
          />
        </svg>
      </button>
    </div>
  );
}
