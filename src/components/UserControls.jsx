import test from '/svg/test.svg';
import arrow from '/svg/arrowDown.svg';
import mouseActiveLeft from '/svg/mouse_active_left.svg';
import mouseActiveRight from '/svg/mouse_active_right.svg';
import mouseActiveWheel from '/svg/mouse_active_wheel.svg';
import cursor from '/svg/cursor.svg';
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { Html } from '@react-three/drei';

export default function UserControls() {
  const mainContainerRef = useRef(null);
  const [isControlsClose, setIsControlsClose] = useState(true);
  const anim = useRef(null);
  const textRef = useRef(null);
  const arrowRef = useRef(null);
  const topControlsRef = useRef(null);
  const [initialRender, setInitialRender] = useState(true);

  // useEffect(() => {
  //   if(initialRender) {
  //     setTimeout(() => {
  //   setIsControlsClose(false);
  //     }, 8000)
  //   }
  // }, [initialRender]);

  // useEffect(() => {
  //   console.log('uc hi')
  // }, [])

  useEffect(() => {
    setTimeout(() => {
      setIsControlsClose(false);
    }, 3000);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!isControlsClose) {
        const tl = gsap.timeline();

        tl.to(topControlsRef.current, {
          width: '100%',
          duration: 0.2,
          ease: 'expo',
        })
          .to(arrowRef.current, {
            rotation: -90,
            duration: 0.3,
            opacity: 100,
          })
          .to(mainContainerRef.current, {
            height: '66%',
            ease: 'expo.inOut',
            duration: 0.6,
          })
          .to(textRef.current, {
            opacity: 100,
            ease: 'power1',
            duration: 1,
          });

        anim.current = tl;
      }
    });

    return () => {
      if (anim.current) {
        anim.current
          .duration(anim.current.duration() / 1.5)
          .reverse()
          .then(() => {
            ctx.revert();
          });
      } else {
        ctx.revert();
      }
    };
  }, [mainContainerRef.current, isControlsClose, textRef.current]);

  return (
    <div
      ref={mainContainerRef}
      className=' fixed z-[50] top-[1%] left-[1%] font-vt text-[1.3vw] text-white h-0 w-64 bg-[#212529]/80 rounded-lg'
    >
      <div
        ref={topControlsRef}
        className='h-10 w-10 bg-[#343a40] flex justify-end rounded-lg  '
      >
        <img
          ref={arrowRef}
          onClick={() => setIsControlsClose((prev) => !prev)}
          src={arrow}
          alt=''
          className='h-[40%] cursor-pointer z-50 opacity-60 pr-3 mt-3'
        />
      </div>
      <div
        ref={textRef}
        className='opacity-0 px-3 text-[1.1vw] text-center flex flex-col gap-4 pt-6 '
      >
        <div className='border-b flex flex-col  pb-4 gap-2'>
          <h1 className=''>left click + hold to move around</h1>
          <img
            src={mouseActiveLeft}
            alt=''
            className='h-[6vw] transition-all duration-300 hover:scale-[1.2] '
          />
        </div>

        <div className='border-b flex flex-col  pb-4 gap-2'>
          <h1 className='pt-1'>right click + hold right button to pan</h1>
          <img
            src={mouseActiveRight}
            alt=''
            className='h-[6vw] transition-all hover:scale-[1.2] duration-300'
          />
        </div>

        <div className='border-b flex flex-col  pb-4 gap-2'>
          <h1 className='pt-1'>scroll to zoom</h1>
          <img
            src={mouseActiveWheel}
            alt=''
            className='h-[6vw] transition-all hover:scale-[1.2] duration-300'
          />
        </div>

        <div className=' flex flex-col pb-4 gap-2'>
          <h1 className='pt-1'>click on objects to see close up</h1>
          <img
            src={cursor}
            alt=''
            className='h-[6vw] transition-all hover:scale-[1.2] duration-300'
          />
        </div>
      </div>
    </div>
  );
}
