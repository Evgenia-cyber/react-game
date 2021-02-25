import React from 'react';
import volumeImg from '../assets/img/sound.svg';
import noVolumeImg from '../assets/img/no_sound.svg';
import classes from './Volume.module.css';

const Volume = ({ volume, setVolume, fieldRef }) => {
  const sliderRef = React.useRef();
  const [isVisibleSlider, setisVisibleSlider] = React.useState(false);
  React.useEffect(() => {
    fieldRef.current.focus();
    fieldRef.current.click();
    console.log(document.activeElement);
  }, [volume, fieldRef]);

  const handlerOnChange = (event) => {
    setVolume(+event.target.value);
    //  fieldRef.current.click();
    //  //  sliderRef.current.blur();
  };

  const handlerOnMouseEvent = () => {
    setisVisibleSlider((isVisibleSlider) => !isVisibleSlider);
  };
  const handlerOnClick = () => {
    setVolume(0);
  };
  return (
    <div
      className={classes.volume + ' ' + classes.toolbar_item}
      onMouseEnter={handlerOnMouseEvent}
      onMouseLeave={handlerOnMouseEvent}
    >
      <img
        src={volume === 0 ? noVolumeImg : volumeImg}
        alt="volume"
        onClick={handlerOnClick}
      />
      {isVisibleSlider && (
        <div className={classes.volume_control}>
          <input
            ref={sliderRef}
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
      )}
    </div>
  );
};

export default Volume;
