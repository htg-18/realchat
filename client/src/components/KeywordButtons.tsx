
import React from 'react';
import { KeywordButtonsProps } from '../interfaces/interface';

// interface KeywordButtonsProps {
//   keywords: string[];
//   onKeywordClick: (keyword: string) => void;
// }

const KeywordButtons: React.FC<KeywordButtonsProps> = ({ keywords, onKeywordClick }) => {
  return (
    <div className='flex space-x-2 pb-20'>
      {keywords.map((keyword) => (
        <button
          key={keyword}
          className='rounded-[12px] h-8 px-3 hover:bg-zinc-600'
          style={{ border: '0.8px solid white' }}
          onClick={() => {
            onKeywordClick(keyword);
          }}
        >
          {keyword}
        </button>
      ))}
    </div>
  );
};

export default KeywordButtons;
