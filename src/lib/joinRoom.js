import { v4 as uuidv4 } from 'uuid';

export default function joinRoom(
  roomId,
  socketConnection,
  navigateFunction,
  shhroomInfo,
) {
  if (!roomId) {
    // console.log('no room ID - generating & moving...');
    const newRoomId = uuidv4();
    socketConnection.emit('room-created', newRoomId);
    navigateFunction(`/room/${newRoomId}`);
  } else {
    // console.log(`Joining room ID ${roomId}`);

    socketConnection.emit('join-room', {
      peerId: shhroomInfo.peerInfo?.peerId,
      roomId,
      userId: shhroomInfo.userInfo?.id,
      publicKey: shhroomInfo.encryptionInfo?.encodedPublicKey,
      username: shhroomInfo.userInfo?.username,
    });
  }
}
