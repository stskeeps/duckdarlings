'use client';

import Image from "next/image";
import React, { useState, useEffect } from 'react';

import FullPageText from '../components/FullPageText';
import BottomText from '../components/BottomText';
import VisualNovelText from '../components/VisualNovelText';

const FullPage = () => {
  const [text, setText] = useState('');

  useEffect(() => {
    const fullText = 'Your text goes here... Here goes it.. and here it goes';

    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;

      if (index > fullText.length) {
        clearInterval(timer);
      }
    }, 5); // Adjust the interval for text loading speed

    // Cleanup function to clear interval when component unmounts
    return () => {
      clearInterval(timer);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return <FullPageText text={text} />;
};

const BottomTextPage = () => {
  let textList = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    "qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui ",
    "in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
  ]
  return <BottomText textList={textList} />;
};

const VisualNovelPage = () => {
  const text = 'Your visual novel text goes here...';
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  return <VisualNovelText text={text} options={options} />;
};

export default function Play() {
  const [text, setText] = useState('');
  const [showOptions, setShowOptions] = useState(true);
  let bg = "Scene_1_Cafe.png"
  let fullText = false
  let shortText = !fullText
  return (
    <div style={{
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
      width: '100%'
    }}>

      {showOptions && 
        <VisualNovelPage />
      }
      
      {fullText &&
        <FullPage />
      }

      {shortText &&
        <BottomTextPage />
      }

    </div>
  );
}
