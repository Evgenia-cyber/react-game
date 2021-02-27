import React from 'react';

import {
  SNAKE_HEAD,
  APPLE,
  SNAKE_BODY,
  CURRENT_DIRECTION,
  RIGHT_DIRECTION,
  LEFT_DIRECTION,
  DOWN_DIRECTION,
  UP_DIRECTION,
  START_VOLUME,
} from '../constants';
import { sound } from '../utils/sound';
import moveSound from '../assets/sounds/move.mp3';

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
  const [touchStart, setTouchStart] = React.useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = React.useState({ x: 0, y: 0 });

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
  
  React.useEffect(() => {
    const dif = { x: touchEnd.x - touchStart.x, y: touchEnd.y - touchStart.y };
    if (Math.abs(dif.x) > Math.abs(dif.y)) {
      if (dif.x > 0) {
        if (direction !== LEFT_DIRECTION) {
          setDirection(RIGHT_DIRECTION);
        }
      } else {
        if (direction !== RIGHT_DIRECTION) {
          setDirection(LEFT_DIRECTION);
        }
      }
    } else {
      if (dif.y > 0) {
        if (direction !== UP_DIRECTION) {
          setDirection(DOWN_DIRECTION);
        }
      } else {
        if (direction !== DOWN_DIRECTION) {
          setDirection(UP_DIRECTION);
        }
      }
    }
  }, [touchStart, touchEnd]);

  const handlerOnTouchStart = (event) => {
    sound.playSound(moveSound, volume);
    const touch = {
      x: event.changedTouches[0].clientX,
      y: event.changedTouches[0].clientY,
    };
    setTouchStart(touch);
  };

  const handlerOnTouchEnd = (event) => {
    const touch = {
      x: event.changedTouches[0].clientX,
      y: event.changedTouches[0].clientY,
    };
    setTouchEnd(touch);
  };

  return (
    <div>
      <div
        className={classes.wrapper}
        onTouchStart={handlerOnTouchStart}
        onTouchEnd={handlerOnTouchEnd}
      >
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
