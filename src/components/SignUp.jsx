import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
const VITE_API_URL = import.meta.env.VITE_API_URL;


const ZSignUp = z
  .object({
    username: z
      .string()
      .min(2, { message: 'must be minumum of 2 characters' })
      .max(15, { message: 'must be maximum of 15 characters' }),
    password: z
      .string()
      .min(8, { message: 'must be minimum of 8 characters' })
      .max(20, { message: 'must be maximum of 20 characters' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'must be minimum of 8 characters' })
      .max(20, { message: 'must be maximum of 20 characters' }),
  })
  .strict()
  .refine(
    ({ password, confirmPassword }) => {
      return password === confirmPassword;
    },
    { message: 'password does not match', path: 'confirmPassword' },
  );

export default function SignUp() {

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(ZSignUp),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  });


  const submitFormData = async(data) => {
    if(!data) return ;

    try{
      const {data: dataPayload} = await axios.post(`${VITE_API_URL}/api/user`, data);


      if(dataPayload.token)
       localStorage.setItem('token', dataPayload.token);
      navigate('/lobby');


      console.log('dp', dataPayload)
      return dataPayload;


    }catch(err){
      if( err instanceof AxiosError) {
        throw new Error(err);
      } else {
        console.error(err);
      }
    }
  }

useEffect(() => {
  if(errors.confirmPassword) {
    reset(
      {
        password: '',
        confirmPassword: ''
      },
      {
        keepErrors: true,
      }
    )
  }
}, [errors.confirmPassword])

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
          placeholder={errors.username?.message || ''}
          className='text-black'
          {...register('username')}
        />

        <label htmlFor='password'>password</label>
        <input
          type='password'
          id='password'
          placeholder={errors.password?.message || ''}
          className='text-black'
          {...register('password')}
        />

        <label htmlFor='confirm-password'>confirm password</label>
        <input
          type='password'
          id='confirm-password'
          placeholder={errors.confirmPassword?.message || ''}
          className='text-black'
          {...register('confirmPassword')}
        />

        <button type='submit'>sign up</button>
      </form>
    </div>
  );
}
