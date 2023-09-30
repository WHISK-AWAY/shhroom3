import { useState, useEffect, useContext } from 'react';

import { GlobalContext } from '../../lib/context';

import useVerifyToken from './useVerifyToken';
import usePeerConnection from './usePeerConnection';
import { handleKeys } from '../../lib/e2e';

const initialState = {
  loading: true,
  error: undefined,
  userInfo: {
    id: '',
    username: '',
  },
  peerInfo: {
    peerId: '',
    peer: undefined,
  },
  encryptionInfo: {
    encrypt: undefined,
    decrypt: undefined,
    encodedPublicKey: '',
  },
};

export default function useShhroom() {
  const globalContext = useContext(GlobalContext);
  // const { isSignedIn } = globalContext;
  const [shhroomUser, setShhroomUser] = useState(initialState);
  const auth = useVerifyToken();
  const peerConn = usePeerConnection();

  const [authReceived, setAuthReceived] = useState(false);
  const [peerReceived, setPeerReceived] = useState(false);

  useEffect(() => {
    if (auth.loading) {
      console.log('waiting for auth');
    } else if (auth.error) {
      console.log('error in auth step');
      setShhroomUser((prev) => ({
        ...prev,
        loading: false,
        error: 'Error in auth step',
      }));
    } else {
      setAuthReceived(true);

      setShhroomUser((prev) => ({
        ...prev,
        userInfo: {
          id: globalContext.userId,
          username: globalContext.username,
        },
      }));
    }
  }, [auth.loading, auth.error, auth.userData?.id]);

  useEffect(() => {
    if (!authReceived || peerConn.loading) return;

    if (peerConn.error) {
      console.log('error setting up peer connection');
      setShhroomUser((prev) => ({
        ...prev,
        loading: false,
        error: 'Peer error',
      }));
    } else {
      console.log('setting peer info');
      setShhroomUser((prev) => ({
        ...prev,
        peerInfo: {
          peer: peerConn.peer,
          peerId: peerConn.peerId,
        },
      }));

      setPeerReceived(true);
    }
  }, [authReceived, peerConn.error, peerConn.loading, peerConn.peerId]);

  useEffect(() => {
    if (!peerReceived) return;

    console.log('ready for encryption info');
    setShhroomUser((prev) => ({
      ...prev,
      loading: false,
      encryptionInfo: handleKeys(),
    }));
  }, [peerReceived]);

  return { ...shhroomUser };
}
