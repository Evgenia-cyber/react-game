import React from 'react';
import { QUANTITY_BEST_RESULTS } from '../constants';

import classes from './Modal.module.css';
import Scores from './Scores';
import ScoresStatistics from './ScoresStatistics';
import Settings from './Settings';

const Modal = ({
  handleOnPlayBtnClick,
  isGameEnd,
  score,
  bestScore,
  allScores,
  setBestScore,
}) => {
  React.useEffect(() => {
    if (isGameEnd) {
      if (score > bestScore) {
        setBestScore(score);
      }
      let scores = [];
      if (bestScore === 0) {
        scores = Array.from(Array(QUANTITY_BEST_RESULTS), () => 0);
      } else {
        scores = [score, ...allScores];
        scores.sort((a, b) => {
          return b - a;
        });
        scores.pop();
      }
      window.localStorage.setItem('scores', JSON.stringify(scores));
    }
  }, [allScores, bestScore, isGameEnd, score, setBestScore]);

  return (
    <div className={classes.modal + ' ' + classes.active}>
      {isGameEnd ? <h2>GAME OVER</h2> : <h2>START GAME</h2>}
      <Scores score={score} bestScore={bestScore} />
      <button className={classes.play_btn}>
        <span onClick={handleOnPlayBtnClick}>PLAY</span>
      </button>
      <div className={classes.advanced}>
        <Settings />
        <ScoresStatistics allScores={allScores} />
      </div>
    </div>
  );
};

export default Modal;
