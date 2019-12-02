const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const $background = $("#background");

// Overall distance of game
let distance = 300;

// Overall speed of game
let startSpeed = 2;
let maxSpeed = 10;

// Time at start
let time = 0;

// Game framerate
let framesPerSecond = 200;

// Racer dimensions
let racerHeight = 125;
let racerWidth = 75;
let racerX = (canvas.width - racerWidth) / 2;

// Array to hold obstacles
let obstacles = [];

// Obstacle and Finish positions
let yFinish = 0;
let yWin = canvas.height;

// Key press default state
let rightPressed = false;
let leftPressed = false;

const drawStartScreen = () => {
  ctx.font = "72px Bungee Inline";
  ctx.fillStyle = "yellow";
  ctx.fillText('INTER', canvas.width / 2 - 125, 275);
  ctx.fillText('GALACTIC', canvas.width / 2 - 195, 350);
  ctx.fillText('BOUNTY', canvas.width / 2 - 157, 425);
  ctx.font = "24px Bungee Inline";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText('- CLICK TO PLAY -', canvas.width / 2 - 113, 575);
}

// In-game timer (currently set every millisecond)
const timer = () => {setInterval(function(){
  if (distance <= 0) {
    clearInterval(timer);
  } else {
  time++
  Number.time;
  }}, 10)
}

// Convert time to 00'00"00
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

// Draw time on game screen
const drawTime = () => {
  ctx.font = "48px Bungee Inline";
  if (distance === 0) {
    ctx.fillStyle = "yellow";
  } else {
  ctx.fillStyle = "#FFFFFF";
  }
  ctx.fillText(`${convertTime(time)}`, canvas.width / 2 - 120, 125);
}

// In-game speed
const gameSpeed = () => {setInterval(function() {
  if (startSpeed >= maxSpeed) {
    clearInterval(gameSpeed);
  }
  if (distance <= 0) {
    clearInterval(gameSpeed);
  } else {
    startSpeed += 0.15;
    console.log(startSpeed);
  }}, 500)
}

// In-game distance tracker
const distanceToFinish = () => {setInterval (function() {
  if (distance <= 0) {
    clearInterval(distanceToFinish);
    distance = 0;
  } else {
    distance -= startSpeed;
  }}, 500)}

// Draw distance on game screen
const drawDistance = () => {
  ctx.font = "18px Bungee Inline";
  ctx.fillStyle = "#FFFFFF";
  ctx.fillText(`${Math.floor(distance)},000`, canvas.width - 465, canvas.height - 40);
  ctx.fillText('Light Years Away', canvas.width - 465, canvas.height - 15);
  if (distance === 0) {
    ctx.clearRect(canvas.width - 465, canvas.height - 60, 100, 25);
    ctx.fillText('- - -', canvas.width - 463, canvas.height - 40);
  }
}

// Draw racer on game screen
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

// Hitbox of Racer (for testing)
const drawHitbox = () => {
  ctx.beginPath();
  ctx.rect(racerX, canvas.height - racerHeight * 1.40, racerWidth, canvas.height - 50);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.closePath();
}

// Draw finish line on game screen
const drawWin = () => {
  ctx.font = "48px Bungee Inline";
  ctx.fillStyle = "yellow";
  ctx.fillText("GOT EEEM", canvas.width / 2 - 125, yWin);
}

// First obstacle placeholder
obstacles[0] = {
  x: Math.floor(Math.random() * ((canvas.width - 58) - 100 + 1) + 58),
  y: 0
}

// Overall Function to Run Game
const play = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // drawHitbox();
  drawRacer();
  drawTime();
  drawDistance();
  
  // Key Right & Left
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

  let explosion = new Image();
  explosion.src = "./images/explosion.gif";

  // https://banner2.kisspng.com/20180406/aaw/kisspng-pixel-art-death-star-death-star-5ac75cab1155d1.312653581523014827071.jpg
  let deathstar = new Image();
  deathstar.src = "./images/deathstar.png"

  // Draws Finish Line
  if (distance === 0) {
    ctx.drawImage(deathstar, canvas.width / 2 - 215, yFinish - 100, 420, 350);
    drawWin();
    if (yFinish <= 210) {
      yFinish += 1.5;
    }
    if (yWin >= canvas.height - 200) {
      yWin -= 1.5;
    }
  }

  for (let i = 0; i < obstacles.length; i++) {
    // Collision Detection - restarts speed
    if (obstacles[i].x + 38 > racerX && obstacles[i].x + 38 < racerX + racerWidth && obstacles[i].y > canvas.height - racerHeight * 2 && obstacles[i].y < canvas.height - 85) {
      ctx.drawImage(explosion, obstacles[i].x - 70, obstacles[i].y - 10, 200, 200);
      obstacles[i].y += startSpeed;
      startSpeed = 1.5;
    } else if (obstacles[i].x + 38 > racerX && obstacles[i].x + 38 < racerX + racerWidth && obstacles[i].y > canvas.height - racerHeight * 1.4) {
      ctx.drawImage(explosion, obstacles[i].x - 70, obstacles[i].y - 10, 200, 200);
      obstacles[i].y += startSpeed;
    } else {
      ctx.drawImage(asteroid, obstacles[i].x, obstacles[i].y, 75, 150);
      obstacles[i].y += startSpeed;
    }
    
    if (distance === 0) {
      return;
    }
  }

  // Pushes new obstacles to array
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
}

// Start screen
drawStartScreen();

// Click to Play functionality
function playGame() {
  $("#myCanvas").on("click", () => {
    $("#myCanvas").off("click");
    $("#play-screen").css("display","none");
    $("#click").css("display","none");
    timer();
    gameSpeed();
    distanceToFinish();
    setInterval(play, 1000 / framesPerSecond);
  })
}

// Key Press Event Listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
canvas.addEventListener("click", playGame(), false);

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


