

interface ChatLogItem {
    user: string;
    message: string;
}

interface ChatsProps {
    chatLog: ChatLogItem[];
}

const Chats: React.FC<ChatsProps> = ({ chatLog }) => {
    return (
        <div className='flex flex-col gap-6'>
        {chatLog && chatLog.map((chat, index) =>{
            return(
                <div className='flex items-center gap-5' key={index}>
                    <div className={`${chat.user==="me"?"bg-slate-600":"bg-teal-800"} h-9 w-9 flex items-center justify-center text-stone-900`} style={{ borderRadius: "50%" }}>
                      {chat.user==="me"?"Me":"C"}
                    </div>
                    <div>
                      {chat.message}
                    </div>
                </div>
            )
        })}
        <div className='flex items-center'>
          

            {/* <div className='bg-white h-9 w-9' style={{ borderRadius: "50%" }}></div>
            <div className='pl-4'>
                Hello world!
            </div> */}
        </div>
        </div>
    )
}

export default Chats