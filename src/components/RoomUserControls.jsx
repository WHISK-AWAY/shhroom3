import { useState, useEffect, useRef } from 'react';
import chat from '/svg/chat.svg';
import door from '/svg/door.svg';
import copy from '/svg/copy.svg';
import arrowDown from '/svg/arrowDown.svg';
import { gsap } from 'gsap';

export default function RoomUserControls({
  roomId,
  leaveMeeting,
  thisShhroomer,
  isUserControlsOpen,
  setIsUserControlsOpen,
  setIsChatOpen,
  isChatOpen,
  partnerPeerId,
}) {
  const [text, setText] = useState(window.location);
  const topControlsRef = useRef(null);
  const mainContainerRef = useRef(null);
  const arrowRef = useRef(null);
  const svgRef = useRef(null);
  const anim = useRef(null);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const previousModeRef = useRef(null);

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      console.log('txt copied to clipboard');
    } catch (err) {
      console.error('failed to copy txt: ', err);
    }
  }

  useEffect(() => {
    if (isUserControlsOpen) {
      previousModeRef.current = false;
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        tl.set(mainContainerRef.current, { height: 0 });

        tl.to(topControlsRef.current, {
          width: '15%',
          duration: 0.2,
          ease: 'expo',
        })
          .to(arrowRef.current, {
            rotation: -90,
            duration: 0.3,
          })
          .to(mainContainerRef.current, {
            opacity: 100,
          })
          .from(
            mainContainerRef.current,
            {
              height: 0,
              duration: 0.6,
              ease: 'expo.inOut',
              // opacity: 100,
            },
            ',',
          )
          .to(
            svgRef.current,
            {
              opacity: 100,
              duration: 0.8,
              ease: 'power1',
            },
            '<',
          );
      });

      return () => {
        ctx.revert();
      };
    } else {
      if (!isUserControlsOpen && !previousModeRef.current) {
        const ctx = gsap.context(() => {
          const tl = gsap.timeline({});
          tl.set(mainContainerRef.current, { opacity: 100 });

          tl.from(arrowRef.current, {
            rotation: -90,
            duration: 0.3,
          })
            .to(mainContainerRef.current, {
              opacity: 100,
            })
            .to(mainContainerRef.current, {
              height: 0,
              duration: 0.6,
              ease: 'expo.inOut',
              // opacity: 100,
            })
            .from(
              svgRef.current,
              {
                opacity: 100,
                duration: 0.8,
                ease: 'power1',
              },
              '<',
            )
            .from(topControlsRef.current, {
              width: '15%',
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
  }, [mainContainerRef.current, isUserControlsOpen]);

  return (
    <>
      <div
        ref={topControlsRef}
        className='  w-[2%] 6xl:max-w-[330px] max-w-[300px] h-[3%] flex justify-end items-center top-2 absolute bg-teal-400/90 z-[99] rounded-sm 5xl:w-[1%] '
      >
        <img
          onClick={() => setIsUserControlsOpen((prev) => !prev)}
          ref={arrowRef}
          src={arrowDown}
          alt='Arrow icon to open/hide dropdown user controls helper menu'
          className='h-[11px] 4xl:h-[16px] xl:pr-2 px-1 my-auto '
        />
      </div>

      <div
        ref={mainContainerRef}
        className={`  room-controls-wrapper absolute top-[3%] left-0  h-[60vh]  w-[15%] 6xl:max-w-[330px] max-w-[300px]  font-vt flex z-50  justify-center rounded-md  text-white text-[1.4vw]  overflow-hidden bg-neutral-700/90 opacity-0`}
      >
        <ul className='room-controls-list  flex flex-col gap-10 justify-center  w-full  h-full p-4 rounded-r-sm'>
          <div
            ref={svgRef}
            className={` 
            text-[1.1vw] opacity-0 3xl:text-[.9vw] 6xl:text-[.7vw] flex flex-col gap-6  w-[95%] 3xl:w-[80%] self-center`}
          >
            <button
              className='flex flex-col items-center'
              onClick={() => {
                copyToClipboard(text);
                setIsLinkCopied(true);
              }}
            >
              <img
                src={copy}
                alt='Copy invitation link icon'
                className='w-[50%] 4xl:w-[40%] short:w-[35%] transition-all duration-300 hover:scale-[1.2] '
              />
              <li className='link-invite  pt-1'>
                {isLinkCopied
                  ? 'link has been copied to clipboard!'
                  : 'copy invite link to clipboard'}
              </li>
            </button>

            {partnerPeerId.current && (
              <button
                onClick={() => setIsChatOpen((prev) => !prev)}
                className='flex flex-col items-center'
              >
                <img
                  src={chat}
                  alt='Chat icon'
                  className='w-[65%] 4xl:w-[55%] short:w-[45%]  transition-all duration-300 hover:scale-[1.2] '
                />
                <li className='link-invite pt-1'>chat</li>
              </button>
            )}

            <button
              className='flex flex-col  items-center'
              onClick={leaveMeeting}
            >
              <img
                src={door}
                alt='Leave meeting icon'
                className='w-[65%] 4xl:w-[55%] short:w-[45%]  transition-all duration-300 hover:scale-[1.2] '
              />
              <li className='link-invite pt-1'>leave meeting</li>
            </button>
          </div>
        </ul>
      </div>
    </>
  );
}
