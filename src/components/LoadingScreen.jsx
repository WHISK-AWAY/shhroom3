import seizureShhroom from '/bg/shh_seizure.gif';
import { gsap } from 'gsap';
import { useRef, useEffect } from 'react';

export default function LoadingScreen() {
  const dot_01 = useRef(null);
  const dot_02 = useRef(null);
  const dot_03 = useRef(null);
  const group = useRef(null);
  const shroom = useRef(null);
  const loadingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, delay: 1.1 });

      tl.from(
        dot_01.current,
        {
          opacity: 0,
          duration: 0.3,
        },
        'dot_01.current+=8%',
      )
        .from(
          dot_02.current,
          {
            opacity: 0,
            duration: 0.3,
          },
          'dot_02.current+=8%',
        )
        .from(
          dot_03.current,
          {
            opacity: 0,
            duration: 0.4,
          },
          'dot_03.current+=8%',
        );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(loadingRef.current, {
        opacity: 0,
        rotateX: 300,
        scaleX: 0.01,
        scaleY: 0.01,
        duration: 1,
        ease: 'back.inOut',
      });

      gsap.from(shroom.current, {
        delay: 1,
        y: -890,
        ease: 'elastic.out',
        duration: 3.1,
      });
    });
    return () => {
      ctx.revert();
    };
  }, [shroom.current, loadingRef.current]);

  return (
    <div className='bg-gradient-to-r from-gray-100 via-gray-900 to-black w-screen h-screen flex flex-col'>
      <div className='w-full h-full items-center  justify-center flex relative'>
        <img
          ref={shroom}
          src={seizureShhroom}
          alt=''
          className='h-[20%] w-[13%] absolute z-50 5xl:w-[10%]'
        />
        <p
          ref={loadingRef}
          className='font-press text-white uppercase text-[5vw] absolute translate-y-[80%] scale-100 -z-0'
        >
          loading
          <span ref={group}>
            <span ref={dot_01}>.</span>
            <span ref={dot_02}>.</span>
            <span ref={dot_03}>.</span>
          </span>
        </p>
      </div>
    </div>
  );
}
