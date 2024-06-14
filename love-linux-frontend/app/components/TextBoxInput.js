// components/FullPageText.js

import React, { useState, useEffect } from 'react';


const TextBoxInput = ({ callback }) => {

  const [text, setText] = useState('');

  function handleTextChange(e) {
    setText(e.target.value)
  }

  return (
  <div className="submit-text"> 
    <input 
      type="text" 
      className="text-input" 
      onChange={handleTextChange} /> 
    <button
      className="button-color"
      onClick={ () => callback(text) }  
    >
        Ok
    </button>
  </div>
  )
};

export default TextBoxInput;
  