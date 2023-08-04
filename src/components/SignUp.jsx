import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;
import x from '/svg/x.svg';
import { BORDERERR } from '../lib/utils';
import { ERRORSTYLE } from '../lib/utils';

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

  const {
    register,
    handleSubmit,
    resetField,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ZSignUp),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
  });

  const submitFormData = async (data) => {
    if (!data) return;

    try {
      const { data: dataPayload } = await axios.post(
        `${VITE_API_URL}/api/user`,
        data,
      );

      if (dataPayload.token) localStorage.setItem('token', dataPayload.token);

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
        resetField('confirmPassword', { keepDirty: false, keepError: true });
      }
    }
  }, [errors.username, errors.confirmPassword]);

  return (
    <div className='sign-up-wrapper  justify-center w-screen h-screen flex font-press text-[#151521]'>
      <div className='flex flex-col w-[50vw] h-[95dvh] mx-auto   self-center bg-[#c0c0c0] border-4'>
        <div className='header-top-rim h-[7dvh] border-[2.8px] border-[#151521] bg-gradient-to-r from-blue-400 to-sky-400 flex flex-col '>
          <img
          onClick={() => {setIsSignUpHidden(true); setIsFormHidden(true)}}
            src={x} 
            alt='x-icon'
            className='h-[90%] border-2 border-[#151521] self-end m-[.5%] outline-white outline-double'
          />
        </div>
        <h1 className=' text-[3vw] flex justify-center uppercase pt-[9%] pb-[1%]'>
          sign up
        </h1>

        <form
          action='submit'
          className='flex flex-col items-center gap-4  w-full'
          onSubmit={handleSubmit(submitFormData)}
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
              type='text'
              id='username'
              className={`${
                errors.username ? BORDERERR : ''
              } bg-slate-200/75 border-2 border-[#151521] text-[1.3vw] px-[4%] py-[5%] w-[30vw]  shadow-inner   outline-double outline-white`}
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
              type='password'
              id='password'
              className={`${
                errors.password ? BORDERERR : ''
              } bg-slate-200/75 border-2 border-[#151521] text-[1.3vw] px-[4%] py-[5%]  shadow-inner  w-[30vw] outline-double outline-white`}
              {...register('password')}
            />
            <p className={ERRORSTYLE}>{errors.password?.message || ''}</p>
          </div>

          <div className='flex flex-col'>
            <label
              htmlFor='confirm-password'
              className={`${
                errors.confirmPassword ? 'text-red-800' : ''
              } font-vt text-[2vw]`}
            >
              confirm password
            </label>
            <input
              type='password'
              id='confirm-password'
              className={`${
                errors.confirmPassword ? BORDERERR : ''
              } bg-slate-200/75 border-2 border-[#151521] text-[1.3vw] px-[4%] py-[5%]  shadow-inner  w-[30vw] outline-double outline-white`}
              {...register('confirmPassword')}
            />
            <p className={ERRORSTYLE}>
              {errors.confirmPassword?.message || ''}
            </p>
          </div>

          <div className='flex flex-col pt-[3%]'>
            <button
              type='submit'
              className=' bg-blue-500 self-center font-vt px-[4%] tracking-wide  text-[3.2vh] border-2  w-[30vw] p-[1.3%] outline-dashed outline-[#151521] hover:bg-blue-600 hover:scale-[1.01] transition-all duration-100'
            >
              sign up
            </button>
            <p className='sign-in-redirect font-vt text-[1.8vw] pt-[5%] text-center'>
              {' '}
              already have an account? sign in{' '}
              <span
                className='underline-offset-2 underline text-indigo-600 hover:text-indigo-800 text-[1.8vw] cursor-pointer'
                onClick={() => {
                  setIsSignUpHidden(true)
                  setIsFormHidden(false);
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
