import React from 'react';

import {
  FIELD_HEIGHT,
  FIELD_WIDTH,
  STEP,
  SNAKE_HEAD,
  APPLE,
  SNAKE_BODY,
  SPEED,
  CURRENT_DIRECTION,
  UP_KEYCODE,
  DOWN_KEYCODE,
  LEFT_KEYCODE,
  RIGHT_KEYCODE,
  UP_DIRECTION,
  DOWN_DIRECTION,
  LEFT_DIRECTION,
  RIGHT_DIRECTION,
  START_VOLUME,
} from './constants';
import { sound } from './utils/sound';
import appleImg from './assets/img/apple.svg';
import closeImg from './assets/img/close.svg';
import deadSound from './assets/sounds/dead.mp3';
import eatSound from './assets/sounds/eat.mp3';
import moveSound from './assets/sounds/move.mp3';

import Modal from './components/Modal';
import Scores from './components/Scores';
import Volume from './components/Volume';

import './App.css';

const App = () => {
  const style = {
    field: {
      width: `${FIELD_WIDTH}px`,
      height: `${FIELD_HEIGHT}px`,
    },
  };

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
        left: getRandom(FIELD_WIDTH, STEP),
        top: getRandom(FIELD_HEIGHT, STEP),
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
        snakeHead.left > FIELD_WIDTH - STEP ||
        snakeHead.top > FIELD_HEIGHT - STEP
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
      if (isFirstStart === isGameEnd) {
        moveSnake();
      }
      if (checkCollisionWithBoundaries() || checkSelfCollision()) {
        if (!isGameEnd) {
          sound.playSound(deadSound, volume, true);
        }
        setIsGameEnd(true);
        clearInterval(interval);
      }
    }, SPEED);

    return () => clearInterval(interval);
  }, [
    direction,
    snakeHead,
    snakeBodyItems,
    apple,
    score,
    isGameEnd,
    isFirstStart,
    volume,
  ]);

  const handlerOnKeyDown = (event) => {
    sound.playSound(moveSound, volume);
    switch (event.keyCode) {
      case UP_KEYCODE:
        if (direction !== DOWN_DIRECTION) {
          setDirection(UP_DIRECTION);
        }
        break;
      case DOWN_KEYCODE:
        if (direction !== UP_DIRECTION) {
          setDirection(DOWN_DIRECTION);
        }
        break;
      case LEFT_KEYCODE:
        if (direction !== RIGHT_DIRECTION) {
          setDirection(LEFT_DIRECTION);
        }
        break;
      case RIGHT_KEYCODE:
        if (direction !== LEFT_DIRECTION) {
          setDirection(RIGHT_DIRECTION);
        }
        break;
      default:
        setDirection(RIGHT_DIRECTION);
    }
  };

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
  const handlerOnCloseClick = () => {
    setIsGameEnd(true);
  };

  return (
    <div
      ref={fieldRef}
      className="game"
      role="button"
      tabIndex={0}
      onKeyDown={(event) => handlerOnKeyDown(event)}
    >
      <div className="wrapper">
        <h1>SNAKE GAME</h1>
        <div className="container">
          <div className="toolbar">
            <Scores score={score} bestScore={bestScore} />
            <div className="right">
              <Volume
                volume={volume}
                setVolume={setVolume}
                fieldRef={fieldRef}
              />
              <div className="close toolbar_item" onClick={handlerOnCloseClick}>
                <img src={closeImg} alt="close" />
              </div>
            </div>
          </div>

          <div style={style.field} className="game_field">
            <div
              className="apple game_item"
              style={{ left: `${apple.left}px`, top: `${apple.top}px` }}
            >
              <img src={appleImg} alt="apple" />
            </div>
            <div className="snake">
              <div
                className="snake_head game_item"
                style={{
                  left: `${snakeHead.left}px`,
                  top: `${snakeHead.top}px`,
                }}
              ></div>

              {snakeBodyItems.map((item, index) => (
                <div
                  key={index + '' + item.left + item.top}
                  className="snake_body game_item"
                  style={{
                    left: `${item.left}px`,
                    top: `${item.top}px`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isGameEnd !== isFirstStart && (
        <Modal
          handleOnPlayBtnClick={handleOnPlayBtnClick}
          isGameEnd={isGameEnd}
          score={score}
          bestScore={bestScore}
          setBestScore={setBestScore}
        />
      )}
    </div>
  );
};

export default App;
