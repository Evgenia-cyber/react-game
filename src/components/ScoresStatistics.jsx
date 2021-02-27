import React from 'react';

import { ALL_SCORES } from '../constants';
import scoresImg from '../assets/img/score.svg';

import classes from './ScoresStatistics.module.css';

const ScoresStatistics = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [updatedScores, setUpdatedScores] = React.useState(ALL_SCORES);

  React.useEffect(() => {
    if (window.localStorage.getItem('scores') !== null) {
      const SCORES = JSON.parse(window.localStorage.getItem('scores'));
      setUpdatedScores(SCORES);
    }
  }, [isModalOpen]);

  const handlerOnMouseEvent = () => {
    setIsModalOpen((isModalOpen) => !isModalOpen);
  };

  return (
    <div className={classes.advanced_item}>
      <img
        className={classes.advanced_img}
        src={scoresImg}
        alt="best scores"
        onMouseEnter={handlerOnMouseEvent}
        onMouseLeave={handlerOnMouseEvent}
      />
      {isModalOpen && (
        <div className={classes.scores}>
          <h5>YOUR TOP 10 SCORES</h5>
          {updatedScores.length &&
            updatedScores.map((score, index) => (
              <div key={index + ' ' + score} className={classes.scores_item}>
                <span>{index + 1}</span>
                <span>{score}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ScoresStatistics;
