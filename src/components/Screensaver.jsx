import screensaver from '/bg/screen_saver.jpg'
import compIcon from '/svg/computerIcon.svg';

export default function Screensaver() {
  return (
    <div className='bg-[#5DC0EA]'>
      <div
        className={`w-screen h-screen bg-contain bg-no-repeat bg-bottom
    bg-[url('/bg/screen_saver1.jpg')]`}
      >
        <div className='relative pt-[19%] px-[10%] mx-[20%] flex flex-col items-end border'>
          <img src={compIcon} alt='' className='h-20 w-20  ' />
          <p className='font-vt text-[1.5vw] pl-[60%]'>sign_in/sign_up</p>
        </div>
      </div>
      
    </div>
  );
}
