const FIELD_WIDTH = 400;
const FIELD_HEIGHT = 400;
const STEP = 20;

const getRandom = (max, step) => {
  const random = Math.floor(Math.random() * (max / step)) * step;
  return random;
};

// let arr = [];
// for (let i = 0; i < 10; i++) {
//    arr.push(getRandom(FIELD_WIDTH,STEP));
// //   console.log(getRandom());
// }
// console.log(arr)
// console.log(arr.indexOf(380))
let newApple = { left: 170, top: 200 };
const snakeBodyItems = [
  { left: 170, top: 200 },
  { left: 150, top: 200 },
];
const snakeHead = { left: 190, top: 200 };
const snake = [...snakeBodyItems];
snake.push({
  left: snake[snake.length - 1].left - 20,
  top: snake[snake.length - 1].top - 0,
});
// snake.unshift(snakeHead);
// const res = snake.some(item=>item.left===newApple.left && item.top===newApple.top)
// if(snake.some(item=>item.left===newApple.left && item.top===newApple.top)){
//   newApple=getRandom();
//   console.log(newApple)
// }
// console.log(res);
console.log(snake);
