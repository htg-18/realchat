//The message is stored in this format
export interface ChatLogItem {
    user: string;
    message: string;
  }

export interface ChatsProps {
    chatLog: ChatLogItem[];
}

export interface KeywordButtonsProps {
    keywords: string[];
    onKeywordClick: (keyword: string) => void;
  }
  