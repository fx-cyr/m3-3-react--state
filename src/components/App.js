import React, { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import Button from "./Button";
import Deadman from "./DeadMan";
import DeadLetters from "./DeadLetters";
import TheWord from "./TheWord";
import Keyboard from "./Keyboard";
import GameOverModal from "./GameOverModal";
import words from "../data/words.json";

import { colors, contentWidth } from "./GlobalStyles";
import LetterKey from "./LetterKey";

const initialGameState = { started: false, over: false, win: false };
const App = () => {
  const [game, setGame] = useState(initialGameState);
  const [word, setWord] = useState({ str: "", revealed: [] });
  const [wrongGuesses, setWrongGuesses] = useState([]);
  const [usedLetters, setUsedLetters] = useState([]);
  const buttonState = () => {
    if (game.started && game.over) {
      return "Pause";
    }
    {
      return "Start";
    }
  };
  const getNewWord = () => {
    let newWord = words[Math.floor(Math.random() * words.length)];
    let revealed = [];
    for (let i = 0; i < newWord.length; i++) {
      revealed.push("");
    }
    setWord({ str: newWord, revealed: revealed });
  };

  const handleStart = () => {
    setGame({ ...game, started: !game.started, over: !game.over });
    if (word.str === "") {
      getNewWord();
    }
  };

  const handleGuess = (letter) => {
    let splitWord = word.str.split("");
    console.log(splitWord);
    console.log(letter);
    if (splitWord.includes(letter)) {
      splitWord.forEach((w, index) => {
        if (letter === w) {
          const newWord = { ...word };
          newWord.revealed[index] = letter;
          setWord(newWord);
        }
      });
    }
    {
      setWrongGuesses(wrongGuesses.concat([letter]));
    }
    setUsedLetters(usedLetters.concat([letter]));
  };

  const handleReset = () => {
    handleStart();
    getNewWord();
    setUsedLetters([]);
    setWrongGuesses([]);
  };
  console.log(wrongGuesses);

  const handleEndGame = (win) => {
    let splitWord = word.str.split("");
    if (splitWord !== word.revealed) {
    }
    alert(`Game Over! You ${win ? "win" : "lose"}`);
  };

  return (
    <Wrapper>
      {/* <GameOverModal /> */}
      <Header />
      <Nav>
        <Button onClickFunc={handleStart}>{buttonState()}</Button>
        <Button onClickFunc={handleReset}>Reset</Button>
      </Nav>
      {
        (game.started,
        game.over && (
          <>
            <Container>
              <Deadman />
              <RightColumn>
                <DeadLetters wrongGuesses={wrongGuesses} />
                <TheWord word={word} handleGuess={handleGuess} />
              </RightColumn>
            </Container>
            <Keyboard
              usedLetters={usedLetters}
              handleGuess={handleGuess}
              handleEndGame={handleEndGame}
            />
          </>
        ))
      }
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${colors.blue};
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  height: 100vh;
  padding: 0 0 64px 0;
`;
const Nav = styled.div`
  max-width: ${contentWidth};
  display: flex;
  height: 80px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${contentWidth};
  min-width: 320px;
  position: relative;
  padding: 20px 0;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;
const RightColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
`;

export default App;
