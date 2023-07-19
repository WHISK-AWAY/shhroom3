import React, { useState } from 'react';

export default function Chat(props) {
  const {
    messageList,
    connection,
    appendMessage,
    username,
    encrypt,
    peerPublicKey,
  } = props;
  const [message, setMessage] = useState('');

  const handleMessage = (evt) => {
    evt.preventDefault();
    if (message === '') return;

    appendMessage(message, username);
    if (connection.open)
      connection.send({
        message: encrypt(message, peerPublicKey),
        sender: username,
      });

    setMessage('');
  };

  return (
    <div className="chat-area-wrapper max-h-[35vh] flex flex-col justify-end items-center shrink md:shrink-[1] px-5 font-sans text-lg">
      <div className="flex flex-row h-full items-center rounded-t-md scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-slate-700 scrollbar-track-slate-800 w-[86vw] mx-auto ">
        <div
          id="chat-container"
          className="overflow-auto h-full bg-nav-gradient-dark/50 px-3 text-slate-400 shrink w-full"
        >
          {/* {messageList.length < 1 &&
            [
              'some',
              'sample',
              'messages',
              'that',
              'i',
              'can',
              'use',
              'to',
              'check',
              'rendering',
              'some',
              'sample',
              'messages',
              'that',
              'i',
              'can',
              'use',
              'to',
              'check',
              'rendering',
            ].map((msg, i) => <p key={i}>{msg}</p>)} */}
          {messageList &&
            messageList.map(({ message, timestamp, sender }) => (
              <div key={timestamp}>
                <p>
                  <span className="font-semibold">{sender} </span>
                  <span className="text-sm text-slate-600 ml-1">
                    {new Date(timestamp).toLocaleString(undefined, {
                      hour: 'numeric',
                      minute: 'numeric',
                      // second: 'numeric',
                    })}
                  </span>
                </p>
                <p>{message}</p>
              </div>
            ))}
          <div id="scroll-anchor"></div>
        </div>
      </div>
      <form onSubmit={handleMessage} className="w-full">
        <input
          className="pl-2 py-2 text-white bg-gray-900/70 border-[.5px] border-primary-dark-blue w-full rounded-b-md placeholder-slate-500 focus:outline-none focus:border-2"
          type="text"
          name="chat"
          id="chat"
          value={message}
          onChange={(evt) => setMessage(evt.target.value)}
          placeholder="Psst!"
        ></input>
      </form>
    </div>
  );
}
