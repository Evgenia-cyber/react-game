const FIELD_WIDTH = 400;
const FIELD_HEIGHT = 400;
const STEP = 20;
const SPEED = 200; 
const APPLE = { left: 300, top: 100 };
const SNAKE_HEAD = { left: 80, top: 300 };
const SNAKE_BODY = [
  { left: 60, top: 300 },
  { left: 40, top: 300 },
];

const UP_KEYCODE = 38;
const DOWN_KEYCODE = 40;
const LEFT_KEYCODE = 37;
const RIGHT_KEYCODE = 39;

const UP_DIRECTION = { left: 0, top: -STEP };
const DOWN_DIRECTION = { left: 0, top: STEP };
const LEFT_DIRECTION = { left: -STEP, top: 0 };
const RIGHT_DIRECTION = { left: STEP, top: 0 };
const CURRENT_DIRECTION = RIGHT_DIRECTION;

const QUANTITY_BEST_RESULTS = 10;

export {
  FIELD_WIDTH,
  FIELD_HEIGHT,
  STEP,
  APPLE,
  SNAKE_HEAD,
  SNAKE_BODY,
  SPEED,
  CURRENT_DIRECTION,
  UP_KEYCODE,
  DOWN_KEYCODE,
  LEFT_KEYCODE,
  RIGHT_KEYCODE,
  UP_DIRECTION,
  DOWN_DIRECTION,
  LEFT_DIRECTION,
  RIGHT_DIRECTION,
  QUANTITY_BEST_RESULTS
};
