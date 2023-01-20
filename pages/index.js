import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import { useState } from 'react';

const Home = () => {
  {/* function for user input*/}
  const [userInput, setUserInput] = useState('');
  {/* connect api to generate button */}
  const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}
  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };
  return (
    <div className="root">
      <Head>
        <title>Medium Story Generator</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Become a Medium Guru</h1>
          </div>
          <div className="header-subtitle">
            <h2>Put in your title below and we will do the rest.</h2>
          </div>
        </div>
<div className="prompt-container">
  {/*user input area*/}
  <textarea
    placeholder="How To Get Started On Blockchain"
    className="prompt-box"
    value={userInput}
    onChange={onUserChangedText}
  />
  {/* button to generate medium post*/}
  <div className="prompt-buttons">
    {/*add call generate endpoint to buton's onClick event*/}
    <a className={isGenerating ? 'generate-button loading' : 'generate-button'}
    onClick={callGenerateEndpoint}>
      <div className="generate">
      {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
      </div>
    </a>
  </div>
  {/* add area for output from API */}
  {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Output</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
  </div>
)}
</div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
