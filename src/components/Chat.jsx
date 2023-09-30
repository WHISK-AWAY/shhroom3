import { useState, useEffect, useRef } from 'react';
import plane from '/svg/plane.svg';
import bleep from '../../public/bg/bleep2.mp3';
import { gsap } from 'gsap/gsap-core';

export default function Chat(props) {
  const {
    shhroomer,
    partnerPublicKey,
    chatConnection,
    isUserControlsOpen,
    setIsUserControlsOpen,
  } = props;

  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState('');
  const anchorRef = useRef(null);
  const chat = useRef(null);
  const [isNewMessage, setIsNewMessage] = useState(false);

  useEffect(() => {
    if (!chatConnection?.peer) return;

    // handle inbound chat message
    chatConnection.on('data', (data) => {
      const newMsg = JSON.parse(
        shhroomer.encryptionInfo.decrypt(data, partnerPublicKey),
      );
      setMessageList((prev) => [...prev, newMsg]);
      setIsNewMessage(true);
    });

    return () => {
      // cleanup: remove event listener
      chatConnection.off('data');
    };
  }, []);

  //chat anchor
  useEffect(() => {
    if (chat.current) {
      chat.current.scrollTop = chat.current.scrollHeight;
    }
  }, [messageList]);

  //new message audio
  useEffect(() => {
    if (isNewMessage) {
      const audio = new Audio(bleep);
      audio.play();
      setIsNewMessage(false);
    }
  }, [isNewMessage]);

  const handleMessage = (evt) => {
    // handle outbound chat message
    evt.preventDefault();
    if (message === '') return;

    const newMsg = {
      username: shhroomer.userInfo.username,
      timestamp: Date.now(),
      message,
    };

    // add new message to chat window
    setMessageList((prev) => [...prev, newMsg]);

    // encrypt & send message to partner
    if (chatConnection.open) {
      chatConnection.send(
        shhroomer.encryptionInfo.encrypt(
          JSON.stringify(newMsg),
          partnerPublicKey,
        ),
      );
    }

    // reset input field
    setMessage('');
  };



  return (
    <div
    id='chat-area'
      className={`${
        isUserControlsOpen
          ? 'w-[60%] 3xl:w-[50%] 4xl:w-[40%] max-h-[20dvh] h-[50dvh] 5xl:w-[35%] short:w-[50%]'
          : 'w-[70%] 3xl:w-[60%] 4xl:w-[50%] 5xl:w-[35%] short:w-[50%]'
      } chat-area-wrapper justify-between  max-h-[30dvh] h-[28dvh] flex flex-col mx-auto font-vt text-[1.5vw] bg-teal-400/10 rounded-md mb-8 3xl:text-[1.1vw] `}
    >
      <div className='flex flex-row h-full items-center justify-center rounded-t-md scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-slate-700 scrollbar-track-slate-800 w-full mx-auto py-3  flex-grow-0 flex-shrink-0'>
        <div
          ref={chat}
          id='chat-container'
          className='overflow-y-scroll h-full bg-nav-gradient-dark/50 px-3 text-slate-400 w-full flex flex-col  scroll-smooth'
        >
          {messageList &&
            messageList.map(({ username, timestamp, message }) => (
              <div key={timestamp} className='w-full'>
                <p>
                  <span className='font-semibold text-teal-300 text-[1rem] xl:text-[1.1rem] 5xl:text-[1.3rem] 6xl: 6xl:text-[1.4rem]'>
                    {username}{' '}
                  </span>
                  <span className='text-[.9vw] 4xl:text-[.9rem] text-slate-400 ml-1'>
                    {new Date(timestamp).toLocaleString(undefined, {
                      hour: 'numeric',
                      minute: 'numeric',
                      // second: 'numeric',
                    })}
                  </span>
                </p>
                <p className='text-slate-300 w-full whitespace-normal break-words text-[1rem] 5xl:text-[1.1rem]'>
                  {message}
                </p>
              </div>
            ))}
        </div>
      </div>
      <div ref={anchorRef} id='scroll-anchor'></div>
      <form onSubmit={handleMessage} className='w-full flex relative'>
        <button type='submit'>
          <img
            src={plane}
            alt='Send message icon'
            className='absolute right-2 top-1 w-[25px] 2xl:w-[30px]  5xl:w-[45px]'
          />
        </button>
        <input
          className='px-3 caret-teal-200  text-white bg-teal-500/70  w-full min-h-[35px] 2xl:h-[40px]  5xl:h-[55px] rounded-b-md placeholder-slate-100 focus:outline-none  whitespace-normal placeholder:break-words flex flex-wrap text-[1rem] 5xl:text-[1.1rem]'
          type='text'
          name='chat'
          id='chat'
          autoComplete='off'
          value={message}
          onChange={(evt) => setMessage(evt.target.value)}
          placeholder='psst...'
        ></input>
      </form>
    </div>
  );
}
