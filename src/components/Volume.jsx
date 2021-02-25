import React from 'react';
import volumeImg from '../assets/img/sound.svg';
import noVolumeImg from '../assets/img/no_sound.svg';
import classes from './Volume.module.css';

const Volume = ({ volume, setVolume, customVolume }) => {
  const handlerOnClick = () => {
    volume === 0 ? setVolume(customVolume) : setVolume(0);
  };
  return (
    <div className={classes.volume + ' ' + classes.toolbar_item}>
      <img
        src={volume === 0 ? noVolumeImg : volumeImg}
        alt="volume"
        onClick={handlerOnClick}
      />
    </div>
  );
};

export default Volume;
