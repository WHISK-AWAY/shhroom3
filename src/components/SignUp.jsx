import { useForm } from 'react-hook-form';
import { useEffect, useContext } from 'react';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;
import x from '/svg/x.svg';
import { BORDERERR } from '../lib/utils';
import { ERRORSTYLE } from '../lib/utils';

import { GlobalContext, LandingContext } from '../lib/context';

const ZSignUp = z
  .object({
    username: z
      .string()
      .min(4, { message: 'must contain minumum of 4 characters' })
      .max(15, { message: 'must contain maximum of 15 characters' }),
    password: z
      .string()
      .min(8, { message: 'must contain minimum of 8 characters' })
      .max(20, { message: 'must contain maximum of 20 characters' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'must contain minimum of 8 characters' })
      .max(20, { message: 'must contain maximum of 20 characters' }),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'password fields do not match',
        path: ['confirmPassword'],
      });
    }
  });

export default function SignUp({ setIsFormHidden, setIsSignUpHidden }) {
  const landingContext = useContext(LandingContext);
  const globalContext = useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    resetField,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ZSignUp),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    reValidateMode: 'onSubmit',
  });

  const submitFormData = async (data) => {
    if (!data) return;

    try {
      const { data: dataPayload } = await axios.post(
        `${VITE_API_URL}/api/user`,
        data,
      );

      if (dataPayload.token) localStorage.setItem('token', dataPayload.token);

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

      //reset all form fields
      reset();
      //close the form both signup and signin forms
      setIsSignUpHidden(true);
      setIsFormHidden(true);

      return dataPayload;
    } catch (err) {
      if (err.response.status === 409) {
        resetField('username', { keepDirty: false, keepError: true });
        setError('username', {
          type: 'custom',
          message: 'this username already exists',
        });
      }
      if (err instanceof AxiosError) {
        throw new Error(err);
      } else {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    for (let key in errors) {
      if (key === 'confirmPassword') {
        resetField('password', { keepDirty: false });
        resetField('confirmPassword', { keepDirty: true, keepError: true });
      }
    }
  }, [errors.username, errors.confirmPassword]);

  const isUsernameAvailable = async (username) => {
    const { data } = await axios.get(
      `${VITE_API_URL}/api/user/check?username=${username}`,
    );

    if (data.usernameExists) {
      resetField('username', { keepDirty: false, keepError: true });
      setError('username', {
        type: 'custom',
        message: 'this username already exists',
      });
      return false;
    }
    clearErrors('username');
    return true;
  };

  const checkPasswordLength = (password) => {
    const validPasswordShort = password.length >= 8;
    const validPasswordLong = password.length <= 20;

    if (!validPasswordShort) {
      setError('password', {
        type: 'custom',
        message: 'must be longer than 8 characters',
      });
    } else if (!validPasswordLong) {
      setError('password', {
        type: 'custom',
        message: 'must be 20 characters at most',
      });
    } else {
      clearErrors('password')
    }
  };

  return (
    <div className='sign-up-wrapper w-[600px] h-[780px] justify-center  flex font-press text-[#151521]'>
      <div className='flex flex-col  mx-auto  w-full h-full self-center bg-[#c0c0c0] border-4'>
        <div className='header-top-rim h-[7%] border-[2.8px] border-[#151521] bg-gradient-to-r from-blue-400 to-sky-400 flex flex-col '>
          <img
            onClick={() => {
              if (setIsSignUpHidden) {
                setIsSignUpHidden(true);
              }
              setIsFormHidden(true);
            }}
            src={x}
            alt='x-icon'
            className='h-[90%] border-2 border-[#151521] self-end m-[.5%] outline-white outline-double'
          />
        </div>
        <h1 className=' text-[35px] flex justify-center uppercase pt-[9%] pb-[1%]'>
          sign up
        </h1>

        <form
          action='submit'
          className='flex flex-col gap-4  '
          onSubmit={handleSubmit(submitFormData)}
        >
          <div className='flex flex-col w-full h-full items-center'>
            <label
              htmlFor='username'
              className={`${
                errors.username ? 'text-red-800' : ''
              } font-vt text-[30px] self-start pl-[90px]`}
            >
              username
            </label>
            <input
              type='text'
              id='username'
              className={`${
                errors.username ? BORDERERR : ''
              } bg-slate-200/75 border-2 border-[#151521] text-[20px] px-[4%] py-[3%] w-[70%]  shadow-inner   outline-double outline-white`}
              {...register('username')}
              onBlur={(e) => isUsernameAvailable(e.target.value)}
            />
            <p className={ERRORSTYLE}>{errors.username?.message || ''}</p>
          </div>

          <div className='flex flex-col w-full h-full items-center'>
            <label
              htmlFor='password'
              className={`${
                errors.password ? 'text-red-800' : ''
              } font-vt text-[30px] self-start pl-[90px]`}
            >
              password
            </label>
            <input
              type='password'
              id='password'
              className={`${
                errors.password ? BORDERERR : ''
              } bg-slate-200/75 border-2 border-[#151521] text-[20px] px-[4%] py-[3%]  shadow-inner  w-[70%] outline-double outline-white`}
              {...register('password')}
              onBlur={(e) => checkPasswordLength(e.target.value)}
            />
            <p className={ERRORSTYLE}>{errors.password?.message || ''}</p>
          </div>

          <div className='flex flex-col w-full items-center'>
            <label
              htmlFor='confirm-password'
              className={`${
                errors.confirmPassword ? 'text-red-800' : ''
              } font-vt text-[30px] self-start pl-[90px]`}
            >
              confirm password
            </label>
            <input
              type='password'
              id='confirm-password'
              className={`${
                errors.confirmPassword ? BORDERERR : ''
              } bg-slate-200/75 border-2 border-[#151521] text-[20px] px-[4%] py-[3%]  shadow-inner  w-[70%] outline-double outline-white`}
              {...register('confirmPassword')}
            />
            <p className={ERRORSTYLE}>
              {errors.confirmPassword?.message || ''}
            </p>
          </div>

          <div className='flex flex-col pt-[3%]'>
            <button
              type='submit'
              className=' bg-blue-500 self-center font-vt px-[4%] tracking-wide  text-[30px] border-2  w-[70%] p-[1.3%] outline-dashed outline-[#151521] hover:bg-blue-600 hover:scale-[1.01] transition-all duration-100'
            >
              sign up
            </button>
            <p className='sign-in-redirect font-vt text-[25px] pt-[4%] text-center'>
              {' '}
              already have an account? sign in{' '}
              <span
                className='underline-offset-2 underline text-indigo-600 hover:text-indigo-800 text-[25px] cursor-pointer'
                onClick={() => {
                  setIsSignUpHidden(true);
                  if (setIsFormHidden) setIsFormHidden(false);
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
