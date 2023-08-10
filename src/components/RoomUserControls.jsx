import { useState } from 'react';
import test from '/svg/esc_button.svg';
import arrowDown from '/svg/arrowDown.svg'

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

  console.log('shh', thisShhroomer)



  return (
    <div className='room-controls-wrapper absolute top-0 left-0  h-[60%] w-[15%]  font-vt flex z-50  justify-center rounded-sm  text-white'>
      <div className=' absolute bg-gradient-to-r w-full h-full from-pink-600 to-purple-600 rounded-lg  group-hover:opacity-75 transition duration-1000 group-hover:duration-600 animate-tilt blur -z-10'/>
        <div className=' backdrop-blur '>
        <ul className='room-controls-list flex flex-col gap-10 justify-center   bg-black h-full p-4 rounded-md'>
        <img src={arrowDown} alt="" className='h-10'/>
            <button
              className='flex flex-col items-center'
              onClick={() => copyToClipboard(text)}
            >
              <img src={test} alt='' className='w-20' />
              <li className='link-invite'>copy invite link to clipboard</li>
            </button>

            <button className='flex flex-col items-center'>
              <img src={test} alt='' className='w-20' />
              <li className='link-invite'>chat</li>
            </button>

            <button
              className='flex flex-col  items-center'
              onClick={leaveMeeting}
            >
              <img src={test} alt='' className='w-20' />
              <li className='link-invite'>leave meeting</li>
            </button>
          </ul>
        </div>
      
    </div>
  );
}
