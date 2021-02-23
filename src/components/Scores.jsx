import React from 'react';

import appleImg from '../assets/img/apple.svg';
import awardImg from '../assets/img/award.svg';
import '../App.css';
import classes from './Scores.module.css';

const Scores = ({score}) => {
   return (
      <div className={classes.left}>
              <div className={classes.toolbar_item}>
                <img className={classes.score_img} src={appleImg} alt="score" />
                <span className={classes.score}>{score}</span>
              </div>
              <div className={classes.toolbar_item}>
                <img
                  className={classes.bestscore_img}
                  src={awardImg}
                  alt="best score"
                />
                <span className={classes.score}>100</span>
              </div>
            </div>
   )
}

export default Scores
