import arrow from '/svg/arrowDown.svg';
import mouseActiveLeft from '/svg/mouse_active_left.svg';
import mouseActiveRight from '/svg/mouse_active_right.svg';
import mouseActiveWheel from '/svg/mouse_active_wheel.svg';
import cursor from '/svg/cursor.svg';
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { GlobalContext } from '../lib/context';
import { useContext } from 'react';

export default function UserControls() {
  const mainContainerRef = useRef(null);
  const [isControlsClose, setIsControlsClose] = useState(true);
  const previousModeRef = useRef(null);
  const textRef = useRef(null);
  const arrowRef = useRef(null);
  const topControlsRef = useRef(null);
  const globalContext = useContext(GlobalContext);

  useEffect(() => {
    if (!globalContext.isSignedIn) {
      setTimeout(() => {
        setIsControlsClose(false);
      }, 3000);
    } else {
      setIsControlsClose(true);
    }
  }, []);

  useEffect(() => {
    if (!isControlsClose) {
      previousModeRef.current = false;
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        tl.set(mainContainerRef.current, { height: 0 });
        tl.to(topControlsRef.current, {
          width: '100%',
          duration: 0.2,
          ease: 'expo',
        })
          .to(arrowRef.current, {
            rotation: -90,
            duration: 0.3,
            margin: '2px',
            opacity: 100,
          })
          .from(mainContainerRef.current, {
            height: 0,
            ease: 'expo.inOut',
            duration: 0.6,
          })
          .to(
            textRef.current,
            {
              opacity: 100,
              paddingTop: '24px',
              ease: 'power1',
              duration: 0.6,
            },
            '<',
          );
      });

      return () => {
        ctx.revert();
      };
    } else {
      if (isControlsClose && !previousModeRef.current) {
        const ctx = gsap.context(() => {
          const tl = gsap.timeline({});

          tl.from(arrowRef.current, {
            rotation: -90,
            duration: 0.3,
            opacity: 100,
          })
            .to(mainContainerRef.current, {
              height: 0,
              ease: 'expo.inOut',
              duration: 0.6,
            })
            .from(
              textRef.current,
              {
                opacity: 100,
                paddingTop: '24px',
                ease: 'power1',
                duration: 0.6,
              },
              '<',
            );

          tl.from(topControlsRef.current, {
            width: '100%',
            duration: 0.2,
            ease: 'expo',
          });
        });

        previousModeRef.current = true;
        return () => {
          ctx.revert();
        };
      }
    }
  }, [mainContainerRef.current, isControlsClose, textRef.current]);

  return (
    <div
      ref={mainContainerRef}
      className='fixed  z-50 top-[1%] left-[1%] font-vt  h-[75dvh] short:h-[85dvh] xl:h-[67dvh] 2xl:h-[63dvh] 4xl:h-[71dvh] 5xl:h-[67dvh] 6xl:h-[60dvh] portrait:h-[60svh] landscape:5xl:tall:h-[50dvh] portrait:md:h-[74svh] text-white  w-64 rounded-lg'
    >
      <div
        ref={topControlsRef}
        className='h-9 relative w-9 bg-[#343a40] flex z-50 justify-end rounded-lg  '
      >
        <img
          ref={arrowRef}
          onClick={() => setIsControlsClose((prev) => !prev)}
          src={arrow}
          alt='Arrow icon to open/hide dropdown user controls helper menu'
          className='h-3 4xl:h-4 cursor-pointer z-50 opacity-60 pr-3 my-auto '
        />
      </div>

      <div
        ref={textRef}
        className={` ${isControlsClose ? 'opacity-0' : 'opacity-100'}
        flex  px-3 text-[1.1vw] text-center bg-[#212529]/80 z-0 relative rounded-b-lg  -top-1 flex-col gap-4 h-full overflow-hidden  lg:text-[1rem] portrait:text-[1rem]`}
      >
        <div className='border-b flex flex-col  pb-4 gap-2 '>
          <h1 className=''>left click + hold to move around</h1>
          <img
            src={mouseActiveLeft}
            alt='Mouse icon showing left button as an active button'
            className='h-[6vw] 5xl:h-[4vw] portrait:h-[15vw] transition-all duration-300 hover:scale-[1.2] '
          />
        </div>

        <div className='border-b flex flex-col  pb-4 gap-2'>
          <h1 className='pt-1'>right click + hold right button to pan</h1>
          <img
            src={mouseActiveRight}
            alt='Mouse icon showing right button as an active button'
            className='h-[6vw] 5xl:h-[4vw]  portrait:h-[15vw] transition-all hover:scale-[1.2] duration-300'
          />
        </div>

        <div className='border-b flex flex-col  pb-4 gap-2'>
          <h1 className='pt-1'>scroll to zoom</h1>
          <img
            src={mouseActiveWheel}
            alt='Mouse icon showing wheel as an active button'
            className='h-[6vw] 5xl:h-[4vw] portrait:h-[15vw] transition-all hover:scale-[1.2] duration-300'
          />
        </div>

        <div className=' flex flex-col pb-4 gap-2'>
          <h1 className='pt-1'>click on objects to see close up</h1>
          <img
            src={cursor}
            alt='Cursor icon - click on objects to see close up'
            className='h-[6vw] 5xl:h-[4vw] portrait:h-[15vw] transition-all hover:scale-[1.2] duration-300'
          />
        </div>
      </div>
    </div>
  );
}

// useEffect(() => {
//   if (menuMode === 'dropdown') {
//     previousModeRef.current = 'dropdown';
//     const ctx = gsap.context(() => {
//       const tl = gsap.timeline({});

//       tl.set(screenRef.current, { display: 'block' })
//         .to(wrapperRef.current, {
//           y: '+=100%',
//           duration: 0.25,
//           ease: 'power1.in',
//         })
//         .to(
//           screenRef.current,
//           {
//             backdropFilter: 'blur(8px)',
//             duration: 0.25,
//           },
//           '<',
//         );
//     });

//     return () => ctx.revert();
//   } else {
//     if (previousModeRef.current === 'dropdown') {
//       const ctx = gsap.context(() => {
//         const tl = gsap.timeline();

//         tl.from(wrapperRef.current, {
//           y: '+=100%',
//           ease: 'power1.in',
//           duration: 0.25,
//         })
//           .from(
//             screenRef.current,
//             {
//               backdropFilter: 'blur(8px)',
//               display: 'block',
//               duration: 0.25,
//             },
//             '<',
//           )
//           .set(screenRef.current, { display: 'none' });
//       });

//       previousModeRef.current = null;

//       return () => ctx.revert();
//     }
//   }
// }, [menuMode, wrapperRef.current]);
