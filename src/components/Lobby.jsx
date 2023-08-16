import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useVerifyToken from './hooks/useVerifyToken';

export default function Lobby({ socket }) {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  const tokenStatus = useVerifyToken();

  useEffect(() => {
    if (tokenStatus.loading) return;

    if (tokenStatus.error) {
      console.log(tokenStatus.error);
      navigate('/signin');
    } else if (tokenStatus.userData.id) {
      socket.emit('new-lobby');
    }
  }, [tokenStatus.loading]);

  socket.on('room-list', (roomList) => {
    setRooms(roomList);
  });

  // document.querySelector('#loader').classList.add('invisible');

  return (
    <div className='signin-form flex flex-col justify-center gap-7 shadow-lg shadow-gray-800/60  items-center min-w-min max-w-sm mx-auto mt-40 bg-gradient-to-r from-pink-500/50 via-purple-500/60 to-indigo-500/60 rounded text-slate-200 h-96'>
      <Link
        to='/room'
        className='inline-block bg-gradient-to-t from-violet-700 to-slate-300  hover:shadow-dark-pink4/40 py-3 px-5 rounded-xl shadow-md shadow-gray-800/60 transition duration-500 hover:scale-105 font-medium tracking-wide'
      >
        New Meeting
      </Link>
      {rooms.length > 0 &&
        rooms.map((room, idx) => (
          <Link
            key={room}
            to={`/room/${room}`}
            className='inline-block bg-gradient-to-t from-violet-700 to-slate-300  hover:shadow-dark-pink4/40 py-3 px-5 rounded-xl shadow-md shadow-gray-800/60 transition duration-500 hover:scale-105 font-medium tracking-wide'
          >
            Existing room {idx + 1}
          </Link>
        ))}
    </div>
  );
}
