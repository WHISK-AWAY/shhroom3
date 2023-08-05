import test from '/svg/test.svg';
import x from '/svg/arrowDown.svg';
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';

export default function UserControls() {
  const mainContainerRef = useRef(null);
  const [isControlsClose, setIsControlsClose] = useState(true);
  const anim = useRef(null);
  const textRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if(!isControlsClose) {
        
        const tl = gsap.timeline();
        
        tl.to(arrowRef.current, {
          rotation: -90,
          duration: .3,
          opacity: 100
        }).to(mainContainerRef.current, {
        
          height: '500px',
          ease: 'expo.inOut',
          duration: .6,
        
        }).to(textRef.current, {
          opacity: 100,
          ease: 'power1',
          duration: 1
        })
        
        anim.current = tl;
      }
    });

    return () => {
      if (anim.current) {
        anim.current
          .duration(anim.current.duration() / 1.5)
          .reverse()
          .then(() => {
           ctx.revert()
          });
      } else {
        ctx.revert()
      }
    };



  }, [mainContainerRef.current, isControlsClose, textRef.current]);



  return (
    <div
      ref={mainContainerRef}
      className=' fixed z-[50] top-[1%] left-[1%] font-vt text-[1.3vw] text-white h-0 w-64 bg-[#212529]/80 rounded-lg'
    >
      <div className='h-10 bg-[#343a40] flex justify-end pr-4 rounded-lg w '>
        <img
          ref={arrowRef}
          onClick={() => setIsControlsClose((prev) => !prev)}
          src={x}
          alt=''
          className='w-[7%] cursor-pointer z-50 opacity-60'
        />
      </div>
      <div
        ref={textRef}
        className='opacity-0 px-3 text-[1.1vw] text-center flex flex-col gap-4 pt-6 '
      >
        <div className='border-b flex flex-col  pb-4 gap-2'>
          <h1 className=''>left click to move around</h1>
          <img
            src={test}
            alt=''
            className='h-10 transition-all duration-300 hover:scale-[1.2] '
          />
        </div>

        <div className='border-b flex flex-col  pb-4 gap-2'>
          <h1 className='pt-1'>press + hold right button to pan</h1>
          <img
            src={test}
            alt=''
            className='h-10 transition-all hover:scale-[1.2] duration-300'
          />
        </div>

        <div className='border-b flex flex-col  pb-4 gap-2'>
          <h1 className='pt-1'>scroll to zoom</h1>
          <img
            src={test}
            alt=''
            className='h-10 transition-all hover:scale-[1.2] duration-300'
          />
        </div>

        <div className=' flex flex-col pb-4 gap-2'>
          <h1 className='pt-1'>click on objects to see close up</h1>
          <img
            src={test}
            alt=''
            className='h-10 transition-all hover:scale-[1.2] duration-300'
          />
        </div>
      </div>
    </div>
  );
}


