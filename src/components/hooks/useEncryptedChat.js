import { useState, useEffect } from 'react';
import { handleKeys } from '../e2e';

const initialState = {
  encrypt: undefined,
  decrypt: undefined,
  encodedPublicKey: undefined,
  loading: true,
  error: undefined,
};

export default function useEncryptedChat(userId) {
  const [encryptionInfo, setEncryptionInfo] = useState(initialState);

  useEffect(() => {
    if (!userId) {
      // console.log('encrypt: no userId found');
      setEncryptionInfo({
        ...initialState,
        loading: false,
        error: 'No user ID provided.',
      });
    } else {
      const { encrypt, decrypt, encodedPublicKey } = handleKeys();
      // console.log('setting encryption info');
      setEncryptionInfo({
        ...initialState,
        loading: false,
        encrypt,
        decrypt,
        encodedPublicKey,
      });
    }
  }, [userId]);

  return { ...encryptionInfo };
}
