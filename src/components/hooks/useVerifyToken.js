import { useEffect, useState } from 'react';
import axios from 'axios';

const initialState = {
  loading: true,
  error: undefined,
  userData: {
    id: '',
    username: '',
    publicKey: '',
    createdAt: '',
    updatedAt: '',
  },
};

export default function useVerifyToken() {
  const [status, setStatus] = useState(initialState);

  useEffect(() => {
    console.log('checking token');
    const token = window.localStorage.getItem('token');
    if (!token) {
      setStatus({
        ...initialState,
        loading: false,
        error: 'No token found.',
      });
    } else {
      axios
        .get(import.meta.env.VITE_API_URL + '/api/auth', {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => {
          setStatus({
            userData: data,
            error: undefined,
            loading: false,
          });
        })
        .catch((err) => {
          console.error(err);
          window.localStorage.removeItem('token');
          setStatus({
            userData: undefined,
            error:
              'Authentication failed. Check your credentials and try again.',
            loading: false,
          });
        });
    }
  }, []);

  return { ...status };
}
