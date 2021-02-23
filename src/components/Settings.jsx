import React from 'react';
import classes from './Settings.module.css';
import settingsImg from '../assets/img/settings.svg';

const Settings = () => {
  return (
    <div className={classes.advanced_item}>
      <img className={classes.advanced_img} src={settingsImg} alt="settings" />
    </div>
  );
};

export default Settings;
