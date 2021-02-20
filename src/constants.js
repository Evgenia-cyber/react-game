const FIELD_WIDTH = 400;
const FIELD_HEIGHT = 400;
const SNAKE_ITEM_WIDTH = 20;
const SNAKE_ITEM_HEIGHT = 20;
const STEP = 20;
const SPEED = 1000; 
const APPLE = { left: 290, top: 100 };
const SNAKE_HEAD = { left: 190, top: 200 };
const SNAKE_BODY = [
  { left: 170, top: 200 },
  { left: 150, top: 200 },
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

export {
  FIELD_WIDTH,
  FIELD_HEIGHT,
  SNAKE_ITEM_WIDTH,
  SNAKE_ITEM_HEIGHT,
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
};
