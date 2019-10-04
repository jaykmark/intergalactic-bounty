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
let xLeft = canvas.width / 4 - 60;
let yLeft = canvas.height - 600;

let xMiddle = canvas.width / 2 - 37;
let yMiddle = canvas.height - 600;

let xRight = canvas.width * 3 / 4 - 12;
let yRight = canvas.height - 600;

let yObstacle = canvas.height - 620

let yFinish = canvas.height - 650;

let obstacleRadius = 10; // make it a variable later

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
  let minutesFormatted = ('0' + minutes).slice(-2)
  let secondsFormatted = ('0' + remainingSeconds).slice(-2)
  return(`${minutesFormatted}:${secondsFormatted}:${roundedMS}`);
}

const drawTime = () => {
  ctx.font = "48px Bungee Inline";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${convertTime(time)}`, canvas.width / 2 - 120, 75);
}

// Overall speed of game
let startSpeed = 1;
let maxSpeed = 5;

const gameSpeed = setInterval(() => {
    startSpeed += 0.25;
    console.log(startSpeed);
    if (startSpeed >= maxSpeed) {
      clearInterval(gameSpeed);
    }
  }, 500)

// Overall Distance (allows for finish line)
let distance = 150;
let meteorInterval = 0

// Distance is calculated every second
const distanceToFinish = setInterval(() => {
  distance -= startSpeed;
  meteorInterval += startSpeed;
  // console.log(meteorInterval);
  // console.log(`Distance to Finish: ${distance}`);
  if (distance <= 0) {
    clearInterval(distanceToFinish);
    distance = 0;
  }
}, 750);

const drawDistance = () => {
  ctx.font = "18px Bungee Inline";
  ctx.fillstyle = "#FFFFFF";
  ctx.fillText(`${Math.floor(distance)},000`, canvas.width - 465, canvas.height - 40);
  ctx.fillText('Light Years Away', canvas.width - 465, canvas.height - 15);
}

const drawRacer = () => {
    ctx.beginPath();
    let racer = new Image();
    // https://myrealdomain.com/images/8-bit-spaceship-1.png
    racer.src = "./images/cruiser.png";
    // racer.onload = function() {
        ctx.drawImage(racer, racerX, canvas.height - racerHeight * 1.45, racerWidth, racerHeight);
    // }
    ctx.closePath();
}

const collisionDetection = () => {
  for (let i = 0; i < obstacle.length; i++) {
    let o = obstacle[i];
    
  }
}

const lanes = [{x:xRight,y:canvas.height - 620},{x:xMiddle,y:canvas.height - 620},{x:xLeft,y:canvas.height - 620}]

let obstacles = [];

obstacles[0] = {
  x: Math.floor(Math.random() * ((canvas.width - 58) - 100 + 1) + 58),
  y: 0
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
  ctx.clearRect(0, 0, canvas.width, canvas.height * 100);
  drawRacer();
  drawTime();
  drawDistance();

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

    let asteroid = new Image();
    asteroid.src = "./images/meteor.png";

  for (let i = 0; i < obstacles.length; i++) {
    ctx.drawImage(asteroid, obstacles[i].x, obstacles[i].y, 75, 150);
    obstacles[i].y += startSpeed;
  }
  if (obstacles[obstacles.length-1].y > 500) {
    obstacles.push(
      {
        x: Math.floor(Math.random() * ((canvas.width - 133) - 58 + 1) + 58),
        y: 0
      })
  }
}

setInterval(draw, 1000 / framesPerSecond);


// const drawObstacle = () => {
//   let randomValue = Math.floor(Math.random() * lanes.length)
//   return lanes[randomValue];
// }

// const setup = () => {
//   obstacles.push(drawObstacle());
// console.log(obstacles)
// }

// const createObstacles = () => {
//   obstacle.forEach((ship) => {
//     ctx.beginPath();
//     ctx.arc(ship.x, ship.y, obstacleRadius, 10, 0, Math.PI*2);
//     ctx.fillStyle = "#FF1301";
//     ctx.fill();
//     ctx.closePath();
// });
// }

// setInterval(() => {
// // setup();
// }, 3000);




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

// // Obstacle in Left Lane
// const drawObstacleLeft = () => {
//   ctx.beginPath();
//   ctx.arc(xLeft, yLeft, obstacleRadius, 10, 0, Math.PI*2);
//   ctx.fillStyle = "#FF1301";
//   ctx.fill();
//   ctx.closePath();
// }

// // Obstacle in Middle Lane
// const drawObstacleMiddle = () => {
//     ctx.beginPath();
//     ctx.arc(xMiddle, yMiddle, obstacleRadius, 10, 0, Math.PI*2);
//     ctx.fillStyle = "#FF1301";
//     ctx.fill();
//     ctx.closePath();
// }
// Store an array with objects with x & y; push random objects to that
// draw animation will keep looping
// set a threshhold that will allow the 

// Obstacle in Right Lane
// const drawObstacleRight = () => {
//   setInterval(()=>{
//     ctx.beginPath();
//     ctx.arc(xRight, yRight, obstacleRadius, 10, 0, Math.PI*2);
//     ctx.fillStyle = "#FF1301";
//     ctx.fill();
//     ctx.closePath();
//     draw();
//   },2000)
// }

// obstacleFunctions = [drawObstacleLeft(), drawObstacleMiddle(), drawObstacleRight()]

// const randomObstacle = setInterval(() => {
//   return obstacleFunctions[Math.floor(Math.random() * obstacleFunctions.length)];
// }, 1000);