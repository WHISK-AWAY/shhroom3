import { useEffect, useContext } from 'react';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import x from '/svg/x.svg';
import { useForm } from 'react-hook-form';
import { ERRORSTYLE } from '../lib/utils';
import { BORDERERR } from '../lib/utils.js';

import { GlobalContext, LandingContext } from '../lib/context';

const API_URL = import.meta.env.VITE_API_URL;

const ZSignIn = z.object({
  username: z.string(),
  password: z.string(),
});

export default function Signin({ setIsFormHidden, setIsSignUpHidden }) {
  const landingContext = useContext(LandingContext);
  const globalContext = useContext(GlobalContext);

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
      // attempt authentication (will throw error on failure)
      const res = await axios.post(API_URL + '/api/auth', {
        username: data.username,
        password: data.password,
      });

      // store JWT response
      if (res.data.token) localStorage.setItem('token', res.data.token);

      // update app state for signed-in user
      globalContext.setContext((prev) => ({
        ...prev,
        isSignedIn: true,
        // username: data.username,
      }));

      // make sure sign-in hint is no longer visible
      landingContext.setContext((prev) => ({
        ...prev,
        signInHintIsVisible: false,
      }));

      // zoom away from screen & then zoom to new meeting poster
      if (landingContext && landingContext.releaseZoom) {
        landingContext.releaseZoom();
        setTimeout(() => landingContext.zoomToObject('newMeeting'), 750);
      }

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
    <div className='sign-in-page w-[600px] h-[650px] flex font-press  text-[#151521]'>
      <div className='signin-form flex flex-col w-full  h-full mx-auto   self-center bg-[#c0c0c0] border-4 '>
        <div className='header-top-rim h-[7%] border-[2.8px] border-[#151521]   bg-gradient-to-r from-blue-400 to-sky-400 flex flex-col '>
          <img
            onClick={() =>
              setIsFormHidden === undefined ? undefined : setIsFormHidden(true)
            }
            src={x}
            alt='x-icon'
            className='h-[90%] border-2 border-[#151521] self-end m-[.5%] outline-white outline-double'
          />
        </div>
        <h1 className=' text-[35px] flex justify-center uppercase pt-[9%] pb-[1%]'>
          sign in
        </h1>
        <form
          onSubmit={handleSubmit(submitData)}
          className='flex flex-col gap-4'
        >
          <div className='flex flex-col w-full h-full items-center '>
            <label
              htmlFor='username'
              className={`${
                errors.username ? 'text-red-800' : ''
              } font-vt text-[30px] self-start pl-[90px]`}
            >
              username
            </label>

            <input
              className={`${
                errors.username ? BORDERERR : ''
              } bg-slate-200/75 border-2 border-[#151521] text-[20px] px-[4%] py-[3%]  shadow-[inset_1px_1px_4px_4px_rgba(21,21,33,0.2)]  w-[70%] outline-double outline-white `}
              type='text'
              name='username'
              id='username'
              autoComplete='off'
              {...register('username')}
            />

            <p className={ERRORSTYLE}>{errors.username?.message || ''}</p>
          </div>

          <div className='flex flex-col w-full items-center'>
            <label
              htmlFor='password'
              className={`${
                errors.password ? 'text-red-800' : ''
              } font-vt text-[30px] self-start pl-[90px]`}
            >
              password
            </label>
            <input
              className={`${
                errors.password ? BORDERERR : ''
              } border-2 border-[#151521] bg-slate-200/75 px-[4%] py-[3%] w-[70%] text-[20px] shadow-[inset_1px_1px_4px_4px_rgba(21,21,33,0.2)] outline-double outline-white`}
              type='password'
              name='password'
              id='password'
              autoComplete='off'
              {...register('password')}
            />
            <p className={ERRORSTYLE}>{errors.password?.message || ''}</p>
          </div>
          <div className='flex flex-col pt-[5%] '>
            <button className=' bg-blue-500 self-center font-vt px-[4%] tracking-wide  text-[30px] border-2  w-[70%] p-[1.3%] outline-dashed outline-[#151521] hover:bg-blue-600 hover:scale-[1.01] transition-all duration-100'>
              sign in
            </button>
            <p className='sign-up-redirect pt-[4%] font-vt text-[25px] text-center'>
              don't have an account? make one {''}
              <span
                className='underline-offset-2 underline text-indigo-600 hover:text-indigo-800 text-[25px] cursor-pointer'
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
