import React from 'react';

import classes from './Modal.module.css';
import Scores from './Scores';

const Modal = ({ handleOnPlayBtnClick, isGameEnd ,score}) => {
  return (
    <div className={classes.modal + ' ' + classes.active}>
      {isGameEnd ? <h2>GAME IS OVER</h2>:<h2>START GAME</h2>}
      <Scores score={score}/>
      <button className={classes.play_btn}>
        <span onClick={handleOnPlayBtnClick}>PLAY</span>
      </button>
    </div>
  );
};

export default Modal;
