import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;

const ZSignUp = z
  .object({
    username: z
      .string()
      .min(2, { message: 'must contain minumum of 2 characters' })
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

export default function SignUp() {
  const navigate = useNavigate();
  const [isFormSubmitted, setFormSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    resetField,
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
      navigate('/lobby');

      return dataPayload;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err);
      } else {
        console.error(err);
      }
  
    }
  };



useEffect(() => {
  for (let key in errors) {


    if(key === 'confirmPassword') {
    resetField('password', {keepDirty: false});
    resetField('confirmPassword', {keepDirty: false, keepError: true});
  
    }
  }
}, [errors.username, errors.confirmPassword])


  return (
    <div className='sign-up-wrapper flex justify-center pt-20'>
      <form
        action='submit'
        className='flex flex-col items-center'
        onSubmit={handleSubmit(submitFormData)}
      >
        <label htmlFor='username'>username</label>
        <input
          type='text'
          id='username'
          className='text-black'
          {...register('username')}
        />
        <p>{errors.username?.message || ''}</p>

        <label htmlFor='password'>password</label>
        <input
          type='password'
          id='password'
          className='text-black'
          {...register('password')}
        />
        <p>{errors.password?.message || ''}</p>

        <label htmlFor='confirm-password'>confirm password</label>
        <input
          type='password'
          id='confirm-password'
          className='text-black'
          {...register('confirmPassword')}
        />
        {errors.confirmPassword?.message || ''}

        <button type='submit'>sign up</button>
      </form>
    </div>
  );
}
