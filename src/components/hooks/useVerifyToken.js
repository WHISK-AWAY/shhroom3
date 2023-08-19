import { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import { GlobalContext } from '../../lib/context';

const initialState = {
  loading: true,
  error: undefined,
  userData: {
    id: '',
    username: '',
  },
};

export default function useVerifyToken() {
  const globalContext = useContext(GlobalContext);

  const [status, setStatus] = useState(initialState);

  useEffect(() => {
    if (!globalContext.setContext) return;
    console.log('checking token');

    // re-set status each time we pass through this loop in order to indicate loading / stale info
    setStatus(initialState);

    const token = window.localStorage.getItem('token');

    if (!token) {
      console.log('no token to check');

      // setStatus({
      //   ...initialState,
      //   loading: false,
      //   error: 'MISSING_TOKEN',
      // });

      if (globalContext.isSignedIn) {
        globalContext.setContext((prev) => ({
          ...prev,
          isSignedIn: false,
        }));
      }

      return;
    }

    // Send token to backend for validation
    // Backend will return username/ID
    axios
      .get(import.meta.env.VITE_API_URL + '/api/auth', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        // Success: update status & global state
        console.log('token check successful');

        setStatus({
          userData: data,
          error: undefined,
          loading: false,
        });

        if (
          !globalContext.isSignedIn ||
          !globalContext.userId ||
          !globalContext.username
        ) {
          globalContext.setContext((prev) => ({
            ...prev,
            isSignedIn: true,
            userId: data.id,
            username: data.username,
          }));
        }
      })
      .catch((err) => {
        // Failure: update status & global state
        console.error(err);

        // If there was a token, then it's no good - get rid of it
        window.localStorage.removeItem('token');

        setStatus({
          userData: undefined,
          error: 'BAD_CREDENTIALS',
          loading: false,
        });

        if (globalContext.isSignedIn) {
          globalContext.setContext((prev) => ({
            ...prev,
            isSignedIn: false,
          }));
        }
      });
  }, [globalContext.isSignedIn, globalContext.setContext?.toString()]);

  return { ...status };
}
