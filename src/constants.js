const FIELD_WIDTH = 400;
const FIELD_LENGTH = 400;
const CELL = 20;
const SPEED = 200;
// const CELL = 1;///////змея идет плавно
// const SPEED = 20;///////змея идет плавно
const APPLE = { left: 290, top: 100 };
const SNAKE_HEAD = { left: 190, top: 200 };
const SNAKE_BODY = [
  { left: 170, top: 200 },
  { left: 150, top: 200 },
];
const CURRENT_DIRECTION = { left: CELL, top: 0 };

export {
  FIELD_WIDTH,
  FIELD_LENGTH,
  CELL,
  APPLE,
  SNAKE_HEAD,
  SNAKE_BODY,
  SPEED,
  CURRENT_DIRECTION
};
