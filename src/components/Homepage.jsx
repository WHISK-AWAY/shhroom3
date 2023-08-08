import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useSpring } from 'framer-motion';

import { GlobalContext } from '../lib/context';

export default function Homepage() {
  const globalContext = useContext(GlobalContext);

  useEffect(() => {
    console.log('global context:', globalContext);

    // globalContext.setContext((prev) => ({ ...prev, isInMeeting: true }));
  }, [globalContext]);

  return (
    <div className='pt-44 pl-12 z-0'>
      <div className='blur-3xl absolute h-96 w-96 origin-center  ml-32 rounded-[50%]  animate-shapes  bg-gradient-to-r from-blue-800 via-purple-500 to-indigo-500 z-0 '></div>
      <div className='blur-3xl absolute h-72 w-72 origin-center ml-32 rounded-[50%]  animate-spin-slow bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500  z-0 '></div>
      <div className='blur-3xl absolute h-64 w-64 origin-center  ml-32 rounded-[50%] animation-delay-1500    animate-shapes bg-gradient-to-r from-cyan-500 to-blue-500 z-0 '></div>
      <div className='blur-3xl absolute h-52 w-52 origin-center  ml-32 rounded-[50%] animation-delay-2000  animate-spin-slow bg-gradient-to-r from-dark-pink9 to-blue-500 z-0 '></div>
      <div className='blur-3xl absolute h-48 w-48 origin-center  ml-28 rounded-[50%]    animate-shapes bg-gradient-to-r from-cyan-500 to-blue-900 -z-50 '></div>
      <div className='blur-3xl absolute h-48 w-48 origin-center  ml-32 rounded-[50%] animation-delay-1000   animate-spin-slow bg-gradient-to-r from-dark-pink9 to-fuchsia-500 z-0 '></div>

      <div className='flex flex-col leading-normal'>
        <motion.h1
          initial={{ x: -200, opacity: 0, duration: 7 }}
          animate={{ x: 120, opacity: 1, duration: 8 }}
          transition={{
            type: 'spring',
            damping: 10,
            mass: 0.1,
            stiffness: 20,
            delay: 0.4,
          }}
          className='text-7xl font-bold leading-3 font-glock  pt-12'
        >
          Discover
        </motion.h1>
        <motion.h1
          initial={{ y: 30, opacity: 0, duration: 2 }}
          animate={{ y: 30, opacity: 1, duration: 2.5 }}
          transition={{ ease: 'easeIn', duration: 2.5, delay: 1 }}
          className='text-8xl font-extralight font-mark  pb-10 ml-24 leading-normal'
        >
          ShhRoom
        </motion.h1>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, duration: 4, delay: 5 }}
        transition={{ ease: 'easeIn', duration: 4, delay: 2 }}
        className='z-50 bg-white'
      >
        <Link
          id='button'
          to='/signin'
          className='fixed inline-block bg-gradient-to-t from-violet-700 to-slate-300  hover:shadow-dark-pink4/40 py-3 px-5 rounded-xl shadow-xl shadow-gray-800/60 transition duration-500 hover:scale-110 font-medium tracking-wide ml-[210px] mt-3 z-50 '
        >
          Sign In
        </Link>
      </motion.div>
    </div>
  );
}
