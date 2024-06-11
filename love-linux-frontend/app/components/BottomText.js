// components/BottomText.js
import React, { useState, useEffect } from 'react';

const BottomText = ({ textList }) => {
  const [text, setText] = useState('');
  const [step, setStep] = useState(0);

  let updateText = () => {
    let fullText = textList[step];

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
  }

  useEffect(updateText, [step]); // Empty dependency array ensures the effect runs only once

  function forceRerender() {
    if (step +1 < textList.length){
      console.log
      setStep(step+1)
      setText(textList[step]);
    }
  }


  return (
    <div className="bottom-text">
      <div className="text-wrapper">
        {text}
      </div>
      <button 
        className='next-text'
        onClick={() => { 
          forceRerender()
        } }>
        Click to Continue
      </button>
    </div>
  );
};

export default BottomText;
