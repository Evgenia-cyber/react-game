import React from 'react';
import { ALL_SCORES } from '../constants';

import classes from './Modal.module.css';
import Scores from './Scores';
import ScoresStatistics from './ScoresStatistics';
import Settings from './Settings';

const Modal = ({
  handleOnPlayBtnClick,
  isGameEnd,
  score,
  bestScore,
  setBestScore,
  volume,
  setVolume,
  setCustomVolume
}) => {
  const [allScores, setAllScores] = React.useState(ALL_SCORES);

  React.useEffect(() => {
    if (window.localStorage.getItem('scores') !== null) {
      const SCORES = JSON.parse(window.localStorage.getItem('scores'));
      setBestScore(SCORES[0]);
      setAllScores(SCORES);
    }
  }, [isGameEnd, setBestScore]);

  React.useEffect(() => {
    if (isGameEnd) {
      if (score > bestScore) {
        setBestScore(score);
      }
      let storageScores = [score, ...allScores];
      storageScores.sort((a, b) => {
        return b - a;
      });
      storageScores.pop();
      window.localStorage.setItem('scores', JSON.stringify(storageScores));
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
        <Settings volume={volume} setVolume={setVolume} setCustomVolume={setCustomVolume}/>
        <ScoresStatistics />
      </div>
      <div className={classes.attributes}>
        Icons made by{' '}
        <a href="https://www.freepik.com" title="Freepik">
          Freepik
        </a>{' '}
        from{' '}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
  );
};

export default Modal;
