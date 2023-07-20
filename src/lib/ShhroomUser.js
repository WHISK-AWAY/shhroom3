import Peer from 'peerjs';

class ShhroomUser {
  #createPeerInstance() {
    const peer = new Peer(undefined, { secure: true });

    return peer;
  }

  constructor(userId) {
    this.userId = userId;
    this.peerInstance = this.#createPeerInstance();
  }
}
