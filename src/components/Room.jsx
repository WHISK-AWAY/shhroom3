import React, {
  useEffect,
  useState,
  useRef,
  lazy,
  Suspense,
  useContext,
  useLayoutEffect
} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useShhroom from './hooks/useShhroom';
import joinRoom from '../lib/joinRoom';
import { GlobalContext, RoomContext, initialRoomContext } from '../lib/context';
import {} from '../lib/context';
import { gsap } from 'gsap/gsap-core';


const Chat = lazy(() => import('./Chat'));
const VideoGrid = lazy(() => import('./VideoGrid/VideoGrid'));
const RoomUserControls = lazy(() => import('./RoomUserControls'));
const SignInOverlay = lazy(() => import('./SignInOverlay'));

export default function Room({ socket }) {
  const navigate = useNavigate();

  const globalContext = useContext(GlobalContext);

  const [roomContext, setRoomContext] = useState(initialRoomContext);

  const [chatConnection, setChatConnection] = useState(null);
  const [videoCall, setVideoCall] = useState(null);

  const [ownSource, setOwnSource] = useState(null);
  const [peerSource, setPeerSource] = useState(null);
  const peerUserId = useRef(null);
  const peerPublicKey = useRef(null);
  const partnerPeerId = useRef(null);
  const partnerUsername = useRef(null);
  const [isUserControlsOpen, setIsUserControlsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [showSigninOverlay, setSigninOverlay] = useState(false);

  const { roomId } = useParams();
  const peers = {};

  const thisShhroomer = useShhroom();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setSigninOverlay(true);
    } else {
      setSigninOverlay(false);
    }
  }, [globalContext.isSignedIn, thisShhroomer?.loading]);

  useEffect(() => {
    // Add setter / resetter to roomContext
    setRoomContext((prev) => ({
      ...prev,
      setContext: setRoomContext,
      resetContext: () =>
        setRoomContext((prev) => ({
          ...initialRoomContext,
          setContext: prev.setContext,
        })),
    }));
  }, []);

  useEffect(() => {
    // Add keypress listener to exit fullscreen
    function escapeKey(e) {
      if (roomContext.isFullscreen && e.keyCode === 27) {
        setRoomContext((prev) => ({ ...prev, isFullscreen: false }));
      }
    }

    window.addEventListener('keydown', escapeKey);

    return () => window.removeEventListener('keydown', escapeKey);
  }, [roomContext]);

  // useEffect(() => {
  //   console.log('room context:', roomContext);
  // }, [roomContext]);

  useEffect(() => {
    // Initialize room once shhroomer object is ready
    if (thisShhroomer.loading) return;

    if (thisShhroomer.error) {
      // alert('Error initializing user:', thisShhroomer.error);
      console.error(thisShhroomer.error);
    }

    if (globalContext.isSignedIn && !thisShhroomer.error) {
      joinRoom(roomId, socket, navigate, thisShhroomer);
      getOwnVideo();
    }
  }, [thisShhroomer.loading, globalContext.isSignedIn, roomId]);

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
      partnerUsername.current = call.metadata.username;

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
      // ? do we still need to give time? nowadays partner does not "report in" until their
      // ? video feed is ready, so we might be able to get rid of the setTimeout piece
      setTimeout(() => {
        const [call, chat] = connectToNewUser(peerId, ownSource);
        setVideoCall(call);
        setChatConnection(chat);
        // setIsChatOpen(true)
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
    try {
      const tempSource = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setOwnSource(tempSource);
    } catch (err) {
      console.log('error getting video:');
      console.dir(err);
    }
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
          username: thisShhroomer.userInfo.username,
        },
      },
    );

    // establish chat connection with peer
    const newChatConnection = thisShhroomer.peerInfo.peer.connect(peerId);
    // setIsChatOpen(true)
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
      videoCall.close();
    }

    if (chatConnection?.open) {
      // setIsChatOpen(false)
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

    navigate('/tunnel');
  }

  // console.log(thisShhroomer)

  const chatWrapper = document.querySelector('#chat-area');
  const videoWrapper = document.querySelector('#video-grid');

  useLayoutEffect(() => {
    
    if (isUserControlsOpen) {
        const ctx = gsap.context(() => {
          const tl = gsap.timeline({});
        tl.to(videoWrapper, {
          width: window.innerWidth <= 1920 ?  '85%' : '90%',
          duration: 1,
          ease: 'expo.inOut',
        }, '<')


      });
        return () => {
          ctx.revert();
        };


      } else {
        const ctx = gsap.context(() => {
          
          const tl = gsap.timeline({})
          tl.to(videoWrapper, {
            delay: 1.5,
            width: '100%',
            duration: .5,
            ease: 'expo.inOut',
          });
          
           
        })
        return () => {
          ctx.revert()
        }


      }
  }, [isUserControlsOpen]);


  return (
    <div className="bg-[url('/bg/test1.png')] bg-cover relative h-screen w-screen bg-no-repeat flex flex-col justify-between pb-9 overflow-hidden">
      <RoomContext.Provider value={roomContext}>
        {showSigninOverlay && <SignInOverlay />}
        <Suspense fallback={<p>Loading control hints...</p>}>
          <RoomUserControls
            roomId={roomId}
            leaveMeeting={leaveMeeting}
            thisShhroomer={thisShhroomer}
            isUserControlsOpen={isUserControlsOpen}
            setIsUserControlsOpen={setIsUserControlsOpen}
            setIsChatOpen={setIsChatOpen}
            partnerPeerId={partnerPeerId}
          />
        </Suspense>
        <Suspense fallback={<p>Loading video grid...</p>}>
          <VideoGrid
            ownSource={ownSource}
            peerSource={peerSource}
            isUserControlsOpen={isUserControlsOpen}
            setIsUserControlsOpen={setIsUserControlsOpen}
            thisShhroomer={thisShhroomer}
            partnerUsername={partnerUsername.current}
          />
        </Suspense>
        <div
          className={`${
            isChatOpen
              ? 'chat-container flex items-end h-[60%]  short:pt-3 pt-10 3xl:pt-4'
              : 'hidden'
          }`}
        >
          {chatConnection && (
            <Suspense fallback={<p>Loading chat component...</p>}>
              <Chat
                shhroomer={thisShhroomer}
                partnerPublicKey={peerPublicKey.current}
                chatConnection={chatConnection}
                isUserControlsOpen={isUserControlsOpen}
                setIsUserControlsOpen={setIsUserControlsOpen}
              />
            </Suspense>
          )}
        </div>
      </RoomContext.Provider>
    </div>
  );
}


{
  /**
 className={`${
            isChatOpen
              ? 'chat-container flex items-end h-fit xl:h-full short:h-fit short:pt-3 pt-10 3xl:pt-4'
              : 'hidden'
          }`} */
}