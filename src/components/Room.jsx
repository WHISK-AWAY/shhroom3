import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AudioVideoControls, Chat } from './index';
import joinRoom from '../lib/joinRoom';
import useShhroom from './hooks/useShhroom';

export default function Room({ socket }) {
  const navigate = useNavigate();

  const [peerVideoMuted, setPeerVideoMuted] = useState(false);
  const [ownVideoMuted, setOwnVideoMuted] = useState(false);
  const [peerAudioMuted, setPeerAudioMuted] = useState(false);
  const [ownAudioMuted, setOwnAudioMuted] = useState(false);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [peerVideo, setPeerVideo] = useState(null);

  const [messages, setMessages] = useState([]);
  const [connection, setConnection] = useState({});

  const myPublicKey = useRef(null);
  const ownVideo = useRef(null);
  const cryptFuncs = useRef({ encrypt: null, decrypt: null });
  const peerUserId = useRef(null);
  const peerPublicKey = useRef(null);

  const { roomId } = useParams();
  const peers = {};

  const thisShhroomer = useShhroom();

  useEffect(() => {
    if (thisShhroomer.loading) return;
    if (thisShhroomer.error) {
      alert('Error organizing user info:', thisShhroomer.error);
      console.error(thisShhroomer.error);
      navigate('/');
    }

    myPublicKey.current = thisShhroomer.encryptionInfo.encodedPublicKey;
    cryptFuncs.current = {
      decrypt: thisShhroomer.encryptionInfo.decrypt,
      encrypt: thisShhroomer.encryptionInfo.encrypt,
    };

    joinRoom(roomId, socket, navigate, thisShhroomer);
    getOwnVideo();
  }, [thisShhroomer.loading, roomId]);

  async function getOwnVideo() {
    const myVideo = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    ownVideo.current = myVideo;

    const videoElement = document.querySelector('#own-video');
    videoElement.muted = true;
    videoElement.srcObject = ownVideo.current;

    //chat setup
    thisShhroomer.peerInfo?.peer?.on('connection', (conn) => {
      conn.on('open', () => {
        setConnection(conn);
        conn.on('data', (data) => {
          // insert the sender name here
          console.log('encrypted msg received:', data.message);
          appendMessage(
            cryptFuncs.current.decrypt(data.message, peerPublicKey.current),
            data.sender,
          );
        });
      });
    });

    thisShhroomer.peerInfo?.peer?.on('call', (call) => {
      call.answer(ownVideo.current);

      call.on('stream', (peerStream) => {
        // setPeerCall(call);
        setPeerVideo(peerStream);
        peerUserId.current = call.options.metadata.userId;
        peerPublicKey.current = call.options.metadata.publicKey;
      });

      call.on('close', () => {
        setPeerVideo(null);
        call.close();
      });
    });

    socket.on('user-connected', (partnerPeerId, userId, publicKey) => {
      peerUserId.current = userId;
      peerPublicKey.current = publicKey;
      setTimeout(() => {
        connectToNewUser(partnerPeerId, ownVideo.current);
      }, 1000);
    });

    socket.on('user-disconnected', (partnerPeerId, userId) => {
      if (peers[partnerPeerId]) {
        peers[partnerPeerId].close();
      }
      setPeerVideo(null);
    });
  }

  const connectToNewUser = (partnerPeerId, stream) => {
    chatConnection(partnerPeerId);

    const call = thisShhroomer.peerInfo?.peer?.call(partnerPeerId, stream, {
      metadata: {
        type: 'video',
        userId: thisShhroomer.userInfo?.id,
        publicKey: thisShhroomer.encryptionInfo?.encodedPublicKey,
      },
    });
    peers[partnerPeerId] = call;

    call.on('stream', (peerVideo) => {
      setPeerVideo(peerVideo);
    });

    call.on('close', () => {
      setPeerVideo(null);
    });
  };

  useEffect(() => {
    const peerVideoElement = document.querySelector('#peer-video');
    if (peerVideo) peerVideoElement.srcObject = peerVideo;
  }, [peerVideo]);

  useEffect(() => {
    if (ownVideo && ownVideo.active) {
      ownVideo
        .getVideoTracks()
        .forEach((video) => (video.enabled = !ownVideoMuted));
    }

    peerVideo &&
      peerVideo.active &&
      peerVideo
        .getVideoTracks()
        .forEach((video) => (video.enabled = !peerVideoMuted));

    ownVideo &&
      ownVideo.active &&
      ownVideo
        .getAudioTracks()
        .forEach((audio) => (audio.enabled = !ownAudioMuted));

    peerVideo &&
      peerVideo.active &&
      peerVideo
        .getAudioTracks()
        .forEach((audio) => (audio.enabled = !peerAudioMuted));
  }, [ownVideoMuted, peerVideoMuted, ownAudioMuted, peerAudioMuted]);

  const chatConnection = (partnerPeerId) => {
    // TODO: this logic belongs in a separate chat component
    const conn = thisShhroomer.peerInfo?.peer?.connect(partnerPeerId);

    conn.on('open', () => {
      conn.on('data', (data) => {
        console.log('encrypted message received: ', data.message);
        appendMessage(
          cryptFuncs.current.decrypt(data.message, peerPublicKey.current),
          data.sender,
        );
      });

      setConnection(conn);
    });
  };

  function appendMessage(msg, sender) {
    // TODO: this logic belongs in a separate chat component
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: msg, timestamp: Date.now(), sender },
    ]);
  }

  return (
    <div
      className={`flex flex-col gap-10 h-[calc(100vh_-_64px)] overflow-auto bg-gradient-to-b from-dark-purple00 to-black`}
    >
      <div
        id='video-grid'
        className={`flex justify-center gap-8 mt-24 ${
          isFullscreen ? 'group is-fullscreen' : ''
        }`}
      >
        {ownVideo && (
          <div className='flex flex-auto basis-1/4 flex-col max-w-[45%] order-1 group-[.is-fullscreen]:absolute group-[.is-fullscreen]:z-10 group-[.is-fullscreen]:max-w-[15vw] group-[.is-fullscreen]:left-8 group-[.is-fullscreen]:top-8'>
            {/*
            
            own video element
            
            */}
            <video
              className='rounded-sm group-[.is-fullscreen]:rounded-[100%] group-[.is-fullscreen]:object-cover group-[.is-fullscreen]:aspect-square shadow-lg shadow-black/50 z-0'
              id='own-video'
              onLoadedMetadata={(e) => e.target.play()}
            ></video>
            <AudioVideoControls
              isAudioMuted={ownAudioMuted}
              isVideoMuted={ownVideoMuted}
              muteAudio={setOwnAudioMuted}
              muteVideo={setOwnVideoMuted}
              setIsFullscreen={setIsFullscreen}
              isFullscreen={isFullscreen}
            />
          </div>
        )}
        {peerVideo && (
          <div className='flex flex-auto basis-1/4 flex-col max-w-[45%] order-3'>
            <video
              className={`rounded-sm shadow-lg shadow-black/50 group-[.is-fullscreen]:absolute group-[.is-fullscreen]:bottom-0 group-[.is-fullscreen]:h-screen group-[.is-fullscreen]:object-cover group-[.is-fullscreen]:w-screen group-[.is-fullscreen]:left-0 ${
                isFullscreen ? 'peer peer-video' : ''
              }`}
              id='peer-video'
              onLoadedMetadata={(e) => e.target.play()}
            />

            <AudioVideoControls
              isAudioMuted={peerAudioMuted}
              isVideoMuted={peerVideoMuted}
              muteAudio={setPeerAudioMuted}
              muteVideo={setPeerVideoMuted}
              setIsFullscreen={setIsFullscreen}
              isFullscreen={isFullscreen}
            />
          </div>
        )}
      </div>
      <Chat
        messageList={messages}
        connection={connection}
        appendMessage={appendMessage}
        username={thisShhroomer.userInfo?.username}
        encrypt={cryptFuncs.current.encrypt}
        peerPublicKey={peerPublicKey.current}
      />
      <Link
        className='w-fit mr-4 self-end bg-gradient-to-t from-dark-purple0 to-dark-purple00 hover:shadow-dark-pink4/40 py-3 px-5 rounded-xl shadow-lg shadow-gray-900/60 transition duration-500 hover:scale-105 font-medium tracking-wide'
        to='/lobby'
        onClick={() => {
          socket.disconnect();
          ownVideo.close();
        }}
      >
        Leave Meeting
      </Link>
    </div>
  );
}
