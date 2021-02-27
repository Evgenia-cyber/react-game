import { DOWN_DIRECTION, LEFT_DIRECTION, RIGHT_DIRECTION, UP_DIRECTION } from "../constants";

const changeDirection = (
  direction,
  setDirection,
  isUp,
  isDown,
  isLeft,
  isRight,
) => {
  if (isLeft) {
    if (direction !== RIGHT_DIRECTION) {
      setDirection(LEFT_DIRECTION);
    }
  } else if (isDown) {
    if (direction !== UP_DIRECTION) {
      setDirection(DOWN_DIRECTION);
    }
  } else if (isUp) {
    if (direction !== DOWN_DIRECTION) {
      setDirection(UP_DIRECTION);
    }
  } else if (isRight) {
    if (direction !== LEFT_DIRECTION) {
      setDirection(RIGHT_DIRECTION);
    }
  }
};
export { changeDirection };
