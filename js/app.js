const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const $background = $("#background");
const $ctx = $("#myCanvas")[0].getContext("2d");

$(document).ready(function() {
  $background.on('click', () => {
  console.log('clicked!');
  $ctx.clearRect(0, 0, canvas.width, canvas.height);	
  play();
  setInterval(game, 1000 / framesPerSecond);
  });
})

const play = () => {
  $('#play-screen').css('display','none');
}

// Time at Start
let time = 0;
let framesPerSecond = 200;

// racer Dimensions
let racerHeight = 125;
let racerWidth = 75;
let racerX = (canvas.width - racerWidth) / 2;

// Obstacle Position / Dimensions
let yFinish = 0;

// Key Press Default State 
let rightPressed = false;
let leftPressed = false;

$(background)

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

// Timer (currently set every millisecond)
const timer = setInterval(() => {
  time++;
  Number.time;
  if (distance <= 0) {
    clearInterval(timer);
  }
}, 10)

const convertTime = (time) => { // Carson
  let totalSeconds = (time/100);
  let minutes = Math.floor(totalSeconds/60);
  let remainingSeconds = Math.floor(totalSeconds % 60);
  let remainingMiliseconds = time % 100;
  let roundedMS = Math.floor(remainingMiliseconds)
  let minutesFormatted = ('0' + minutes).slice(-2);
  let secondsFormatted = ('0' + remainingSeconds).slice(-2);
  let msFormatted = (roundedMS + '0').slice(2);
  return(`${minutesFormatted}:${secondsFormatted}:${roundedMS}`);
}

const drawTime = () => {
  ctx.font = "48px Bungee Inline";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${convertTime(time)}`, canvas.width / 2 - 120, 75);
}

// Overall speed of game
let startSpeed = 2;
let maxSpeed = 10;

const gameSpeed = setInterval(() => {
    startSpeed += 0.15;
    console.log(startSpeed);
    if (startSpeed >= maxSpeed) {
      clearInterval(gameSpeed);
    }
    if (distance <= 0) {
      clearInterval(gameSpeed);
    }
  }, 500)

// Overall Distance (allows for finish line)
let distance = 50;

// Distance is calculated every second
const distanceToFinish = setInterval(() => {
  distance -= startSpeed;
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

let obstacles = [];

obstacles[0] = {
  x: Math.floor(Math.random() * ((canvas.width - 58) - 100 + 1) + 58),
  y: 0
}

// Overall Function to Run Game
const game = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height * 100);
  drawRacer();
  drawTime();
  drawDistance();
  
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

  // https://banner2.kisspng.com/20180406/aaw/kisspng-pixel-art-death-star-death-star-5ac75cab1155d1.312653581523014827071.jpg
  let deathstar = new Image();
  deathstar.src = "./images/deathstar.png"

  if (distance === 0) {
  ctx.drawImage(deathstar, canvas.width / 2 - 130, yFinish - 100, 250, 200);
    if (yFinish <= 250) {
    yFinish += 1.5;
    }
  }

  for (let i = 0; i < obstacles.length; i++) {
    ctx.drawImage(asteroid, obstacles[i].x, obstacles[i].y, 75, 150);
    obstacles[i].y += startSpeed;
    // Collision Detection - restarts speed to 2
    if (obstacles[i].x + 38 > racerX && obstacles[i].x + 38 < racerX + racerWidth && obstacles[i].y > canvas.height - racerHeight * 1.5 && obstacles[i].y < canvas.height - 50) {
      startSpeed = 2;
    }
    if (distance === 0) {
      return;
    }
  }

  if (obstacles[obstacles.length - 1].y > 400) {
    obstacles.push(
    {
      x: Math.floor(Math.random() * ((canvas.width - 133) - 58 + 1) + 58),
      y: 0
    })
    if (distance === 0) {
      return;
    }
  }

  if (distance === 0) {
    // const drawDistance = () => {
      ctx.font = "18px Bungee Inline";
      ctx.fillstyle = "#FFFFFF";
      ctx.fillText(`GOT EEEEM`, canvas.width - 200, canvas.height - 100);
    // }
  }
}

// User Story
// Press Play
// Game automatically starts and accelerates at a set pace

// User uses left/right or A/D to move between THREE lanes

// Different obstacles randomly get in the way and slow down 
  // Alerts will show up that obstacles are coming

// Determined by time to finish

// Could make it side by side with same obstacles

// How hard to make it twist and turn

/* NEED TO DO:
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
Add high scores */