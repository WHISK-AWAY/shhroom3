import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Chat } from './index';
import joinRoom from '../lib/joinRoom';
import useShhroom from './hooks/useShhroom';
import VideoGrid from './VideoGrid/VideoGrid';

export default function Room({ socket }) {
  const navigate = useNavigate();

  const [peerVideo, setPeerVideo] = useState(null);

  const [messages, setMessages] = useState([]);
  const [chatConnection, setChatConnection] = useState({});
  const [videoCall, setVideoCall] = useState(null);

  const [ownSource, setOwnSource] = useState(null);
  const [peerSource, setPeerSource] = useState(null);
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

    joinRoom(roomId, socket, navigate, thisShhroomer);
    getOwnVideo();
  }, [thisShhroomer.loading, roomId]);

  useEffect(() => {
    // Set up & tear down video call event handlers
    console.log('videoCall:', videoCall);
    if (!videoCall) return;

    videoCall.answer(ownSource);

    videoCall.on('stream', (peerStream) => {
      setPeerVideo(peerStream);
      peerUserId.current = videoCall.options.metadata.userId;
      peerPublicKey.current = videoCall.options.metadata.publicKey;
    });

    videoCall.on('close', () => {
      console.log('Closing call...');
      videoCall.close();
      setPeerVideo(null);
      setPeerSource(null);
      setVideoCall(null);
    });
  }, [videoCall]);

  async function getOwnVideo() {
    console.log('getting own video');
    const tempSource = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    setOwnSource(tempSource);

    // chat setup
    // ! why is this in getOwnVideo?
    thisShhroomer.peerInfo?.peer?.on('connection', (conn) => {
      conn.on('open', () => {
        setChatConnection(conn);
        conn.on('data', (data) => {
          appendMessage(
            thisShhroomer.encryptionInfo?.decrypt(
              data.message,
              peerPublicKey.current,
            ),
            data.sender,
          );
        });
      });
    });

    // * Receive inbound call
    thisShhroomer.peerInfo?.peer?.on('call', (call) => {
      setVideoCall(call);
    });

    // * Call user when someone enters room
    socket.on('user-connected', (partnerPeerId, userId, publicKey) => {
      console.log('received user-connected');
      peerUserId.current = userId;
      peerPublicKey.current = publicKey;

      setTimeout(() => {
        connectToNewUser(partnerPeerId, tempSource);
      }, 1000);
    });

    // * Tear down call when peer leaves room
    socket.on('user-disconnected', (partnerPeerId, userId) => {
      console.log('received user-disconnected');
      if (peers[partnerPeerId]) {
        peers[partnerPeerId].close();
      }

      setPeerVideo(null);
      setPeerSource(null);
      videoCall?.close();
      setVideoCall(null);
    });
  }

  const connectToNewUser = (partnerPeerId, stream) => {
    createChatConnection(partnerPeerId);

    const tempCall = thisShhroomer.peerInfo.peer.call(partnerPeerId, stream, {
      metadata: {
        type: 'video',
        userId: thisShhroomer.userInfo.id,
        publicKey: thisShhroomer.encryptionInfo.encodedPublicKey,
      },
    });

    peers[partnerPeerId] = tempCall;
    setVideoCall(tempCall);
  };

  useEffect(() => {
    // const peerVideoElement = document.querySelector('#peer-video');
    if (peerVideo) setPeerSource(peerVideo);
  }, [peerVideo]);

  const createChatConnection = (partnerPeerId) => {
    // TODO: this logic belongs in a separate chat component
    const conn = thisShhroomer.peerInfo?.peer?.connect(partnerPeerId);

    conn.on('open', () => {
      conn.on('data', (data) => {
        console.log('encrypted message received: ', data.message);
        appendMessage(
          thisShhroomer.encryptionInfo?.decrypt(
            data.message,
            peerPublicKey.current,
          ),
          data.sender,
        );
      });

      setChatConnection(conn);
    });
  };

  function appendMessage(msg, sender) {
    // TODO: this logic belongs in a separate chat component
    setMessages((prevMessages) => [
      ...prevMessages,
      { message: msg, timestamp: Date.now(), sender },
    ]);
  }

  function leaveMeeting() {
    if (videoCall?.open) {
      videoCall.close();
    }

    if (chatConnection.open) {
      chatConnection.close();
    }

    // shut down audio/video stream
    ownSource.getTracks().forEach((track) => {
      if (track.readyState === 'live') {
        track.stop();
      }
    });

    thisShhroomer.peerInfo.peer.destroy();

    socket.emit('leave-room');

    navigate('/lobby');
  }

  return (
    <div
      className={`flex flex-col gap-10 h-[calc(100vh_-_64px)] overflow-auto bg-gradient-to-b from-dark-purple00 to-black`}
    >
      <VideoGrid ownSource={ownSource} peerSource={peerSource} />
      <Chat
        messageList={messages}
        connection={chatConnection}
        appendMessage={appendMessage}
        username={thisShhroomer.userInfo?.username}
        encrypt={thisShhroomer.encryptionInfo?.encrypt}
        peerPublicKey={peerPublicKey.current}
      />
      <button
        className='w-fit mr-4 self-end bg-gradient-to-t from-dark-purple0 to-dark-purple00 hover:shadow-dark-pink4/40 py-3 px-5 rounded-xl shadow-lg shadow-gray-900/60 transition duration-500 hover:scale-105 font-medium tracking-wide'
        // to='/lobby'
        onClick={leaveMeeting}
      >
        Leave Meeting
      </button>
    </div>
  );
}
