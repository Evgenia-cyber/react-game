import React from 'react';

import {
  STEP,
  UP_KEYCODE,
  DOWN_KEYCODE,
  LEFT_KEYCODE,
  RIGHT_KEYCODE,
} from '../constants';
import { sound } from '../utils/sound';
import { changeDirection } from '../utils/functions';
import appleImg from '../assets/img/apple.svg';
import closeImg from '../assets/img/close.svg';
import deadSound from '../assets/sounds/dead.mp3';
import eatSound from '../assets/sounds/eat.mp3';
import moveSound from '../assets/sounds/move.mp3';

import Scores from '../components/Scores';
import Volume from '../components/Volume';

import classes from './GameField.module.css';

const GameField = ({
  snakeHead,
  setSnakeHead,
  snakeBodyItems,
  setSnakeBodyItems,
  direction,
  setDirection,
  apple,
  setApple,
  score,
  setScore,
  bestScore,
  isFirstStart,
  customVolume,
  volume,
  setVolume,
  isGameEnd,
  setIsGameEnd,
  fieldRef,
  customSettings,
}) => {
  const style = {
    field: {
      width: `${customSettings.widthInCells * STEP}px`,
      height: `${customSettings.heightInCells * STEP}px`,
    },
  };
const field_width = customSettings.widthInCells*STEP;
const field_height = customSettings.heightInCells*STEP;
  React.useEffect(() => {
    const getRandom = (max, step) => {
      return Math.floor(Math.random() * (max / step)) * step;
    };

    const checkIsAppleCreatedInSnakeBody = (newApple) => {
      const snake = [...snakeBodyItems];
      snake.unshift(snakeHead);
      return snake.some(
        (item) => item.left === newApple.left && item.top === newApple.top,
      );
    };
    const createApple = () => {
      let newApple = {
        left: getRandom(field_width, STEP),
        top: getRandom(field_height, STEP),
      };
      if (checkIsAppleCreatedInSnakeBody(newApple)) {
        newApple = createApple();
      }
      return newApple;
    };

    const checkSelfCollision = () => {
      return snakeBodyItems.some(
        (item) => item.left === snakeHead.left && item.top === snakeHead.top,
      );
    };
    const checkCollisionWithBoundaries = () => {
      return (
        snakeHead.left < 0 ||
        snakeHead.top < 0 ||
        snakeHead.left > field_width - STEP ||
        snakeHead.top > field_height - STEP
      );
    };

    const moveSnake = () => {
      setSnakeBodyItems((snakeBodyItems) => {
        let newSnakeBody = [...snakeBodyItems];
        const isAppleEaten =
          snakeHead.left === apple.left && snakeHead.top === apple.top;
        if (isAppleEaten) {
          sound.playSound(eatSound, volume);
          setScore(score + 1);
          const newApple = createApple();
          setApple(newApple);
        } else {
          newSnakeBody.pop();
        }
        newSnakeBody.unshift(snakeHead);
        return newSnakeBody;
      });
      setSnakeHead((snakeHead) => ({
        left: snakeHead.left + direction.left,
        top: snakeHead.top + direction.top,
      }));
    };

    const interval = setInterval(() => {
      if (checkCollisionWithBoundaries() || checkSelfCollision()) {
        if (!isGameEnd) {
          sound.playSound(deadSound, volume, true);
        }
        setIsGameEnd(true);
        clearInterval(interval);
      } else {
        if (isFirstStart === isGameEnd) {
          moveSnake();
        }
      }
    }, customSettings.speed);

    return () => clearInterval(interval);
  }, [direction, snakeHead, snakeBodyItems, apple, isFirstStart]);

  const handlerOnKeyDown = (event) => {
    const isUp = event.keyCode === UP_KEYCODE;
    const isDown = event.keyCode === DOWN_KEYCODE;
    const isLeft = event.keyCode === LEFT_KEYCODE;
    const isRight = event.keyCode === RIGHT_KEYCODE;
    if (isUp || isDown || isLeft || isRight) {
      sound.playSound(moveSound, volume);
    }
    changeDirection(direction, setDirection, isUp, isDown, isLeft, isRight);
  };

  const handlerOnCloseClick = () => {
    setIsGameEnd(true);
  };

const colorClass= customSettings.color ===
  'green'
    ? classes.green
    : customSettings.color === 'blue'
    ? classes.blue
    : classes.red;

  return (
    <div
      className={classes.container}
      ref={fieldRef}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => handlerOnKeyDown(event)}
    >
      <div className={classes.toolbar}>
        <Scores score={score} bestScore={bestScore} />
        <div className={classes.right}>
          <Volume
            volume={volume}
            setVolume={setVolume}
            customVolume={customVolume}
          />
          <div
            className={classes.close + ' ' + classes.toolbar_item}
            onClick={handlerOnCloseClick}
          >
            <img src={closeImg} alt="close" />
          </div>
        </div>
      </div>

      <div style={style.field} className={classes.game_field}>
        <div
          className={classes.apple + ' ' + classes.game_item}
          style={{ left: `${apple.left}px`, top: `${apple.top}px` }}
        >
          <img src={appleImg} alt="apple" />
        </div>
        <div className={classes.snake}>
          <div
            className={
              classes.snake_head +
                ' ' +
                classes.game_item +
                ' ' +colorClass
            }
            style={{
              left: `${snakeHead.left}px`,
              top: `${snakeHead.top}px`,
            }}
          ></div>

          {snakeBodyItems.map((item, index) => (
            <div
              key={index + '' + item.left + item.top}
              className={classes.snake_body + ' ' + classes.game_item+' '+colorClass}
              style={{
                left: `${item.left}px`,
                top: `${item.top}px`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameField;
