import React from 'react';

import {
  SNAKE_HEAD,
  APPLE,
  SNAKE_BODY,
  CURRENT_DIRECTION,
  START_VOLUME,
} from '../constants';

import Modal from '../components/Modal';
import GameField from '../components/GameField';

import classes from './Game.module.css';


const Game = () => {
  const fieldRef = React.useRef();

  const [snakeHead, setSnakeHead] = React.useState(SNAKE_HEAD);
  const [snakeBodyItems, setSnakeBodyItems] = React.useState(SNAKE_BODY);
  const [direction, setDirection] = React.useState(CURRENT_DIRECTION);
  const [apple, setApple] = React.useState(APPLE);
  const [score, setScore] = React.useState(0);
  const [bestScore, setBestScore] = React.useState(0);
  const [isGameEnd, setIsGameEnd] = React.useState(false);
  const [isFirstStart, setIsFirstStart] = React.useState(true);
  const [volume, setVolume] = React.useState(START_VOLUME);
  const [customVolume, setCustomVolume] = React.useState(START_VOLUME);

  const handleOnPlayBtnClick = () => {
    fieldRef.current.focus();
    setSnakeHead(SNAKE_HEAD);
    setSnakeBodyItems(SNAKE_BODY);
    setApple(APPLE);
    setDirection(CURRENT_DIRECTION);
    setIsGameEnd(false);
    setIsFirstStart(false);
    setScore(0);
  };

  return (
    <div
      className={classes.game}
    >
      <div className={classes.wrapper}>
        <h1>SNAKE GAME</h1>
        <GameField
          snakeHead={snakeHead}
          setSnakeHead={setSnakeHead}
          snakeBodyItems={snakeBodyItems}
          setSnakeBodyItems={setSnakeBodyItems}
          direction={direction}
          setDirection={setDirection}
          apple={apple}
          setApple={setApple}
          score={score}
          setScore={setScore}
          bestScore={bestScore}
          isFirstStart={isFirstStart}
          customVolume={customVolume}
          volume={volume}
          setVolume={setVolume}
          isGameEnd={isGameEnd}
          setIsGameEnd={setIsGameEnd}
          fieldRef={fieldRef}
        />
      </div>

      {isGameEnd !== isFirstStart && (
        <Modal
          volume={volume}
          setVolume={setVolume}
          handleOnPlayBtnClick={handleOnPlayBtnClick}
          isGameEnd={isGameEnd}
          score={score}
          bestScore={bestScore}
          setBestScore={setBestScore}
          setCustomVolume={setCustomVolume}
        />
      )}
    </div>
  );
};

export default Game;
