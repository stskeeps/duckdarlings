'use client';

import Image from "next/image";
import React, { useState, useEffect } from 'react';

import FullPageText from '../components/FullPageText';
import BottomText from '../components/BottomText';
import VisualNovelText from '../components/VisualNovelText';
import TextBoxInput from '../components/TextBoxInput';


const FullPage = ( { fullPageText } : { fullPageText : string } ) => {
  const [text, setText] = useState('');

  useEffect(() => {
    const fullText = fullPageText;

    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;

      if (index > fullText.length) {
        clearInterval(timer);
      }
    }, 20); // Adjust the interval for text loading speed

    // Cleanup function to clear interval when component unmounts
    return () => {
      clearInterval(timer);
    };
  }, [fullPageText]); // Empty dependency array ensures the effect runs only once

  return <FullPageText text={text} />;
};

const BottomTextPage = ( { bottomText, color } : { bottomText : string, color: string } ) => {
  const [text, setText] = useState('');

  useEffect(() => {
    const fullText = bottomText;

    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;

      if (index > fullText.length) {
        clearInterval(timer);
      }
    }, 20); // Adjust the interval for text loading speed

    // Cleanup function to clear interval when component unmounts
    return () => {
      clearInterval(timer);
    };
  }, [bottomText]); // Empty dependency array ensures the effect runs only once

 
  return <BottomText text={text} color={color} />;
};

const VisualNovelPage = ({ opts, buttonCallback } : { opts: string[], buttonCallback: any } ) => {
  let options = (['Option 1', 'Option 2', 'Option 3']);

  if (opts) {
    options = (opts)
  }

  return <VisualNovelText options={options} buttonCallback={buttonCallback} />;
};

export default function Play() {
  const [bg, setBg] = useState(1);
  const [text, setText] = useState('');
  const [options, setOptions] = useState([]);
  const [sceneType, setSceneType] = useState(0);
  const [dialog, setDialog] = useState(0)
  const [penguin, setPenguin] = useState("")
  const [name, setName] = useState("")
  const [reply, setReply] = useState("")
  const [color, setColor] = useState(0)
  const [genre, setGenre] = useState("")
  const [locate, setLocate] = useState("")



  async function getNextStep() {
    try {
      const res = await fetch(`/api/getNextDialog?current_dialog=${dialog}`);
      const data = await res.json();

      if (res.ok) {
        data.LLM && setColor(1)
        !data.LLM && setColor(0)
        data.scene && setBg(data.scene)
        data.text && setText(data.text.replaceAll('Y/N', name).replaceAll('[genre choice]', genre).replaceAll('[location choice]', locate))
        data.options && setOptions(data.options)
        let pengTemp = ""
        data.showPenguin && (pengTemp = `/Penguin_Scene_${data.showPenguin}.png`)
        setPenguin(pengTemp)
        setSceneType(data.type) 
        setDialog(dialog + 1)
        console.log("dialog", dialog)
      } else {
        console.log("error")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getNextStep() // This will be executed when the state changes
  }, [name, reply]);

  async function getTextReply(value: string) {
    console.log(dialog)
    console.log(value)
    if (dialog == 2) {
      setName(value)
      console.log("n", name)
    }
  }

  async function getButtonReply(value: string) {
    setReply(value)
    console.log("reply")
    console.log(value)
    if (dialog == 73) {
      setGenre(value)
      console.log("n", value)
    }
    if (dialog == 77) {
      setLocate(value)
      console.log("n", value)
    }
  }

  return (
    
      <div style={{
        backgroundImage: `url(Scene_${(bg)}.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%'
      }}>

      
      {penguin && 
        <Image className="peng" src={penguin} alt="" width={600} height={600} /> 
      }   

      {(sceneType == 2) && 
        <VisualNovelPage opts={options} buttonCallback={getButtonReply} />
      }
      
      {(sceneType == 0 || sceneType == 3) &&
        <FullPage fullPageText={text} />
      }

      {(sceneType == 1 || sceneType == 2) &&
        <BottomTextPage bottomText={text} color={color==1 ? "#E85A4F": "#556688"} />
      }

      {(sceneType == 3) &&
        <TextBoxInput callback={getTextReply}/>
      }

      {(sceneType != 2 && sceneType != 3) &&
        <button className="next-dialog"
        onClick={ () => getNextStep()}>
          Next
      </button>}
    </div>
  );
}
