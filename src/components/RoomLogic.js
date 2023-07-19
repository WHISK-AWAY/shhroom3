import Peer from 'peerjs';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const API_URL = 'http://localhost:3000';
// const API_URL = 'https://shhroom.live';

export async function checkToken() {
  // redundant with utils.verifyToken() -- move that to here when finished
  const token = window.localStorage.getItem('token');
  // console.log('token found in localstorage:', token);

  if (!token) return false;

  const { data } = await axios.get(API_URL + '/api/auth', {
    headers: { authorization: 'Bearer ' + token },
  });

  // should see username here
  // console.log('response from token authorization try:', data);

  if (!data) return false;

  return true;
}

export async function getVideo() {
  const myVideo = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  // why is this coming up null??
  const videoElement = document.querySelector('#own-video');
  console.log('videoElement', videoElement);
  videoElement.muted = true;
  videoElement.srcObject = myVideo;

  return myVideo;
}

export async function connectToPeerServer(socket, roomId, myVideo) {
  console.log('passed into connectToPeerServer:');
  console.log('socket:', socket);
  console.log('roomId:', roomId);

  const peer = new Peer(undefined, {
    secure: true,
    debug: 3,
  });

  return peer;
}

// peer.on('open', (peerId) => {
//   // myPeerId = peerId;
//   // console.log('my peer id is: ', peerId);
//   console.log(
//     'inside of this peer.on listener, i see peerId ' +
//       peerId +
//       '  and roomId of ' +
//       roomId
//   );
//   socket.emit('join-room', peerId, roomId);
// });

// peer.on('call', (call) => {
//   call.answer(myVideo);

//   // console.log('receiving call from peer id', call.peer);
//   // setRemotePeerId(call.peer);

//   call.on('stream', (peerStream) => {
//     // setPeerCall(call);
//     // setPeerVideo(peerStream);
//   });

//   call.on('close', () => {
//     // setPeerVideo(null);
//     call.close();
//   });
// });

// console.log('return from connectToPeerServer: ', peer);

function setCallReceivedListeners(peers, ownPeerObject, ownVideo) {
  ownPeerObject.on('call', (call) => {
    // console.log('Receiving call from peer id', call.peer);

    call.answer(ownVideo);

    call.on('stream', (inboundCallStream) => {
      // console.log('Call stream received: ', inboundCallStream);

      call.callStream = inboundCallStream;
      peers[call.peer] = call;
    });

    call.on('close', () => {
      // need to do something with the video?
      call.close();
      delete peers[call.peer];
    });

    // put call.on('close') here or outside on its own?
  });
}

export function generatePeers(ownPeerObject, ownVideo) {
  if (!ownPeerObject || !ownPeerObject.id) return null;

  let peers = {};

  // listen for & answer incoming calls
  setCallReceivedListeners(peers, ownPeerObject, ownVideo);

  //

  return peers;
}

export function callPeer(peerId, ownVideo) {}

// "main"
export async function enterRoom(roomId) {
  // check token
  const tokenIsValid = await checkToken();
  if (!tokenIsValid) {
    // console.log('Token check failed');
    return null;
  }

  // console.log('tokenIsValid: ', tokenIsValid); // should be true

  // determine whether this is a new room - create one if not
  if (!roomId) {
    // console.log(
    //   `Cannot enter ${roomId} room ID - must pass roomId to enterRoom()`
    // );
    return null;
  }
  // console.log('roomId:', roomId);

  // request/receive own peer id
  const ownPeerObj = await connectToPeerServer();
  if (!ownPeerObj) {
    // console.log(`Error retrieving peer object. Received: ${ownPeerObj}`);
    return null;
  }
  // console.log('ownPeerObj:', ownPeerObj);

  // set up own video feed
  const myVideo = getVideo();

  //set up peer event listeners
  const peers = generatePeers(ownPeerObj, myVideo);
  // console.log('peers:', peers);

  // set up socket listeners

  // listen for new participants
  // place call when received

  // listen for participant list from server
  // place calls when received -- ???
  // or do we want to keep it how it is: existing users call new ones?
}

export const testEnterRoom = () => {
  let roomId = uuidv4();

  enterRoom(roomId);
};
