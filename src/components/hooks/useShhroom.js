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
  const { isSignedIn } = globalContext;
  const [shhroomUser, setShhroomUser] = useState(initialState);
  const auth = useVerifyToken();
  const peerConn = usePeerConnection();

  useEffect(() => {
    if (!auth.loading && !isSignedIn) {
      console.log('useShhroom is awaiting user sign in...');
      setShhroomUser((prev) => ({ ...prev, loading: false }));
    }
  }, [isSignedIn]);

  useEffect(() => {
    if (auth.loading || !isSignedIn) {
      return;
    }
    if (auth.error) {
      console.log('Error pulling user info:', auth.error);
      setShhroomUser({
        ...initialState,
        loading: false,
        error: auth.error,
      });
    } else {
      setShhroomUser((prev) => ({
        ...prev,
        userInfo: { ...auth.userData },
      }));
    }
  }, [auth.loading, globalContext.isSignedIn]);

  useEffect(() => {
    if (peerConn.loading || !isSignedIn) return;
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
  }, [peerConn.loading, isSignedIn]);

  useEffect(() => {
    if (!isSignedIn) return;
    if (auth.loading || peerConn.loading) return;
    if (auth.error || peerConn.error) return;

    setShhroomUser((prev) => ({
      ...prev,
      loading: false,
      encryptionInfo: handleKeys(),
    }));
  }, [auth.loading, peerConn.loading, isSignedIn]);

  useEffect(() => {
    // debug keystroke handler
    function keyPressed(e) {
      if (e.keyCode === 32) {
        // spacebar: keycode 32
        console.log('Global context:', globalContext);
        console.log('thisShhroomer:', shhroomUser);
      } else if (e.keyCode === 85 && e.shiftKey) {
        // shift + u: keycode 85
        console.log('removing token');
        window.localStorage.removeItem('token');
      }
    }

    document.addEventListener('keypress', keyPressed);

    return () => document.removeEventListener('keypress', keyPressed);
  }, [globalContext]);

  return { ...shhroomUser };
}
