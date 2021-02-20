import React from 'react';

import {
  FIELD_HEIGHT,
  FIELD_WIDTH,
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
} from './constants';
import './App.css';
import appleImg from './assets/img/apple.svg';
import awardImg from './assets/img/award.svg';
import volumeImg from './assets/img/sound.svg';
import closeImg from './assets/img/close.svg';

const App = () => {
  const style = {
    field: {
      width: `${FIELD_WIDTH}px`,
      height: `${FIELD_HEIGHT}px`,
    },
  };

  const [snakeHead, setSnakeHead] = React.useState(SNAKE_HEAD);
  const [snakeBodyItems, setSnakeBodyItems] = React.useState(SNAKE_BODY);
  const [direction, setDirection] = React.useState(CURRENT_DIRECTION);

  React.useEffect(() => {
    const moveSnake = (currentDirection) => {
      setSnakeBodyItems((snakeBodyItems) => {
        let newSnakeBody = [...snakeBodyItems];
        newSnakeBody.pop();
        newSnakeBody.unshift(snakeHead);
        // console.log('newSnakeBody', newSnakeBody);
        return newSnakeBody;
      });
      setSnakeHead((snakeHead) => ({
        left: snakeHead.left + currentDirection.left,
        top: snakeHead.top + currentDirection.top,
      }));

      // setSnakeHead((snakeHead) => {
      //   console.log('snakeHead', snakeHead);
      //   const newSnakeHead = {
      //     left: snakeHead.left + currentDirection.left,
      //     top: snakeHead.top + currentDirection.top,
      //   };
      //   console.log('newSnakeHead', newSnakeHead);
      //   return newSnakeHead;
      // });
    };
    const interval = setInterval(() => {
      moveSnake(direction);//+++++++++++++++++++++++++++++++++++++++
    }, SPEED);
    return () => clearInterval(interval);
  }, [direction, snakeHead]);
  const handlerOnKeyDown = (event) => {
    switch (event.keyCode) {
      case UP_KEYCODE:
        setDirection(UP_DIRECTION);
        break;
      case DOWN_KEYCODE:
        setDirection(DOWN_DIRECTION);
        break;
      case LEFT_KEYCODE:
        setDirection(LEFT_DIRECTION);
        break;
      case RIGHT_KEYCODE:
        setDirection(RIGHT_DIRECTION);
        break;
      default:
        setDirection(RIGHT_DIRECTION);
    }
  };

  return (
    <div
      className="game"
      role="button"
      tabIndex={0}
      onKeyDown={(event) => handlerOnKeyDown(event)}
      //??????для фокуса нужнен клик по div - см., достаточно ли клика по кнопке PLAY в модальном окне
    >
      <div className="wrapper">
        <h1>SNAKE GAME</h1>
        <div className="container">
          <div className="toolbar">
            <div className="left">
              <div className="toolbar_item">
                <img className="score_img" src={appleImg} alt="score" />
                <span className="score">1</span>
              </div>
              <div className="toolbar_item">
                <img
                  className="bestscore_img"
                  src={awardImg}
                  alt="best score"
                />
                <span className="score">100</span>
              </div>
            </div>
            <div className="right">
              <div className="volume toolbar_item">
                <img src={volumeImg} alt="volume" />
                {/* <div className="volume-control">
                  <span className="volume-control_line"></span>
                  <span className="volume-control_slider"></span>
                </div> */}
              </div>
              <div className="close toolbar_item">
                <img src={closeImg} alt="close" />
              </div>
            </div>
          </div>

          <div style={style.field} className="game_field">
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

            <div
              className="apple game_item"
              style={{ left: `${APPLE.left}px`, top: `${APPLE.top}px` }}
            >
              <img src={appleImg} alt="apple" />
            </div>
          </div>
        </div>
      </div>
      {/* /////// */}
      {/* <div className="modal active">
        <button className="play_btn"><span>PLAY</span></button>
      </div> */}
      {/* /////// */}
    </div>
  );
};

export default App;
