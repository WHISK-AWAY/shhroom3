import screensaver from '/bg/screen_saver.jpg'
import compIcon from '/svg/computerIcon.svg';

export default function Screensaver() {
  return (
    <div className='bg-[#5DC0EA] text-[#151521]'>
      <div
        className={`w-screen h-screen bg-contain bg-no-repeat bg-bottom 
    bg-[url('/bg/screen_saver1.jpg')]`}
      >
        <div className='relative pt-[19%] px-[10%] mr-[10%] flex flex-col items-end  '>
          <img src={compIcon} alt='old computer screen icon' className='h-[12%] w-[12%] drop-shadow-xl  ' />
          <p className='font-vt text-[1.5vw] pt-[1%] relative translate-x-[5%]'>sign_in/sign_up</p>
        </div>
      </div>
    </div>
  );
}
