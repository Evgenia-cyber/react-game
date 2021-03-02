import React from 'react';

import {
  SNAKE_HEAD,
  APPLE,
  SNAKE_BODY,
  CURRENT_DIRECTION,
  START_VOLUME,
  SPEED,
  COLOR,
  FIELD_WIDTH,
  FIELD_HEIGHT,
  STEP,
} from '../constants';
import { sound } from '../utils/sound';
import { changeDirection } from '../utils/functions';
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
    const [customSettings, setCustomSettings] = React.useState({
      widthInCells: FIELD_WIDTH / STEP,
      heightInCells: FIELD_HEIGHT / STEP,
      color: COLOR,
      speed: SPEED,
    });

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

  const handlerOnTouchStart = (event) => {
    sound.playSound(moveSound, volume);
    setTouchStart({
      x: event.changedTouches[0].clientX,
      y: event.changedTouches[0].clientY,
    });
  };

  const handlerOnTouchEnd = (event) => {
    const dif = {
      x: event.changedTouches[0].clientX - touchStart.x,
      y: event.changedTouches[0].clientY - touchStart.y,
    };
    const isVerticalMove = Math.abs(dif.x) < Math.abs(dif.y);
    const isUp = isVerticalMove && dif.y < 0;
    const isDown = isVerticalMove && dif.y > 0;
    const isLeft = !isVerticalMove && dif.x < 0;
    const isRight = !isVerticalMove && dif.x > 0;
    changeDirection(direction, setDirection, isUp, isDown, isLeft, isRight);
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
          customSettings={customSettings}
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
          customSettings={customSettings} setCustomSettings={setCustomSettings}
        />
      )}
    </div>
  );
};

export default Game;
