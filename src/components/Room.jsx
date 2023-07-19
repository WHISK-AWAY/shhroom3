import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Peer from "peerjs";
import { v4 as uuidv4 } from "uuid";
import verifyToken from "./utils";
import { AudioVideoControls, Chat } from "./index";
import { handleKeys } from "./e2e";

export default function Room({ socket }) {
  const navigate = useNavigate();

  const [peerVideoMuted, setPeerVideoMuted] = useState(false);
  const [ownVideoMuted, setOwnVideoMuted] = useState(false);
  const [peerAudioMuted, setPeerAudioMuted] = useState(false);
  const [ownAudioMuted, setOwnAudioMuted] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  // const [ownVideo, setOwnVideo] = useState({});
  const [peerVideo, setPeerVideo] = useState(null);
  const [peerCall, setPeerCall] = useState({});
  // const [myPeer, setMyPeer] = useState(null);
  const [remotePeerId, setRemotePeerId] = useState(null);

  const [messages, setMessages] = useState([]);
  // const [newMessage, setNewMessage] = useState('');
  const [connection, setConnection] = useState({});
  const [username, setUsername] = useState("");

  const myPeer = useRef(null);
  const myUser = useRef(null);
  // const myVideoElement = useRef(null);
  const ownVideo = useRef(null);
  const cryptFuncs = useRef({ encrypt: null, decrypt: null });
  const peerUserId = useRef(null);
  const peerPublicKey = useRef(null);

  const { roomId } = useParams();
  const peers = {};

  let peer = null;

  useEffect(() => {
    verifyToken().then((authUser) => {
      if (authUser === null) navigate("/signin");
      else {
        if (roomId === undefined) {
          const newRoomId = uuidv4();
          socket.emit("room-created", newRoomId);
          navigate(`/room/${newRoomId}`);
        } else {
          setUsername(authUser.username);
          myUser.current = authUser;
          // handleKeys function generates public/private keypair, then
          // stores the public key on the user record in database, and returns
          // encrypt/decrypt functions which have closure access to private key
          const { encrypt, decrypt, encodedPublicKey } = handleKeys(
            myUser.current.id,
          );
          myUser.current.publicKey = encodedPublicKey;
          cryptFuncs.current = { encrypt, decrypt };
          peer = new Peer(undefined, {
            secure: true,
          });
          peer.on("open", (peerId) => {
            // setMyPeer(peer);
            myPeer.current = peer;
            socket.emit(
              "join-room",
              peerId,
              roomId,
              myUser.current.id,
              myUser.current.publicKey,
            );
            getOwnVideo();
          });
        }
      }
    });
  }, [roomId]);

  async function getOwnVideo() {
    const myVideo = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    ownVideo.current = myVideo;

    const videoElement = document.querySelector("#own-video");
    videoElement.muted = true;
    videoElement.srcObject = ownVideo.current;

    //chat setup
    peer.on("connection", (conn) => {
      conn.on("open", () => {
        setConnection(conn);
        conn.on("data", (data) => {
          // insert the sender name here
          console.log("encrypted msg received:", data.message);
          appendMessage(
            cryptFuncs.current.decrypt(data.message, peerPublicKey.current),
            data.sender,
          );
        });
      });
    });

    peer.on("call", (call) => {
      call.answer(ownVideo.current);

      setRemotePeerId(call.peer);

      call.on("stream", (peerStream) => {
        setPeerCall(call);
        setPeerVideo(peerStream);
        peerUserId.current = call.options.metadata.userId;
        peerPublicKey.current = call.options.metadata.publicKey;
      });

      call.on("close", () => {
        setPeerVideo(null);
        call.close();
      });
    });

    socket.on("user-connected", (partnerPeerId, userId, publicKey) => {
      peerUserId.current = userId;
      peerPublicKey.current = publicKey;
      setTimeout(() => {
        connectToNewUser(partnerPeerId, ownVideo.current);
      }, 1000);
    });

    socket.on("user-disconnected", (partnerPeerId, userId) => {
      if (peers[partnerPeerId]) {
        peers[partnerPeerId].close();
        setPeerVideo(null);
      }
      if (peerCall !== {}) setPeerVideo(null); // ! peerCall !== {} will ALWAYS return true - fix this
    });
  }

  const connectToNewUser = (partnerPeerId, stream) => {
    setRemotePeerId(partnerPeerId);
    chatConnection(partnerPeerId);

    const call = peer.call(partnerPeerId, stream, {
      metadata: {
        type: "video",
        userId: myUser.current.id,
        publicKey: myUser.current.publicKey,
      },
    });
    peers[partnerPeerId] = call;

    call.on("stream", (peerVideo) => {
      setPeerVideo(peerVideo);
    });

    call.on("close", () => {
      setPeerVideo(null);
    });
  };

  function appendScreenShare(stream) {
    const wrapperDiv = document.createElement("div");
    wrapperDiv.className =
      "flex flex-auto basis-1/2 flex-col max-w-[40%] order-2";

    const shareElement = document.createElement("video");
    shareElement.srcObject = stream;
    shareElement.addEventListener("loadedmetadata", (e) => e.target.play());

    wrapperDiv.appendChild(shareElement);
    const controls = document.createElement("button");
    controls.className = "w-6 h-6 relative -top-7";
    controls.innerHTML = `<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="w-6 h-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
    />
  </svg>`;
    wrapperDiv.append(controls);
    controls.addEventListener("click", () => {
      // shareElement.requestFullscreen();
    });
    const videoGrid = document.querySelector("#video-grid");
    videoGrid.appendChild(wrapperDiv);
  }

  async function beginScreenShare() {
    const myScreen = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: true,
    });

    // ownVideo.getAudioTracks().forEach((track) => {
    //   myScreen.addTrack(track);
    // });

    console.log("beginning screen share, hopefully");
    console.log("ownVideo video track", ownVideo.current.getVideoTracks()[0]);
    console.log("myScreen video track", myScreen.getVideoTracks()[0]);
    // ownVideo.current.removeTrack(ownVideo.current.getVideoTracks()[0]);
    // ownVideo.current.addTrack(myScreen.getVideoTracks()[0]);
    // ownVideo.current
    //   .getVideoTracks()[0]
    //   .replaceTrack(myScreen.getVideoTracks()[0]);

    // myScreen.removeTrack(myScreen.getAudioTracks()[0]);
    myScreen.addTrack(ownVideo.current.getAudioTracks()[0]);

    myPeer.current.call(
      remotePeerId,
      myScreen,
      { metadata: { type: "screen" } },
      (call) => {
        // i don't think i need anything here
      },
    );

    appendScreenShare(myScreen);
  }

  useEffect(() => {
    if (isScreenSharing && ownVideo.current && ownVideo.current.active)
      beginScreenShare();
  }, [isScreenSharing]);

  useEffect(() => {
    const peerVideoElement = document.querySelector("#peer-video");
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
    const conn = peer.connect(partnerPeerId);

    conn.on("open", () => {
      conn.on("data", (data) => {
        console.log("encrypted message received: ", data.message);
        appendMessage(
          cryptFuncs.current.decrypt(data.message, peerPublicKey.current),
          data.sender,
        );
      });

      setConnection(conn);
    });
  };

  // function to send file
  const sendFile = (partnerPeerId) => {
    // get file from input element
    // establish separate connection for file transfer
    // once open, send file one (16kb) chunk at a time until none remains
    // once finished, send message indicating completion
    // close out connection
  };

  // function to receive file
  const receiveFile = () => {
    // TODO: maybe use metadata to handle whether inbound connection is for chat or file?
  };

  function appendMessage(msg, sender) {
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
        id="video-grid"
        className={`flex justify-center gap-8 mt-24 ${
          isFullscreen ? "group is-fullscreen" : ""
        }`}
      >
        {ownVideo && (
          <div className="flex flex-auto basis-1/4 flex-col max-w-[45%] order-1 group-[.is-fullscreen]:absolute group-[.is-fullscreen]:z-10 group-[.is-fullscreen]:max-w-[15vw] group-[.is-fullscreen]:left-8 group-[.is-fullscreen]:top-8">
            {/*
            
            own video element
            
            */}
            <video
              className="rounded-sm group-[.is-fullscreen]:rounded-[100%] group-[.is-fullscreen]:object-cover group-[.is-fullscreen]:aspect-square shadow-lg shadow-black/50 z-0"
              id="own-video"
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
          <div className="flex flex-auto basis-1/4 flex-col max-w-[45%] order-3">
            <video
              className={`rounded-sm shadow-lg shadow-black/50 group-[.is-fullscreen]:absolute group-[.is-fullscreen]:bottom-0 group-[.is-fullscreen]:h-screen group-[.is-fullscreen]:object-cover group-[.is-fullscreen]:w-screen group-[.is-fullscreen]:left-0 ${
                isFullscreen ? "peer peer-video" : ""
              }`}
              id="peer-video"
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
      <button
        onClick={() => setIsScreenSharing(true)}
        className="flex justify-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z"
          />
        </svg>
      </button>
      <Chat
        messageList={messages}
        connection={connection}
        appendMessage={appendMessage}
        username={username}
        encrypt={cryptFuncs.current.encrypt}
        peerPublicKey={peerPublicKey.current}
      />
      <Link
        className="w-fit mr-4 self-end bg-gradient-to-t from-dark-purple0 to-dark-purple00 hover:shadow-dark-pink4/40 py-3 px-5 rounded-xl shadow-lg shadow-gray-900/60 transition duration-500 hover:scale-105 font-medium tracking-wide"
        to="/lobby"
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
