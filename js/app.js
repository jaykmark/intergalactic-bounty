// iframe

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

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

let obstacleRadius = 10; // make it a variable later
let dy = 2; //make it a variable of overall speed

// Key Press Default State
let rightPressed = false;
let leftPressed = false;

// Key Press Event Listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

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

function drawCar() {
    ctx.beginPath();
    let car = new Image();
    car.src = "./images/car.png";
    // car.onload = function() {
        ctx.drawImage(car, carX, canvas.height - carHeight * 1.5, carWidth, carHeight);
    // }
    ctx.closePath();
  }

function drawObstacleLeft() {
  ctx.beginPath();
  ctx.arc(xLeft, yLeft, obstacleRadius, 10, 0, Math.PI*2);
  ctx.fillStyle = "#FF1301";
  ctx.fill();
  ctx.closePath();
}

function drawObstacleMiddle() {
  ctx.beginPath();
  ctx.arc(xMiddle, yMiddle, obstacleRadius, 10, 0, Math.PI*2);
  ctx.fillStyle = "#FF1301";
  ctx.fill();
  ctx.closePath();
}

function drawObstacleRight() {
  ctx.beginPath();
  ctx.arc(xRight, yRight, obstacleRadius, 10, 0, Math.PI*2);
  ctx.fillStyle = "#FF1301";
  ctx.fill();
  ctx.closePath();
}


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCar();
  drawObstacleLeft();
  drawObstacleMiddle();
  drawObstacleRight();

  if (rightPressed) {
    carX += 6;
    if (carX + carWidth > canvas.width) {
      carX = canvas.width - carWidth;
    }
  }

  if (leftPressed) {
    carX -= 6;
    if (carX < 0) {
      carX = 0;
    }
  }
  yLeft += dy;
  yMiddle += dy;
  yRight += dy;
}

setInterval(draw, 10);


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