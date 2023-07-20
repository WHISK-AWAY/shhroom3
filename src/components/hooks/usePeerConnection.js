import Peer from 'peerjs';
import { useState, useEffect } from 'react';

const initialState = {
  peerId: '',
  peer: undefined,
  loading: true,
  error: undefined,
};

export default function usePeerConnection() {
  const [peerConnection, setPeerConnection] = useState(initialState);

  useEffect(() => {
    setPeerConnection({ ...initialState });

    try {
      const peer = new Peer(undefined, {
        secure: true,
      });

      peer.on('open', (peerId) => {
        setPeerConnection((prev) => ({
          ...prev,
          loading: false,
          peerId: peerId,
          peer,
        }));
      });
    } catch (err) {
      console.log('Error establishing peer connection:', err);
      setPeerConnection({
        ...initialState,
        loading: false,
        error: 'Failed to establish peer connection.',
      });
    }
  }, []);

  return { ...peerConnection };
}
