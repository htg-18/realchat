import { useEffect, useState, useRef } from 'react';
import Chats from './Chats';
import { IoIosSend } from 'react-icons/io';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Default from './Default';
import KeywordButtons from './KeywordButtons';

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
    // console.log('Fetching chat log from local storage.  1 ..');
    const storedChatLog = localStorage.getItem('chatLog');
    if (storedChatLog) {
      setChatLog(JSON.parse(storedChatLog));
    }
  }, []);

  useEffect(() => {
    // console.log('Storing chat log to local storage.  2..');
    
    localStorage.setItem('chatLog', JSON.stringify(chatLog));

    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatLog]);

  const [loading,setLoading] =useState<boolean>(false)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(message==="") return false
    try {
      setLoading(true);
      setChatLog((prev) => [...prev, { user: 'me', message }]);
  
      const response = await fetch('http://localhost:3000/response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword: message }),
      });
  
      if (response.ok) {
        const responseData = await response.json();
  
        // Wait for 1 second before adding the chat's response
        setTimeout(() => {
          
          setChatLog((prev) => [
            ...prev,
            { user: 'chat', message: responseData.response },
          ]);
          setMessage('');
        }, 500);
      } else {
        // console.error('API call failed');
        toast.error('API call failed', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
    } catch (error) {
      // console.error('Error during API call:', error);
      toast.error('Error during API call', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }finally {
      setLoading(false);
    }
  };
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleClear = () => {
    setChatLog([]);
    localStorage.setItem('chatLog', JSON.stringify([]));
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const handleKeywordClick = async (keyword: string) => {
    setMessage(keyword);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const shouldRenderDefaultAndKeywordButtons = window.innerWidth > 700;
  return (
    <div className='flex flex-col min-h-screen bg-[#343541] w-full p-12'>
      {chatLog.length>0 && 
      <button 
      className='rounded-[12px] h-10 w-[180px] hover:bg-zinc-600 m-auto mt-3 mb-3' style={{border: '0.8px solid white'}}
      onClick={handleClear}>Clear Chats</button>}
      {chatLog.length===0 && shouldRenderDefaultAndKeywordButtons&& <Default/>}
      
      <div
        ref={chatContainerRef}
        className=' overflow-y-auto'
        style={{ maxHeight: '70vh', scrollbarWidth: 'thin', scrollbarColor: '#ffffff #343541' }}
      >
        <Chats chatLog={chatLog} />
      </div>
      {chatLog.length==0 && shouldRenderDefaultAndKeywordButtons && <KeywordButtons keywords={['Greeting', 'Weather', 'News', 'Help','Anime','Movie','Food']} onKeywordClick={handleKeywordClick} />}
      <form
        onSubmit={handleSubmit}
        style={{ border: '0.5px solid white ', borderRadius: '12px' }}
        className='fixed bottom-6  p-2 pl-4 pr-4 flex items-center w-[70%] bg-zinc-700 justify-between '
      >
       
        <input
          ref={inputRef}
          className='w-[70%] p-2 border rounded bg-zinc-700 outline-none border-none text-white'
          placeholder='Message ChatterBotX...'
          value={message}
          onChange={handleChange}
          disabled={loading}
        />
        
        {!loading && <IoIosSend
          onClick={handleSubmit}
          className={`ml-2 cursor-pointer rounded-full hover:bg-zinc-800 p-1 `}
          size={34}
          color='#ffffff'
        />}
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

