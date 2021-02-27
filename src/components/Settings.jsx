import React from 'react';

import { sound } from '../utils/sound';
import settingsImg from '../assets/img/settings.svg';
import closeImg from '../assets/img/close.svg';
import moveSound from '../assets/sounds/move.mp3';

import classes from './Settings.module.css';

const Settings = ({ volume, setVolume, setCustomVolume }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const handlerOnMouseEvent = () => {
    setIsModalOpen((isModalOpen) => !isModalOpen);
  };

  const handlerOnChange = (event) => {
    setVolume(+event.target.value);
    sound.playSound(moveSound, +event.target.value);
    setCustomVolume(+event.target.value);
  };

  const handlerOnCloseClick = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className={classes.advanced_item}
      onMouseEnter={handlerOnMouseEvent}
      onMouseLeave={handlerOnMouseEvent}
    >
      <img className={classes.advanced_img} src={settingsImg} alt="settings" />
      {isModalOpen && (
        <div className={classes.settings}>
          <img
            className={classes.close_img}
            src={closeImg}
            alt="close"
            onClick={handlerOnCloseClick}
          />
          <h5>SETTINGS</h5>

          <div className={classes.volume_control + ' ' + classes.settings_item}>
            <label htmlFor="volume">VOLUME:</label>
            <input
              type="range"
              id="volume"
              name="volume"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handlerOnChange}
            ></input>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
