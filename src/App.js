import React from 'react';

import {
  FIELD_LENGTH,
  FIELD_WIDTH,
  SNAKE_HEAD,
  APPLE,
  SNAKE_BODY,
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
      height: `${FIELD_LENGTH}px`,
    },
  };

  return (
    <div>
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
                  left: `${SNAKE_HEAD.left}px`,
                  top: `${SNAKE_HEAD.top}px`,
                }}
              ></div>

              {SNAKE_BODY.map((item, index) => (
                <div
                  key={index}
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
