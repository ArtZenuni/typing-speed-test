import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const phrases = [
  "The quick brown fox jumps over the lazy dog.",
  "Pack my box with five dozen liquor jugs.",
  "How razorback-jumping frogs can level six piqued gymnasts!",
  "The five boxing wizards jump quickly.",
  "Bright vixens jump; dozy fowl quack.",
  "Quick zephyrs blow, vexing daft Jim.",
  "Two driven jocks help fax my big quiz.",
  "Crazy Fredrick bought many very exquisite opal jewels.",
  "Jinxed wizards pluck ivy from the big quilt.",
  "Amazingly few discotheques provide jukeboxes."
];

const App = () => {
  const [sampleText, setSampleText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setSampleText(randomPhrase);
  }, []);

  useEffect(() => {
    if (userInput.length === 1 && !startTime) {
      setStartTime(new Date());
    }
  }, [userInput, startTime]);

  useEffect(() => {
    if (userInput === sampleText) {
      const endTime = new Date();
      const timeDiff = (endTime - startTime) / 1000 / 60; // in minutes
      const wordCount = sampleText.split(' ').length;
      setWpm(Math.round(wordCount / timeDiff));

      const correctChars = userInput.split('').filter((char, idx) => char === sampleText[idx]).length;
      setAccuracy(Math.round((correctChars / sampleText.length) * 100));
    }
  }, [userInput, sampleText, startTime]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const resetTest = () => {
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setSampleText(randomPhrase);
    setUserInput('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(0);
    inputRef.current.focus();
  };

  return (
    <div className="App container">
      <div className="text-center mt-5">
        <h1 className="display-4 mb-4">Typing Speed Test</h1>
        <p className="lead mb-5">{sampleText}</p>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Start typing here..."
          value={userInput}
          onChange={handleInputChange}
          ref={inputRef}
          style={{ fontSize: '18px' }}
        />
        <button className="btn btn-primary mb-3" onClick={resetTest}>
          Restart
        </button>
        {wpm > 0 && (
          <div className="mt-4">
            <p className="font-weight-bold">Words per minute: {wpm}</p>
            <p className="font-weight-bold">Accuracy: {accuracy}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
