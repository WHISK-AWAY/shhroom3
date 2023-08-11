import { useState, useEffect, useRef } from 'react';
import test from '/svg/esc_button.svg';
import chat from '/svg/chat.svg'
import door from '/svg/door.svg'
import copy from '/svg/copy.svg'
import arrowDown from '/svg/arrowDown.svg';
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
  isUserControlsOpen,
  setIsUserControlsOpen,
}) {
  const [text, setText] = useState(window.location);
  const topControlsRef = useRef(null);
  const mainContainerRef = useRef(null);
  const arrowRef = useRef(null);
  const svgRef = useRef(null);
  const anim = useRef(null);

  // console.log('shh', thisShhroomer)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isUserControlsOpen) {
        const tl = gsap.timeline();

        tl.to(topControlsRef.current, {
          width: '15%',
          duration: 0.2,
          ease: 'expo',
        })
          .to(mainContainerRef.current, {
            height: '55%',
            // width: '15%',
            duration: 0.6,
            ease: 'expo.inOut',
            opacity: 100,
          })
          .to(arrowRef.current, {
            rotation: -90,
            // duration: 0.3,
          })
          .to(svgRef.current, {
            opacity: 100,
            duration: 0.8,
            ease: 'power1',
          });

        anim.current = tl;
      }
    });

    return () => {
      if (anim.current) {
        anim.current
          .duration(anim.current.duration() / 1.5)
          .reverse()
          .then(() => ctx.revert());
      } else {
        ctx.revert();
      }
    };
  }, [mainContainerRef.current, isUserControlsOpen]);

  return (
    <>
      <div
        ref={topControlsRef}
        className=' border-b w-[2%] h-[3%] flex justify-end items-center absolute bg-teal-400 z-[99]'
      >
        <img
          onClick={() => setIsUserControlsOpen((prev) => !prev)}
          ref={arrowRef}
          src={arrowDown}
          alt=''
          className='h-[13px] pr-1 '
        />
      </div>

      <div
        ref={mainContainerRef}
        className='room-controls-wrapper absolute top-4 left-0 opacity-0 h-0 w-[15%]  font-vt flex z-50  justify-center rounded-md  text-white'
      >
        <ul className='room-controls-list  flex flex-col gap-10 justify-center  w-full bg-neutral-700/90 h-full p-4 rounded-r-sm'>
          <div ref={svgRef} className='flex flex-col gap-6 opacity-0'>
            <button
              className='flex flex-col items-center'
              onClick={() => copyToClipboard(text)}
            >
              <img
                src={copy}
                alt=''
                className='w-[50%] transition-all duration-300 hover:scale-[1.2] '
              />
              <li className='link-invite text-[12px] pt-1'>
                copy invite link to clipboard
              </li>
            </button>

            <button className='flex flex-col items-center'>
              <img
                src={chat}
                alt=''
                className='w-[65%] transition-all duration-300 hover:scale-[1.2] '
              />
              <li className='link-invite text-[12px] pt-1'>chat</li>
            </button>

            <button
              className='flex flex-col  items-center'
              onClick={leaveMeeting}
            >
              <img
                src={door}
                alt=''
                className='w-[65%] transition-all duration-300 hover:scale-[1.2] '
              />
              <li className='link-invite text-[12px] pt-1'>leave meeting</li>
            </button>
          </div>
        </ul>
      </div>
    </>
  );
          }
