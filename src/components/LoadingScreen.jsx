import seizureShhroom from '/bg/shh_seizure.gif';

export default function LoadingScreen() {
  return (
    <div className='bg-black w-screen h-screen flex flex-col'>
      <div className='w-full h-full items-center  justify-center flex relative'>
        <img
          src={seizureShhroom}
          alt=''
          className='h-[20%] w-[13%] absolute z-50 5xl:w-[10%]'
        />
        <p className='font-press text-white uppercase text-[5vw] absolute translate-y-[80%] -z-0'>
          loading...
        </p>
      </div>
    </div>
  );
}
