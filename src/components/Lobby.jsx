import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import verifyToken from '../lib/utils';

export default function Lobby({ socket }) {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    verifyToken().then((user) => {
      if (!user?.id) navigate('/signin');
      else {
        socket.emit('new-lobby');
      }
    });
  }, []);

  socket.on('room-list', (roomList) => {
    setRooms(roomList);
  });

  return (
    <div className='signin-form flex flex-col justify-center gap-7 shadow-lg shadow-gray-800/60  items-center min-w-min max-w-sm mx-auto mt-40 bg-gradient-to-r from-pink-500/50 via-purple-500/60 to-indigo-500/60 rounded text-slate-200 h-96'>
      <Link
        to='/room'
        className='inline-block bg-gradient-to-t from-violet-700 to-slate-300  hover:shadow-dark-pink4/40 py-3 px-5 rounded-xl shadow-md shadow-gray-800/60 transition duration-500 hover:scale-105 font-medium tracking-wide'
      >
        New Meeting
      </Link>
      <br />
      {rooms.map((room, idx) => {
        return (
          <React.Fragment key={room}>
            <Link
              to={`/room/${room}`}
              className='inline-block bg-gradient-to-t from-violet-700 to-slate-300  hover:shadow-dark-pink4/40 py-3 px-5 rounded-xl shadow-md shadow-gray-800/60 transition duration-500 hover:scale-105 font-medium tracking-wide'
            >
              Join Existing Room {idx + 1}
            </Link>
            <br />
          </React.Fragment>
        );
      })}
    </div>
  );
}
