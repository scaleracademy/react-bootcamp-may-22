import WordRow from './components/WordRow';
import React, { useState } from 'react';
import './App.css';
import { checkGuess } from './utils/word-checker';

function App() {
  const WordOfTheDay = 'FORGO'
  const [guesses, setGuesses] = useState([]);
  const [currentWord, setCurrentWord] = useState('');
  const [gameState, setGameState] = useState('running');

  const backspace = () => {
    setCurrentWord((prev) => prev && prev.slice(0, -1));
  }
  const enter = () => {
    if (currentWord.length == 5) {
      setGuesses((prev) => [...prev, currentWord])
      setCurrentWord('');

      const result = checkGuess(currentWord, WordOfTheDay);
      if (
        Object.values(result).every(v => v === 'green') && 
        Object.values(result).length == 5
      ) {
        setGameState('won')
      } else if (guesses.length == 4) {
        setGameState('lost')
      }
    }
  }
  const word = (letter) => {
    setCurrentWord((prev) => prev.length == 5 ? prev : prev + letter.toUpperCase());
  }

  const handleKeyDown = e => {
    let pressedKey = String(e.key)
    if (pressedKey === "Backspace") {
      backspace();
      return
    }

    if (pressedKey === "Enter") {
      enter();
      return
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
      return
    } else {
      word(pressedKey)
    }
  }
  React.useEffect(() => {
    window.addEventListener('keyup', handleKeyDown);

    return () => {
      window.removeEventListener('keyup', handleKeyDown);
    };
  }, [currentWord, gameState]);

  return (
    <div className="App">
      <header className="App-header">
        {guesses.map((guess) => (
          <WordRow word={guess} result={checkGuess(guess, WordOfTheDay)} />
        ))}
        {gameState === 'running' && <WordRow word={currentWord} />}
      </header>
    </div>
  );
}

export default App;
