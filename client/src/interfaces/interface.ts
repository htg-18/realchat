//The message is stored in this format
export interface ChatLogItem {
    user: string;
    message: string;
  }

export interface ChatsProps {
    chatLog: ChatLogItem[];
}
  