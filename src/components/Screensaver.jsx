import { useEffect, useState, useRef } from 'react';
import compIcon from '/svg/computerIcon.svg';
import Signin from './Signin';
import SignUp from './SignUp';
import { useContext } from 'react';
import { LandingContext } from '../lib/context';
import { gsap } from 'gsap';

export default function Screensaver() {
  const [isFormHidden, setIsFormHidden] = useState(true);
  const [isSignUpHidden, setIsSignUpHidden] = useState(true);
  const tl = useRef(null);

  const wrapperRef = useRef(null);

  const landingContext = useContext(LandingContext);

  useEffect(() => {
    // Fade-in/out animation
    const ctx = gsap.context(() => {
      if (landingContext.targetLabel === 'monitor') {
        tl.current = gsap.timeline();

        tl.current.to(wrapperRef.current, {
          opacity: 1,
          duration: 1,
          ease: 'slow',
        });
      }
    });

    return () => {
      if (tl.current) {
        tl.current
          .duration(tl.current.duration() / 2)
          .reverse()
          .then(() => ctx.revert());
      } else ctx.revert();
    };
  }, [landingContext.targetLabel]);

  function zoomToMonitor(e) {
    // if we're already zoomed in, don't do anything
    // console.log('clicked monitor');
    if (landingContext.targetLabel === 'monitor') {
      e.stopPropagation();
    } else {
      landingContext.setContext((prev) => ({
        ...prev,
        signInHintIsVisible: false,
      }));
      landingContext.zoomToObject('monitor');
    }
  }

  return (
    <div
      ref={wrapperRef}
      onClick={() => landingContext.zoomToObject('monitor')}
      className='bg-[#5DC0EA] text-[#151521] opacity-0'
    >
      <div
        className={`w-[1600px] h-[990px] bg-cover bg-no-repeat bg-bottom
    bg-[url('/bg/screen_saver1.webp')]`}
      >
        <div className='relative pt-[10%] px-[10%] mr-[2%] flex flex-row-reverse justify-between w-full items-start  '>
          <div className='flex flex-col items-center w-1/5 h-1/5'>
            <img
              onClick={() => setIsFormHidden(false)}
              src={compIcon}
              alt='old computer screen icon'
              className='h-[80%] w-[60%] drop-shadow-xl  '
            />
            <p className='font-vt text-[35px] pt-[1%]  '>sign_in/sign_up</p>
          </div>
          <div className='flex flex-col items-end -translate-x-[10%]  w-full h-full'>
            {!isFormHidden &&
              (isSignUpHidden ? (
                <div className='scale-[100%]'>
                  <Signin
                    setIsFormHidden={setIsFormHidden}
                    setIsSignUpHidden={setIsSignUpHidden}
                  />
                </div>
              ) : (
                <div className='scale-[100%]'>
                  <SignUp
                    setIsFormHidden={setIsFormHidden}
                    isFormHidden={isFormHidden}
                    setIsSignUpHidden={setIsSignUpHidden}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
