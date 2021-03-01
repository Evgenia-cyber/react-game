import React from 'react';

import { ALL_SCORES } from '../constants';
import githubImg from '../assets/img/github.svg';
import schoolImg from '../assets/img/rs_school_js.svg';

import Scores from './Scores';
import ScoresStatistics from './ScoresStatistics';
import Settings from './Settings';

import classes from './Modal.module.css';

const Modal = ({
  handleOnPlayBtnClick,
  isGameEnd,
  score,
  bestScore,
  setBestScore,
  volume,
  setVolume,
  setCustomVolume,
  customSettings,
  setCustomSettings,
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
        <Settings
          volume={volume}
          setVolume={setVolume}
          setCustomVolume={setCustomVolume}
          customSettings={customSettings}
          setCustomSettings={setCustomSettings}
        />
        <ScoresStatistics />
      </div>
      <footer>
        <p>
          Author: <span className={classes.author}>Kurineva Evgenia</span>
        </p>
        <div className={classes.social}>
          {' '}
          <a href="https://github.com/Evgenia-cyber/react-game/tree/react-game">
            <img src={githubImg} alt="github logo" />
          </a>
          <a href="https://rs.school/js/">
            <img
              className={classes.rs_school}
              src={schoolImg}
              alt="rs_school logo"
            />
          </a>
        </div>
        <div>
          Icons made by{' '}
          <a href="https://www.freepik.com" title="Freepik">
            Freepik
          </a>{' '}
          from{' '}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
        <span>2021</span>
      </footer>
    </div>
  );
};

export default Modal;
