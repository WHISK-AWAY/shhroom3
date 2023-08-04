import React, { useState, useEffect, useMemo, useContext } from 'react';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { Vector3 } from 'three';
import { Link } from 'react-router-dom';
import x from '/svg/x.svg';
import { useForm } from 'react-hook-form';
import { ERRORSTYLE } from '../lib/utils';
import { BORDERERR } from '../lib/utils.js';
import { ZoomContext } from './Landing/Landing';
import { gsap } from 'gsap';

const API_URL = import.meta.env.VITE_API_URL;

const ZSignIn = z.object({
  username: z.string(),
  password: z.string(),
});

export default function Signin({
  setIsFormHidden,
  isFormHidden,
  setIsSignUpHidden,
  camera,
  controls,
}) {
  const monitorZoomPosition = useMemo(
    () => new Vector3(3.54909, 3.20587, 2.15376),
  );

  const [signinSuccessful, setSigninSuccessful] = useState(false);
  const zoom = useContext(ZoomContext);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (signinSuccessful) {
        const { setZoom, camera, controls } = zoom;
        setZoom((prev) => ({
          ...prev,
          zoomMode: true,
          targetPosition: new Vector3(7.71108, 3.65457, -2.58681),
          targetLabel: 'newMeeting',
          controlsEnabled: false,
        }));

        const tl = gsap.timeline({});
        tl.to(camera.position, {
          duration: 1,
          x: 7.7084461220869285,
          y: 3.760683379409692,
          z: 1.4263831780533351,
          onUpdate: () => controls.update(),
        });
        tl.to(controls.target, {
          x: 7.71108,
          y: 3.65457,
          z: -2.58681,
          duration: 1,
          onUpdate: () => controls.update(),
        });
      }
    });

    return () => {
      ctx.revert();
    };
  }, [signinSuccessful]);

  const {
    register,
    handleSubmit,
    resetField,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ZSignIn),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const submitData = async (data, e) => {
    e?.preventDefault();
    if (!data) return;

    try {
      const res = await axios.post(API_URL + '/api/auth', {
        username: data.username,
        password: data.password,
      });

      if (res.data.token) localStorage.setItem('token', res.data.token);

      zoom.setZoom((prev) => ({
        ...prev,
        targetPosition: new Vector3(7.71108, 3.65457, -2.58681),
        targetLabel: 'newMeeting',
        controlsEnabled: true,
      }));

      setSigninSuccessful(true);

      return res;
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 404) {
          resetField('password', { keepDirty: false, keepError: true });
          setError('username', {
            type: 'custom',
            message: 'username does not exist',
          });
        }

        if (err.response?.status === 401) {
          resetField('password', { keepDirty: false, keepError: true });
          setError('password', {
            type: 'custom',
            message: 'password is incorrect',
          });
        }
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div className='sign-in-page w-screen h-screen flex font-press  text-[#151521]'>
      <div className='signin-form flex flex-col w-[50vw] h-[80dvh] mx-auto   self-center bg-[#c0c0c0] border-4 '>
        <div className='header-top-rim h-[7dvh] border-[2.8px] border-black  bg-gradient-to-r from-blue-400 to-sky-400 flex flex-col '>
          <img
            onClick={() => setIsFormHidden(true)}
            src={x}
            alt='x-icon'
            className='h-[90%] border-2 border-[#151521] self-end m-[.5%] outline-white outline-double'
          />
        </div>
        <h1 className=' text-[3vw] flex justify-center uppercase pt-[9%] pb-[1%]'>
          sign in
        </h1>
        <form
          onSubmit={handleSubmit(submitData)}
          className='flex flex-col items-center gap-4'
        >
          <div className='flex flex-col'>
            <label
              htmlFor='username'
              className={`${
                errors.username ? 'text-red-800' : ''
              } font-vt text-[2vw]`}
            >
              username
            </label>

            <input
              className={`${
                errors.username ? BORDERERR : ''
              } bg-slate-200/75 border-2 border-[#151521] text-[1.3vw] px-[4%] py-[5%]  shadow-[inset_1px_1px_4px_4px_rgba(21,21,33,0.2)]  w-[30vw] outline-double outline-white `}
              type='text'
              name='username'
              id='username'
              autoComplete='off'
              {...register('username')}
            />

            <p className={ERRORSTYLE}>{errors.username?.message || ''}</p>
          </div>

          <div className='flex flex-col'>
            <label
              htmlFor='password'
              className={`${
                errors.password ? 'text-red-800' : ''
              } font-vt text-[2vw]`}
            >
              password
            </label>
            <input
              className={`${
                errors.password ? BORDERERR : ''
              } border-2 border-[#151521] bg-slate-200/75 px-[4%] py-[5%] w-[30vw] text-[1.3vw] shadow-[inset_1px_1px_4px_4px_rgba(21,21,33,0.2)] outline-double outline-white`}
              type='password'
              name='password'
              id='password'
              autoComplete='off'
              {...register('password')}
            />
            <p className={ERRORSTYLE}>{errors.password?.message || ''}</p>
          </div>
          <div className='flex flex-col pt-[5%] '>
            <button className=' bg-blue-500 self-center font-vt px-[4%] tracking-wide  text-[3.2vh] border-2  w-[30vw] p-[1.3%] outline-dashed outline-[#151521] hover:bg-blue-600 hover:scale-[1.01] transition-all duration-100'>
              sign in
            </button>
            <p className='sign-up-redirect pt-[5%] font-vt text-[1.8vw] text-center'>
              don't have an account? make one {''}
              <span
                className='underline-offset-2 underline text-indigo-600 hover:text-indigo-800 text-[1.8vw] cursor-pointer'
                onClick={() => {
                  setIsSignUpHidden(false);
                }}
              >
                here
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
