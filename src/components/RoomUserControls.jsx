import { useState, useEffect } from 'react';
import test from '/svg/esc_button.svg';
import arrowDown from '/svg/arrowDown.svg'
import { gsap } from 'gsap';

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('txt copied to clipboard');
  } catch (err) {
    console.error('failed to copy txt: ', err);
  }
}

export default function RoomUserControls({
  roomId,
  leaveMeeting,
  thisShhroomer,
}) {
  const [text, setText] = useState(window.location);

  // console.log('shh', thisShhroomer)

useEffect(() => {
  const ctx = gsap.context(() => {

  })

  return () => {
    ctx.revert();
  }
}, [])

  return (
    <div className='room-controls-wrapper absolute top-0 left-0  h-[60%] w-[15%]  font-vt flex z-50  justify-center rounded-sm  text-white border'>

    <div className=' border-b w-full h-[7%] flex justify-end items-center absolute bg-slate-400'>
    <img src={arrowDown} alt="" className='h-[13px]  '/>
    </div>
      
     
        <ul className='room-controls-list flex flex-col gap-10 justify-center   bg-black h-full p-4 rounded-md'>
            <button
              className='flex flex-col items-center'
              onClick={() => copyToClipboard(text)}
            >
              <img src={test} alt='' className='w-[50%]' />
              <li className='link-invite text-[10px]'>copy invite link to clipboard</li>
            </button>

            <button className='flex flex-col items-center'>
              <img src={test} alt='' className='w-[50%]' />
              <li className='link-invite text-[10px]'>chat</li>
            </button>

            <button
              className='flex flex-col  items-center'
              onClick={leaveMeeting}
            >
              <img src={test} alt='' className='w-[50%]' />
              <li className='link-invite text-[10px]'>leave meeting</li>
            </button>
          </ul>
        
      
    </div>
  );
}
