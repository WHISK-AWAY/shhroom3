import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import x from '../../public/svg/x.svg';

const API_URL = import.meta.env.VITE_API_URL;

export default function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const navigate = useNavigate();

  // console.log('apiurl', API_URL);
  const onSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(API_URL + '/api/auth', {
      username,
      password,
    });
    window.localStorage.setItem('token', data.token);
    setPassword('');
    if (!data.token) {
      setIsInvalid(true);
    } else {
      setUsername('');
      setIsInvalid(false);
      navigate('/lobby');
    }
  };

  return (
    <div className='sign-in-page w-screen h-screen flex font-press bg-slate-500 text-[#151521]'>
      <div className='signin-form flex flex-col w-[50vw] h-[73dvh] mx-auto   self-center bg-[#c0c0c0] border-4 '>
        <div className='header-top-rim h-[7dvh] border-[2.8px] border-black  bg-gradient-to-r from-indigo-500 flex flex-col '>
          <img
            src={x}
            alt='x-icon'
            className='h-[90%] border-2 border-[#151521] self-end m-[.5%] outline-white outline-double'
          />
        </div>
        <h1 className=' text-[3vw] flex justify-center uppercase pt-[9%] pb-[1%]'>
          sign in
        </h1>
        <form
          onSubmit={onSubmit}
          className='flex flex-col items-center gap-4  w-full  '
        >
          <div className='flex flex-col'>
            <label htmlFor='username' className='font-vt text-[2vw]'>
              username
            </label>
            <input
              className=' bg-slate-200/75 border-2 border-[#151521] text-[1.3vw] px-[4%] py-[5%]  shadow-inner  w-[30vw] outline-double outline-white'
              type='text'
              name='username'
              id='username'
              value={username}
              placeholder={isInvalid ? 'must enter username' : null}
              autoComplete='off'
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className='flex flex-col'>
            <label htmlFor='password' className=' text-[2vw] font-vt'>
              password
            </label>
            <input
              className='border-2 border-[#151521] bg-slate-200/75 px-[4%] py-[5%] w-[30vw] text-[1.3vw] shadow-inner outline-double outline-white '
              type='password'
              name='password'
              id='password'
              value={password}
              placeholder={isInvalid ? 'must enter password' : null}
              autoComplete='off'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='flex flex-col pt-[5%] '>
            <button className=' bg-indigo-600 self-center font-vt px-[4%] tracking-wide  text-[3.2vh] border-2  w-[30vw] p-[1.3%] outline-dashed outline-[#151521]'>
              sign in
            </button>
            <p className='sign-up-redirect pt-[5%] font-vt text-[1.8vw]'>
              don't have an account? make one{' '}
              <Link
                to={'/signup'}
                className='underline-offset-2 underline text-indigo-600'
              >
                here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
