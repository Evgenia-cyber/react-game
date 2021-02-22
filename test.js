const FIELD_WIDTH = 100;
const FIELD_HEIGHT = 100;
const STEP = 20;

const allFieldCells = [];
for (let i = 0; i < FIELD_WIDTH / STEP; i++) {
  for (let j = 0; j < FIELD_HEIGHT / STEP; j++) {
    allFieldCells.push([i, j]);
  }
}
console.log(allFieldCells);
const SNAKE_HEAD = { left: 80, top: 20 };
const SNAKE_BODY = [
  { left: 60, top: 20 },
  { left: 40, top: 20 },
];
const snake = [...SNAKE_BODY];
snake.unshift(SNAKE_HEAD);
const snakeCells = snake.reduce((acc, item) => {
  acc.push([item.left / STEP, item.top / STEP]);
  return acc;
}, []);
console.log(snakeCells);
// const cellsCanBeApple = [...allFieldCells,...snakeCells];
// const cellsCanBeApple = allFieldCells.reduce(
//   (arr,item)=>{
//     console.log(item)
//     return arr;
//   },[]
// );
// const cellsCanBeApple = [...allFieldCells, ...snakeCells];
// const a = [4, 1];
// const cellsCanBeApple = allFieldCells.filter(cell=>cell[0]!==a[0]||cell[1]!==a[1]);
const a = [
  [4, 1],
  [3, 1],
  [2, 1],
];
const cellsCanBeApple = allFieldCells.filter((cell) => {
  console.log(cell);
  a.forEach(item=>{return })
  cell[0] !== a[0] || cell[1] !== a[1];
});

console.log(cellsCanBeApple);
// const getRandom = (max, step) => {
//   const random = Math.floor(Math.random() * (max / step)) * step;
//   return random;
// };
// let newApple = { left: 160, top: 200 };
// const random = [getRandom(FIELD_WIDTH,STEP),getRandom(FIELD_HEIGHT,STEP)]
// console.log(random);
// newApple = {
//   left: random[0],
//   top: random[1],
// }

// const snakeBodyItems = [
//   { left: 160, top: 200 },
//   { left: 140, top: 200 },
// ];
// const allLeftArray=FIELD_WIDTH/STEP;
// const allTopArray=FIELD_HEIGHT/STEP;
// const snakeHead = { left: 180, top: 200 };
// const snake = [...snakeBodyItems];
// snake.unshift(snakeHead);
// // const snakeArr = [];
// const canNotBeApple = snake.reduce((acc, item)=>{
//   console.log(item);
//   console.log(acc);
//   // console.log(acc);
//   acc.push([item.left/STEP,item.top/STEP])
//   return acc;
// },[])

console.log(snake);
console.log(canNotBeApple);
console.log(newApple);
