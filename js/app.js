// iframe

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Time at Start
let time = 0;
let framesPerSecond = 200;

// racer Dimensions
let racerHeight = 125;
let racerWidth = 75;
let racerX = (canvas.width - racerWidth) / 2;

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
let startSpeed = 1;
let maxSpeed = 8;

const gameSpeed = setInterval(() => {
    startSpeed += 0.5;
    console.log(startSpeed);
    if (startSpeed >= maxSpeed) {
      clearInterval(gameSpeed);
    }
  }, 500)


// Overall Distance (allows for finish line)
let distance = 300;

// Distance is calculated every second
const distanceToFinish = setInterval(() => {
  distance -= startSpeed;
  // console.log(`Distance to Finish: ${distance}`);
  if (distance <= 0) {
    clearInterval(distanceToFinish);
    distance = 0;
  }
}, 750);

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

// Timer (currently set every second)
const timer = setInterval(() => {
  time++;
  Number.time;
  if (distance <= 0) {
    clearInterval(timer);
  }
}, 10)

const convertTime = (time) => { // Carson
  let totalSeconds = (time/100);
  let minutes = Math.floor(totalSeconds/60)
  let remainingSeconds = Math.floor(totalSeconds % 60)
  let remainingMiliseconds = time % 100
  let roundedMS = Math.floor(remainingMiliseconds)
  return(`${minutes}:${remainingSeconds}:${roundedMS}`)
  }

const drawTime = () => {
  ctx.font = "48px Bungee Inline";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${convertTime(time)}`, canvas.width / 2 - 75, 75);
}

const drawDistance = () => {
  ctx.font = "18px Bungee Inline";
  ctx.fillstyle = "#FFFFFF";
  ctx.fillText(`${distance}`, canvas.width - 465, canvas.height - 40);
  ctx.fillText('Light Years Away', canvas.width - 465, canvas.height - 15);
}

// Millisecond to string format
// const milisecondTimer = (time) => {
//   // let msec_num = parseInt(this, 10);
//   let min = Math.floor(time / 6000);
//   let sec = Math.floor((time - (min * 6000)) / 100)
//   let milisec = time - (min * 6000) - (minutes * 60);
//   if (min < 10) {min = "0" + min}
//   if (sec < 10) {sec = "0" + sec}
//   if (milisec < 10) {milisec = "0" + milisec}
//   return `${min}:${sec}:${milisec}`;
// }

const drawRacer = () => {
    ctx.beginPath();
    let racer = new Image();
    // https://myrealdomain.com/images/8-bit-spaceship-1.png
    racer.src = "./images/cruiser.png";
    // racer.onload = function() {
        ctx.drawImage(racer, racerX, canvas.height - racerHeight * 1.33, racerWidth, racerHeight);
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

// Create Obstacle
let obstacles = [];
for (let i = 0; i < 2; i++) {
  obstacles[i] = {x: 0, y: 0, status: 1};
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
  drawRacer();
  drawTime();
  drawDistance();
  drawObstacleLeft();
  drawObstacleMiddle();
  drawObstacleRight();

  // Tries to make a finish line at end
  // if (distance <= 3) {
  //   drawFinish();
  //   } 

  // If obstacle hits racer, slow down and make it disappear
  if (xMiddle > racerX && xMiddle < racerX + racerWidth && yMiddle + startSpeed < racerHeight && yMiddle + startSpeed > canvas.height - racerHeight * 1.33) {
    console.log('hit!');
    startSpeed = 0.5;
  }

  if (rightPressed) {
    racerX += 3.5;
    if (racerX + racerWidth > canvas.width - 58) {
      racerX = canvas.width - racerWidth - 58;
    }
  }

  if (leftPressed) {
    racerX -= 3.5;
    if (racerX < 58) {
      racerX = 58;
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


/* // Need TO DO:
Make obstacles disappear when colliding and slow speed
Make obstacles show at random
  - best at set distances
Give obstacles images
Add finish line
Animate background
Add nice text
Add start screen and play button


NICE TO HAVES
Alert that obstacle is coming
Add game win screen
Add power ups
Timer in 00:00:00 format
Add music
Add high scores

*/
