import React, { useEffect, useState, useRef } from 'react';
import Chats from './Chats';
import { IoIosSend } from 'react-icons/io';

interface ChatMessage {
  user: string;
  message: string;
}

const Chatbox: React.FC = () => {
  const [message, setMessage] = useState('');
  const localchat: any = localStorage.getItem('chatLog');
  const parsedChatLog = localchat ? JSON.parse(localchat) : [];
  
  const [chatLog, setChatLog] = useState<ChatMessage[]>(parsedChatLog);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('Fetching chat log from local storage.  1 ..');
    const storedChatLog = localStorage.getItem('chatLog');
    if (storedChatLog) {
      setChatLog(JSON.parse(storedChatLog));
    }
  }, []);

  useEffect(() => {
    console.log('Storing chat log to local storage.  2..');
    localStorage.setItem('chatLog', JSON.stringify(chatLog));

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatLog]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('https://chat-backend-gold.vercel.app/response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword: message }),
      });

      if (response.ok) {
        const responseData = await response.json();
        setChatLog((prev) => [
          ...prev,
          { user: 'me', message },
          { user: 'chat', message: responseData.response },
        ]);
        setMessage('');
      } else {
        console.error('API call failed');
      }
    } catch (error) {
      console.error('Error during API call:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  console.log('Rendering component with chat log:', chatLog);

  return (
    <div className='flex flex-col min-h-screen bg-[#343541] w-full p-12'>
      <div
        ref={chatContainerRef}
        className='flex-1 overflow-y-auto'
        style={{ maxHeight: '70vh', scrollbarWidth: 'thin', scrollbarColor: '#ffffff #343541' }}
      >
        <Chats chatLog={chatLog} />
      </div>
      <form
        onSubmit={handleSubmit}
        style={{ border: '0.5px solid white ', borderRadius: '12px' }}
        className='fixed bottom-6  p-2 pl-4 pr-4 flex items-center w-[70%] bg-zinc-700 justify-between '
      >
        <input
          className='w-[70%] p-2 border rounded bg-zinc-700 outline-none border-none text-white'
          placeholder='Message ChatterBotX...'
          value={message}
          onChange={handleChange}
        />
        <IoIosSend
          onClick={handleSubmit}
          className='ml-2 cursor-pointer rounded-full hover:bg-zinc-800 p-1'
          size={34}
          color='#ffffff'
        />
      </form>
      <style>
        {`
          /* Style the scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }

          ::-webkit-scrollbar-thumb {
            background-color: #4a5568; /* thumb color */
            border-radius: 4px;
          }

          ::-webkit-scrollbar-track {
            background-color: #343541; /* track color */
          }
        `}
      </style>
    </div>
  );
};

export default Chatbox;
