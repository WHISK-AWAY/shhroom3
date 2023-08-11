import { useState, useEffect } from 'react';

export default function Chat(props) {
  const { shhroomer, partnerPublicKey, chatConnection } = props;

  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState('');

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
    <div className='chat-area-wrapper h-[30%] w-[80%] flex flex-col mx-auto font-vt text-[20px] bg-teal-400/20 rounded-t-md mt-2'>
      <div className='flex flex-row h-[80%] items-center justify-center rounded-t-md scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-slate-700 scrollbar-track-slate-800 w-full mx-auto'>
        <div
          id='chat-container'
          className='overflow-auto h-full bg-nav-gradient-dark/50 px-3 text-slate-400 w-full'
        >
          {messageList &&
            messageList.map(({ username, timestamp, message }) => (
              <div key={timestamp}>
                <p>
                  <span className='font-semibold text-teal-300'>{username} </span>
                  <span className='text-sm text-slate-400 ml-1'>
                    {new Date(timestamp).toLocaleString(undefined, {
                      hour: 'numeric',
                      minute: 'numeric',
                      // second: 'numeric',
                    })}
                  </span>
                </p>
                <p className='text-slate-300'>{message}</p>
              </div>
            ))}
          <div id='scroll-anchor'></div>
        </div>
      </div>
      <form onSubmit={handleMessage} className='w-full'>
        <input
          className='px-2 py-1 text-white bg-teal-500/70 border-[.5px] border-white w-full h-[40px] rounded-b-md placeholder-slate-100 focus:outline-none focus:border-2'
          type='text'
          name='chat'
          id='chat'
          value={message}
          onChange={(evt) => setMessage(evt.target.value)}
          placeholder='Psst!'
        ></input>
      </form>
    </div>
  );
}
