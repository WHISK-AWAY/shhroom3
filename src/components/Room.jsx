import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import useShhroom from './hooks/useShhroom';
import joinRoom from '../lib/joinRoom';
import { Chat } from './index';
import VideoGrid from './VideoGrid/VideoGrid';
import RoomUserControls from './RoomUserControls';

export default function Room({ socket }) {
  const navigate = useNavigate();

  const [chatConnection, setChatConnection] = useState(null);
  const [videoCall, setVideoCall] = useState(null);

  const [ownSource, setOwnSource] = useState(null);
  const [peerSource, setPeerSource] = useState(null);
  const peerUserId = useRef(null);
  const peerPublicKey = useRef(null);
  const partnerPeerId = useRef(null);
  const [isUserControlsOpen, setIsUserControlsOpen] = useState(true);

  const { roomId } = useParams();
  const peers = {};


  const thisShhroomer = useShhroom();


  useEffect(() => {
    // Initialize room once shhroomer object is ready
    if (thisShhroomer.loading) return;

    if (thisShhroomer.error) {
      alert('Error initializing user:', thisShhroomer.error);
      console.error(thisShhroomer.error);
      navigate('/');
    }

    joinRoom(roomId, socket, navigate, thisShhroomer);
    getOwnVideo();
  }, [thisShhroomer.loading, roomId]);

  useEffect(() => {
    // Set up peer event handlers once video stream is available
    if (!ownSource) return;

    const myPeer = thisShhroomer.peerInfo.peer;

    // * Receive inbound call
    myPeer.on('call', (call) => {
      // gather partner information
      peerUserId.current = call.metadata.userId;
      peerPublicKey.current = call.metadata.publicKey;
      partnerPeerId.current = call.peer;

      // answer & store call
      call.answer(ownSource);
      setVideoCall(call);
    });

    // * Receive inbound chat connection
    myPeer.on('connection', (dataConnection) => {
      setChatConnection(dataConnection);
    });

    // * Call user when someone enters room
    socket.on('user-connected', (peerId, userId, publicKey) => {
      // gather partner information
      peerUserId.current = userId;
      peerPublicKey.current = publicKey;
      partnerPeerId.current = peerId;

      // give them time to get settled, then call partner
      setTimeout(() => {
        const [call, chat] = connectToNewUser(peerId, ownSource);
        setVideoCall(call);
        setChatConnection(chat);
      }, 1000);
    });

    // * Remove peer info when peer leaves room
    socket.on('user-disconnected', (partnerPeerId, userId) => {
      if (peers[partnerPeerId]) {
        peers[partnerPeerId].close();
      }

      removePeer();
    });

    return () => {
      // Clean up: remove event listeners
      myPeer.off('call');
      myPeer.off('connection');
      socket.off('user-connected');
      socket.off('user-disconnected');
    };
  }, [ownSource]);

  useEffect(() => {
    // Video call event handlers (inbound & outbound)
    if (!videoCall) return;

    videoCall.on('stream', (peerStream) => {
      setPeerSource(peerStream);
    });

    videoCall.on('close', () => {
      videoCall.close();
      removePeer();
    });

    peers[partnerPeerId.current] = videoCall;

    return () => {
      // Clean up: remove event listeners
      videoCall.off('stream');
      videoCall.off('close');
    };
  }, [videoCall]);

  async function getOwnVideo() {
    const tempSource = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    setOwnSource(tempSource);
  }

  const connectToNewUser = (peerId, ourVideoSource) => {
    // place video call to peer
    const newVideoCall = thisShhroomer.peerInfo.peer.call(
      peerId,
      ourVideoSource,
      {
        metadata: {
          type: 'video',
          userId: thisShhroomer.userInfo.id,
          publicKey: thisShhroomer.encryptionInfo.encodedPublicKey,
        },
      },
    );

    // establish chat connection with peer
    const newChatConnection = thisShhroomer.peerInfo.peer.connect(peerId);

    return [newVideoCall, newChatConnection];
  };

  function removePeer() {
    setPeerSource(null);
    setVideoCall(null);
    setChatConnection(null);
    peerUserId.current = null;
    peerPublicKey.current = null;
    partnerPeerId.current = null;
  }

  function leaveMeeting() {
    if (videoCall?.open) {
      videoCall.close()
    }

    if (chatConnection?.open) {
      chatConnection.close();
    }

    // shut down our audio/video stream
    ownSource.getTracks().forEach((track) => {
      if (track.readyState === 'live') {
        track.stop();
      }
    });

    removePeer();

    // remove our own peer info
    thisShhroomer.peerInfo.peer.destroy();

    // notify the server that we've left (to trigger partner to clean up)
    socket.emit('leave-room');

    navigate('/lobby');
  }


  http: return (
    <div className="bg-[url('/svg/wave2.svg')] bg-cover h-screen w-screen bg-no-repeat">
      <RoomUserControls
        roomId={roomId}
        leaveMeeting={leaveMeeting}
        thisShhroomer={thisShhroomer}
        isUserControlsOpen={isUserControlsOpen} 
        setIsUserControlsOpen={setIsUserControlsOpen}
      />
  
   <VideoGrid ownSource={ownSource} peerSource={peerSource} isUserControlsOpen={isUserControlsOpen} setIsUserControlsOpen={setIsUserControlsOpen}/>



  
    {chatConnection && (
      <Chat
      shhroomer={thisShhroomer}
      partnerPublicKey={peerPublicKey.current}
      chatConnection={chatConnection}
      />
      )}
      
      

      {/**
        <button
        className='w-fit mr-4 self-end bg-gradient-to-t from-dark-purple0 to-dark-purple00 hover:shadow-dark-pink4/40 py-3 px-5 rounded-xl shadow-lg shadow-gray-900/60 transition duration-500 hover:scale-105 font-medium tracking-wide'
        onClick={leaveMeeting}
        >
        Leave Meeting
        </button>
      */}
    </div>
  );
}
