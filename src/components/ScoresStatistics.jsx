import React from 'react';
import classes from './ScoresStatistics.module.css';
import scoresImg from '../assets/img/score.svg';

const ScoresStatistics = ({ allScores }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handlerOnClick = () => {
    setIsModalOpen((isModalOpen) => !isModalOpen);
  };

  return (
    <div className={classes.advanced_item}>
      <img
        className={classes.advanced_img}
        src={scoresImg}
        alt="best scores"
        onClick={handlerOnClick}
      />
      {isModalOpen && (
        <div className={classes.scores}>
          <h5>YOUR TOP 10 SCORES</h5>
          {allScores.length &&
            allScores.map((score, index) => (
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
