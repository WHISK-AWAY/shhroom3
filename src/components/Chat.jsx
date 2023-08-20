import { useState, useEffect, useRef } from 'react';
import plane from '/svg/plane.svg'

export default function Chat(props) {
  const { shhroomer, partnerPublicKey, chatConnection, isUserControlsOpen, setIsUserControlsOpen } = props;

  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState('');
  const anchorRef  = useRef(null)

  useEffect(() => {
    if (!chatConnection?.peer) return;

    // handle inbound chat message
    chatConnection.on('data', (data) => {
      const newMsg = JSON.parse(
        shhroomer.encryptionInfo.decrypt(data, partnerPublicKey),
      );
      setMessageList((prev) => [...prev, newMsg]);
    });

    return () => {
      // cleanup: remove event listener
      chatConnection.off('data');
    };
  }, []);


  useEffect(() => {


    console.log('anchoring')
  }, [anchorRef.current])
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
      className={`${
        isUserControlsOpen ? 'w-[60%] max-h-[30dvh] h-[60dvh]' : 'w-[80%]'
      } chat-area-wrapper justify-between  max-h-[30dvh] h-[30dvh] flex flex-col mx-auto font-vt text-[1.5vw] bg-teal-400/20 rounded-md mt-8 3xl:text-[1.1vw] `}
    >
    <div className='flex flex-row h-full items-center justify-center rounded-t-md scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-slate-700 scrollbar-track-slate-800 w-full mx-auto border  flex-grow-0 flex-shrink-0'>
    <div
    id='chat-container'
          className='overflow-y-scroll h-full bg-nav-gradient-dark/50 px-3 text-slate-400 w-full border border-red-400'
        >
          {messageList &&
            messageList.map(({ username, timestamp, message }) => (
              <div key={timestamp} className='w-full'>
                <p>
                  <span className='font-semibold text-teal-300'>
                    {username}{' '}
                  </span>
                  <span className='text-[.9vw] text-slate-400 ml-1'>
                    {new Date(timestamp).toLocaleString(undefined, {
                      hour: 'numeric',
                      minute: 'numeric',
                      // second: 'numeric',
                    })}
                  </span>
                </p>
                <p className='text-slate-300 w-full border whitespace-normal break-words'>
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
            alt=''
            className='absolute right-2 top-0 w-[35px] 6xl:w-[55px]'
          />
        </button>
        <input
          className='px-2 py-1 text-white bg-teal-500/70 border-[.5px] border-white w-full h-[35px] 5xl:h-[40px] 6xl:h-[55px] rounded-b-md placeholder-slate-100 focus:outline-none focus:border-2 whitespace-normal'
          type='text'
          name='chat'
          id='chat'
          autoComplete='off'
          value={message}
          onChange={(evt) => setMessage(evt.target.value)}
          placeholder='Psst!'
        ></input>
      </form>
    </div>
  );
}
