import { v4 as uuidv4 } from 'uuid';

export default function joinRoom(
  roomId,
  socketConnection,
  navigateFunction,
  shhroomInfo,
) {
  if (!roomId) {
    const newRoomId = uuidv4();
    socketConnection.emit('room-created', newRoomId);
    navigateFunction(`/room/${newRoomId}`);
  } else {
    socketConnection.emit('join-room', {
      peerId: shhroomInfo.peerInfo?.peerId,
      roomId,
      userId: shhroomInfo.userInfo?.id,
      publicKey: shhroomInfo.encryptionInfo?.encodedPublicKey,
      username: shhroomInfo.userInfo?.username,
    });
  }
}
