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

async function checkToken() {
  const token = localStorage.getItem('token');

  if (!token) return { error: 'Error: no token' };

  try {
    const { data } = await axios.get(
      import.meta.env.VITE_API_URL + '/api/auth',
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );

    console.log('data:', data);

    return data;
  } catch (err) {
    console.log('error verifying token:', err);
    localStorage.removeItem('token');
    return { error: 'Error: could not verify token' };
  }
}

export default function useVerifyToken() {
  const [verifyTokenStatus, setVerifyTokenStatus] = useState(initialState);
  const globalContext = useContext(GlobalContext);

  useEffect(() => {
    console.log('globalContext:', globalContext);

    if (!globalContext.setContext) return;

    if (globalContext.isSignedIn) {
      if (globalContext.userId && globalContext.username) {
        setVerifyTokenStatus((prev) => ({
          ...prev,
          loading: false,
          userData: {
            id: globalContext.userId,
            username: globalContext.username,
          },
        }));
      } else {
        console.log('signed in, but no username/id');
        checkToken()
          .then(handleTokenResponse)
          .catch((err) => {
            console.log('an error happened...', err);
          });
      }
    } else {
      console.log('not signed in');
      checkToken()
        .then(handleTokenResponse)
        .catch((err) => {
          console.log('an error happened...', err);
        });
    }
  }, [globalContext]);

  return { ...verifyTokenStatus };

  function handleTokenResponse(userData) {
    console.log('handling token response:', userData);
    if (userData.error === 'Error: no token') {
      // wait for login
    } else if (userData.error) {
      console.log('userdata error:', userData.error);
      localStorage.removeItem('token');
      setVerifyTokenStatus({
        ...initialState,
        error: userData.error,
        loading: false,
      });
    } else {
      setVerifyTokenStatus((prev) => ({
        ...prev,
        loading: false,
        userData,
      }));

      globalContext.setContext((prev) => ({
        ...prev,
        isSignedIn: true,
        username: userData.username,
        userId: userData.id,
      }));
    }
  }
}

// export default function useVerifyToken() {
//   const globalContext = useContext(GlobalContext);

//   const [status, setStatus] = useState(initialState);

//   useEffect(() => {
//     if (!globalContext.setContext || globalContext.isSignedIn) {
//       console.log('returning');
//       return;
//     }
//     // console.log('checking token');

//     // re-set status each time we pass through this loop in order to indicate loading / stale info
//     setStatus(initialState);

//     const token = window.localStorage.getItem('token');

//     if (!token) {
//       // console.log('no token to check');

//       // setStatus({
//       //   ...initialState,
//       //   loading: false,
//       //   error: 'MISSING_TOKEN',
//       // });

//       if (globalContext.isSignedIn) {
//         globalContext.setContext((prev) => ({
//           ...prev,
//           isSignedIn: false,
//         }));
//       }

//       return;
//     }

//     // Send token to backend for validation
//     // Backend will return username/ID
//     checkToken();
//   }, [globalContext.isSignedIn, globalContext.setContext?.toString()]);

//   useEffect(() => {
//     if (!globalContext.isSignedIn) return;

//     if (globalContext.isSignedIn && !globalContext.userId) {
//       console.log('signed in, but no user ID noted');
//       checkToken();
//     }
//   }, [globalContext.isSignedIn, globalContext.userId]);

//   function checkToken() {
//     const token = localStorage.getItem('token');

//     axios
//       .get(import.meta.env.VITE_API_URL + '/api/auth', {
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       })
//       .then(({ data }) => {
//         // Success: update status & global state
//         // console.log('token check successful');

//         setStatus({
//           userData: data,
//           error: undefined,
//           loading: false,
//         });

//         if (
//           !globalContext.isSignedIn ||
//           !globalContext.userId ||
//           !globalContext.username
//         ) {
//           globalContext.setContext((prev) => ({
//             ...prev,
//             isSignedIn: true,
//             userId: data.id,
//             username: data.username,
//           }));
//         }
//       })
//       .catch((err) => {
//         // Failure: update status & global state
//         console.error(err);

//         // If there was a token, then it's no good - get rid of it
//         window.localStorage.removeItem('token');

//         setStatus({
//           userData: undefined,
//           error: 'BAD_CREDENTIALS',
//           loading: false,
//         });

//         if (globalContext.isSignedIn) {
//           globalContext.setContext((prev) => ({
//             ...prev,
//             isSignedIn: false,
//           }));
//         }
//       });
//   }

//   return { ...status };
// }
