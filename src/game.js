import PaddleRight from "/src/paddle-right";
import PaddleLeft from "/src/paddle-left";
import InputHandler from "/src/input";
import Ball from "/src/ball";
import ScoreBoard from "/src/scoreboard";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4,
  WINNER: 5
};

class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = GAMESTATE.MENU;

    this.paddleLeft = new PaddleLeft(this);
    this.paddleRight = new PaddleRight(this);
    this.ball = new Ball(this);
    this.scoreBoard = new ScoreBoard(this);
    this.gameObjects = [];

    // this.scoreLeftPlayer = 0;
    // this.scoreRightPlayer = 0;
    // this.currentRound = 0;
    new InputHandler(this.paddleLeft, this.paddleRight, this);

    this.fontSize = 30;
    this.fontType = "'Press Start 2P'";
    this.font = `${this.fontSize}px ${this.fontType}`;
  }

  start() {
    if (
      this.gamestate !== GAMESTATE.MENU &&
      this.gamestate !== GAMESTATE.NEWLEVEL
    ) {
      return;
    }

    this.ball.reset();

    // todo - reset scores, paddles...

    this.gameObjects = [
      this.ball,
      this.paddleLeft,
      this.paddleRight,
      this.scoreBoard
    ];

    this.gamestate = GAMESTATE.RUNNING;
  }

  update(deltaTime) {
    // ignore update if game is not in play
    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER ||
      this.gamestate === GAMESTATE.WINNER
    )
      return;

    // update game objects if state runnning or newlevel
    [...this.gameObjects].forEach(object => {
      object.update(deltaTime);
    });
  }

  draw(ctx) {
    // draw all game objects
    [...this.gameObjects].forEach(object => {
      object.draw(ctx);
    });

    // draw gamestate screens if game not in play

    if (this.gamestate === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.fill();

      ctx.font = this.font;
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }
    if (this.gamestate === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = this.font;
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Press SPACEBAR to Start",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }
    if (this.gamestate === GAMESTATE.WINNER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = this.font;
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("WINNER!", this.gameWidth / 2, this.gameHeight / 2);
    }
    if (this.gamestate === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = this.font;
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
    }
  }

  togglePause() {
    if (this.gamestate === GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}

export default Game;
