import Game from "/src/game";

const canvas = document.getElementById("game-screen");
const ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

let lastTime = 0;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);
// game.start(); // moved to inputs.js

function gameLoop(timestamp) {
  // calc how much time has passed
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  // Draw dashes
  ctx.setLineDash([15, 5]);
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.moveTo(GAME_WIDTH / 2, 0);
  ctx.lineTo(GAME_WIDTH / 2, GAME_HEIGHT);
  ctx.stroke();

  game.update(deltaTime);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
