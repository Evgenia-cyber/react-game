import React from 'react';

import {
  FIELD_HEIGHT_MAX_IN_CELLS,
  FIELD_HEIGHT_MIN_IN_CELLS,
  FIELD_WIDTH_MAX_IN_CELLS,
  FIELD_WIDTH_MIN_IN_CELLS,
  MAX_SPEED,
  SPEED,
} from '../constants';
import { sound } from '../utils/sound';
import settingsImg from '../assets/img/settings.svg';
import closeImg from '../assets/img/close.svg';
import moveSound from '../assets/sounds/move.mp3';

import classes from './Settings.module.css';

const Settings = ({
  volume,
  setVolume,
  setCustomVolume,
  customSettings,
  setCustomSettings,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handlerOnChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.name === 'color' ? target.value : +target.value;
    setCustomSettings((prevState) => ({ ...prevState, [name]: value }));
  };
  const handlerOnChangeFieldSize = (event) => {
    const target = event.target;
    const name = target.name;
    let value = +target.value;
    if(name==="widthInCells"){
      if(value<FIELD_WIDTH_MIN_IN_CELLS){
        value=FIELD_WIDTH_MIN_IN_CELLS
      }else if(value>FIELD_WIDTH_MAX_IN_CELLS){
        value=FIELD_WIDTH_MAX_IN_CELLS
      }
    }
    if(name==="heightInCells"){
      if(value<FIELD_HEIGHT_MIN_IN_CELLS){
        value=FIELD_HEIGHT_MIN_IN_CELLS
      }else if(value>FIELD_HEIGHT_MAX_IN_CELLS){
        value=FIELD_HEIGHT_MAX_IN_CELLS
      }
    }
    setCustomSettings((prevState) => ({ ...prevState, [name]: value }));
  };

  const handlerOnMouseEvent = () => {
    setIsModalOpen((isModalOpen) => !isModalOpen);
  };

  const handlerOnChangeVolume = (event) => {
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

          <div className={classes.field_control + ' ' + classes.settings_item}>
            <label>FIELD:</label>
            <label>
              width:
              <input
                type="number"
                name="widthInCells"
                max={FIELD_WIDTH_MAX_IN_CELLS}
                min={FIELD_WIDTH_MIN_IN_CELLS}
                value={customSettings.widthInCells}
                onChange={handlerOnChangeFieldSize}
              />
              cells
            </label>
            <label>
              height:
              <input
                type="number"
                name="heightInCells"
                max={FIELD_HEIGHT_MAX_IN_CELLS}
                min={FIELD_HEIGHT_MIN_IN_CELLS}
                value={customSettings.heightInCells}
                onChange={handlerOnChangeFieldSize}
              />
              cells
            </label>
          </div>

          <div className={classes.speed_control + ' ' + classes.settings_item}>
            <label>SPEED:</label>
            <label className={classes.container}>
              <input
                type="radio"
                name="speed"
                value={SPEED}
                checked={customSettings.speed === SPEED}
                onChange={handlerOnChange}
              />
              <span className={classes.checkmark}></span>slow
            </label>
            <label className={classes.container}>
              <input
                type="radio"
                name="speed"
                value={MAX_SPEED}
                checked={customSettings.speed === MAX_SPEED}
                onChange={handlerOnChange}
              />
              <span className={classes.checkmark}></span>fast
            </label>
          </div>

          <div className={classes.color_control + ' ' + classes.settings_item}>
            <label>COLOR:</label>
            <label className={classes.container}>
              <input
                type="radio"
                name="color"
                value="green"
                checked={customSettings.color === 'green'}
                onChange={handlerOnChange}
              />
              <span className={classes.checkmark}></span>green
            </label>
            <label className={classes.container}>
              <input
                type="radio"
                name="color"
                value="red"
                checked={customSettings.color === 'red'}
                onChange={handlerOnChange}
              />
              <span className={classes.checkmark}></span>red
            </label>
            <label className={classes.container}>
              <input
                type="radio"
                name="color"
                value="blue"
                checked={customSettings.color === 'blue'}
                onChange={handlerOnChange}
              />
              <span className={classes.checkmark}></span>blue
            </label>
          </div>

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
              onChange={handlerOnChangeVolume}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
