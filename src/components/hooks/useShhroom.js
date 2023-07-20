import { useState, useEffect } from 'react';

import useVerifyToken from './useVerifyToken';
import usePeerConnection from './usePeerConnection';
import { handleKeys } from '../e2e';

const initialState = {
  loading: true,
  error: undefined,
  userInfo: {
    id: '',
    username: '',
    publicKey: '',
    createdAt: '',
    updatedAt: '',
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
  const [shhroomUser, setShhroomUser] = useState(initialState);
  const auth = useVerifyToken();
  const peerConn = usePeerConnection();

  useEffect(() => {
    if (auth.loading) return;
    if (auth.error) {
      console.log('Error pulling user info:', auth.error);
      setShhroomUser({ ...initialState, loading: false, error: auth.error });
    } else
      setShhroomUser((prev) => ({ ...prev, userInfo: { ...auth.userData } }));
  }, [auth.loading]);

  useEffect(() => {
    if (peerConn.loading) return;
    if (peerConn.error) {
      console.log('Error establishing peer connection:', peerConn.error);
      setShhroomUser({
        ...initialState,
        loading: false,
        error: peerConn.error,
      });
    } else {
      setShhroomUser((prev) => ({
        ...prev,
        peerInfo: {
          peer: peerConn.peer,
          peerId: peerConn.peerId,
        },
      }));
    }
  }, [peerConn.loading]);

  useEffect(() => {
    if (auth.loading || peerConn.loading) return;
    if (auth.error || peerConn.error) return;

    setShhroomUser((prev) => ({
      ...prev,
      loading: false,
      encryptionInfo: handleKeys(auth.userData?.id),
    }));
  }, [auth.loading, peerConn.loading]);

  return { ...shhroomUser };
}
