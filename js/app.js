const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const $background = $("#background");
const $ctx = $("#myCanvas")[0].getContext("2d");

// $(document).ready(function() {
//   $background.on('click', () => {
//   console.log('clicked!');
//   $ctx.clearRect(0, 0, canvas.width, canvas.height);	
//   play();
  
//   });
// })

const play = () => {
  $('#play-screen').css('display','none');
}

// Overall Distance (allows for finish line)
let distance = 75;

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
  let msFormatted = ('0' + roundedMS).slice(-2);
  return(`${minutesFormatted}'${secondsFormatted}'${msFormatted}`);
}

const drawTime = () => {
  ctx.font = "48px Bungee Inline";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${convertTime(time)}`, canvas.width / 2 - 120, 125);
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

const drawHitbox = () => {
  ctx.beginPath();
  ctx.rect(racerX, canvas.height - racerHeight * 1.40, racerWidth, canvas.height - 50);
  ctx.fillStyle = "#FFFFFF";
  ctx.fill();
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
  // drawHitbox();
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


  // let explosion = newImage();
  // explosion.src = "./images/explosion.gif";

  let asteroid = new Image();
  asteroid.src = "./images/meteor.png";

  let explosion = new Image();
  explosion.src = "./images/explosion.gif";

  // https://banner2.kisspng.com/20180406/aaw/kisspng-pixel-art-death-star-death-star-5ac75cab1155d1.312653581523014827071.jpg
  let deathstar = new Image();
  deathstar.src = "./images/deathstar.png"


  if (distance === 0) {
  ctx.drawImage(deathstar, canvas.width / 2 - 130, yFinish - 100, 240, 200);
    if (yFinish <= 250) {
    yFinish += 1.5;
    }
  }

  for (let i = 0; i < obstacles.length; i++) {
    
    // Collision Detection - restarts speed to 2
    if (obstacles[i].x + 38 > racerX && obstacles[i].x + 38 < racerX + racerWidth && obstacles[i].y > canvas.height - racerHeight * 1.4 && obstacles[i].y < canvas.height - 85) {
      ctx.drawImage(explosion, obstacles[i].x - 70, obstacles[i].y - 10, 200, 200);
      obstacles[i].y += 3;
      startSpeed = 0.75;
      // if (obstacles[i].x + 38 > racerX && obstacles[i].x + 38 < racerX + racerWidth && obstacles[i].y > canvas.height - racerHeight * 1.4 && obstacles[i].y < canvas.height - 85 && obstacles[i].y > canvas.height - 85) {
      //   ctx.drawImage(explosion, obstacles[i].x - 70, obstacles[i].y - 10, 200, 200);
      //   obstacles[i].y += startSpeed;
      // }
    } else {
      ctx.drawImage(asteroid, obstacles[i].x, obstacles[i].y, 75, 150);
      obstacles[i].y += startSpeed;
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
      ctx.font = "48px Bungee Inline";
      ctx.fillstyle = "#FFFFFF";
      ctx.fillText(`GOT EEEEM`, canvas.width - 200, canvas.height - 100);
    // }
  }
}

setInterval(game, 1000 / framesPerSecond);

// User Story

// Press Play

// Game starts and accelerates at a set pace

// User uses left/right or A/D to move between navigate the galaxy

// Different obstacles randomly get in the way and slow down
  // Alerts will show up that obstacles are coming

// Game win is determined by time to finish


/* NEED TO DO:
BETTER HITBOXES
Add start screen and play button
Add game win text
Make obstacles disappear when colliding and slow speed
Add nice text

NICE TO HAVES
Alert that obstacle is coming
Add game win screen
Add power ups
Add music
Add high scores */