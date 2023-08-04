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

export const BORDERERR =
  'border-dashed border-red-800 ouline-double outline-rose-800 outline-4 outline-red-800 text-red-800 shadow-[inset_1px_1px_4px_5px_rgba(119,35,35,0.1)]';

export const ERRORSTYLE = 'text-[.8vw] text-red-800 flex pt-[2%] self-center';
