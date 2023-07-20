import axios from 'axios';

export default async function verifyToken() {
  const token = window.localStorage.getItem('token');
  if (!token) return null;

  const { data } = await axios.get(import.meta.env.VITE_API_URL + '/api/auth', {
    headers: { authorization: 'Bearer ' + token },
  });

  if (!data) {
    window.localStorage.removeItem('token');
    return null;
  }

  return data;
}
