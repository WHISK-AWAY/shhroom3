import screensaver from '/bg/screen_saver.jpg';
import compIcon from '/svg/computerIcon.svg';
import Signin from './Signin';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import SignUp from './SignUp';
import { useContext, useMemo } from 'react';
import { ZoomContext } from './Landing/Landing';
import { Vector3 } from 'three';


export default function Screensaver() {
  const [isFormHidden, setIsFormHidden] = useState(true);
  const [isSignUpHidden, setIsSignUpHidden] = useState(true);
  const zoom = useContext(ZoomContext);


    const monitorZoomPosition = useMemo(
      () => new Vector3(3.54909, 3.20587, 2.15376),
    );


    function zoomClicker(e) {
      // if we're already zoomed in, don't do anything
      if (zoom.zoomMode) {
        e.stopPropagation();
      } else {
        zoom.setZoom((prev) => ({
          ...prev,
          targetPosition: monitorZoomPosition,
          targetLabel: 'monitor',
          zoomMode: true,
          controlsEnabled: false,
        }));
      }
    }


  return (
    <div onClick={zoomClicker} className='bg-[#5DC0EA] text-[#151521]'>
      <div
        className={`w-[1600px] h-[990px] bg-cover bg-no-repeat bg-bottom
    bg-[url('/bg/screen_saver1.jpg')]`}
      >
        <div className='relative pt-[10%] px-[10%] mr-[2%] flex flex-col items-end  '>
          <img
            onClick={() => setIsFormHidden(false)}
            src={compIcon}
            alt='old computer screen icon'
            className='h-[10%] w-[10%] drop-shadow-xl  '
          />

          <div className='absolute -top-[10%] -right-[12%]'>
            {!isFormHidden &&
              (isSignUpHidden ? (
                <div className='scale-[90%]'>
                <Signin
                setIsFormHidden={setIsFormHidden}
                isFormHidden={isFormHidden}
                setIsSignUpHidden={setIsSignUpHidden}
                />
                </div>
              ) : (
                <div className='scale-[90%]'>
                <SignUp
                setIsFormHidden={setIsFormHidden}
                isFormHidden={isFormHidden}
                setIsSignUpHidden={setIsSignUpHidden}
                />
                </div>
              ))}
          </div>

          <p className='font-vt text-[35px] pt-[1%] relative translate-x-[21%]'>
            sign_in/sign_up
          </p>
        </div>
      </div>
    </div>
  );
}
