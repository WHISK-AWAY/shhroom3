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
        
        tl.to(mainContainerRef.current, {
          // opacity: 100,
          // y: '-=100%',
          height: '500px',
          ease: 'expo.inOut',
          duration: .8,
          border: 'solid 1px white'
        },'<.3').to(textRef.current, {
          opacity: 100,
          ease: 'power1',
          duration: 1
        }).to(arrowRef.current, {
          rotation: 180
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

  // const closeControls = () => {

  //   console.log('hi')
  //   if (anim.current) {
  //     anim.current
  //       .duration(anim.current.duration() / 1.2)
  //       .reverse()
  //       .then(() => {
  //         setIsControlsClose((prev ) => !prev);
  //       });
  //   } else {
  //     setIsControlsClose((prev) => !prev);
  //   }
  // };

  return (
    <div
      ref={mainContainerRef}
      className=' fixed z-[10] top-[1%] left-[1%] font-vt text-[1.3vw] text-white h-0 w-64 bg-[#cccccc]/50 rounded-md'
    >
      <div className='h-10 bg-[#343a40] flex justify-end pr-4 rounded-md border'>
        <img
        ref={arrowRef}
          onClick={() => setIsControlsClose((prev) => !prev)}
          src={x}
          alt=''
          className='w-[7%] cursor-pointer z-50'
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


   
    {
      /**
    <div className='h-8 w-[20%] relative rounded-t-xl bg-pink-300 flex items-center justify-end pr-2 z-[70]'>
    <img
          onClick={closeControls}
          src={x}
          alt=''
          className='w-[10%] cursor-pointer z-50'
          />
          </div>

      <div
        ref={mainContainerRef}
        className='controls-wrapper p-[4%] flex flex-col text-center gap-3 bg-blue-300 rounded-xl h-0 w-[20%] absolute top-0 left-0'
        >
      */
    }

    {
      /**
      <h1>left click to move around</h1>
      <img src={test} alt='' className='h-10 ' />
      <h1>press + hold right button to pan</h1>
      <img src={test} alt='' className='h-10 ' />
      <h1>scroll to zoom</h1>
      <img src={test} alt='' className='h-10 ' />
      <h1>click on objects to see close up</h1>
      <img src={test} alt='' className='h-10 ' />
      </div>
    */
    }
   