// iframe

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Time at Start
let time = 0;
let framesPerSecond = 200;

// Car Dimensions
let carHeight = 125;
let carWidth = 75;
let carX = (canvas.width - carWidth) / 2;

// Obstacle Position / Dimensions
let xLeft = canvas.width / 4 - 25;
let yLeft = canvas.height - 600;

let xMiddle = canvas.width / 2;
let yMiddle = canvas.height - 600;

let xRight = canvas.width * 3 / 4 + 25;
let yRight = canvas.height - 600;

let yFinish = canvas.height - 650;

let obstacleRadius = 10; // make it a variable later

// Overall speed of game
let startSpeed = 0.5;
let maxSpeed = 3;

const gameSpeed = setInterval(() => {
  while (startSpeed < maxSpeed) {
    startSpeed += 0.25;
    console.log(startSpeed);
  }
}, 1000);

// Overall Distance (allows for finish line)
let distance = 30;

// Distance is calculated every second
const distanceToFinish = setInterval(() => {
  distance -= startSpeed;
  console.log(`Distance to Finish: ${distance}`);
  if (distance === 0) {
    clearInterval(distanceToFinish);
  }
}, 1000);

// Key Press Default State 
let rightPressed = false;
let leftPressed = false;

// Key Press Event Listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


// https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/Paddle_and_keyboard_controls
function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = false;
  }
}

// Logs times every second
const timer = setInterval(() => {
  time++;
  if (distance === 0) {
    clearInterval(timer);
  }
}, 1000)

const drawTime = () => {
  ctx.font = "48px Arial";
  ctx.fillStyle - "#FF0000";
  ctx.fillText(`TIME: ${time}`, canvas.width / 2 - 100, 75);
}

const drawCar = () => {
    ctx.beginPath();
    let car = new Image();
    car.src = "./images/car.png";
    // car.onload = function() {
        ctx.drawImage(car, carX, canvas.height - carHeight * 1.5, carWidth, carHeight);
    // }
    ctx.closePath();
  }

// Obstacle in Left Lane
const drawObstacleLeft = () => {
  ctx.beginPath();
  ctx.arc(xLeft, yLeft, obstacleRadius, 10, 0, Math.PI*2);
  ctx.fillStyle = "#FF1301";
  ctx.fill();
  ctx.closePath();
}

// Obstacle in Middle Lane
const drawObstacleMiddle = () => {
  ctx.beginPath();
  ctx.arc(xMiddle, yMiddle, obstacleRadius, 10, 0, Math.PI*2);
  ctx.fillStyle = "#FF1301";
  ctx.fill();
  ctx.closePath();
}

// Obstacle in Right Lane
const drawObstacleRight = () => {
  ctx.beginPath();
  ctx.arc(xRight, yRight, obstacleRadius, 10, 0, Math.PI*2);
  ctx.fillStyle = "#FF1301";
  ctx.fill();
  ctx.closePath();
}

const drawFinish = () => {
  ctx.beginPath();
  ctx.rect(0, yFinish, canvas.width, 75);
  ctx.fillStyle = "#000000";
  ctx.fill();
  ctx.closePath();
}

// Overall Function to Run Game
const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCar();
  drawTime();
  drawObstacleLeft();
  drawObstacleMiddle();
  drawObstacleRight();

  // if (distance === 15) {
    drawFinish();
  // }

  if (rightPressed) {
    carX += 3.5;
    if (carX + carWidth > canvas.width) {
      carX = canvas.width - carWidth;
    }
  }

  if (leftPressed) {
    carX -= 3.5;
    if (carX < 0) {
      carX = 0;
    }
  }

  yLeft += startSpeed;
  yMiddle += startSpeed;
  yRight += startSpeed;
  yFinish += startSpeed;
}

setInterval(draw, 1000 / framesPerSecond);


// User Story
// Press Play
// Game automatically starts and accelerates at a set pace

// User uses left/right or A/D to move between THREE lanes

// Different obstacles randomly get in the way and slow down 
  // Alerts will show up that obstacles are coming

// Determined by time to finish



// Could make it side by side with same obstacles

// How hard to make it twist and turn

// Collision detection
  // calculating hit boxes
  // sandbox that and consolelog it