import { detectCollision } from "/src/collisionDetection";

class Ball {
  constructor(game) {
    this.game = game;
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    this.speed = { x: -4, y: -3 };
    this.position = { x: this.game.gameWidth / 2, y: this.game.gameHeight / 2 };

    this.size = 14;
    this.radius = this.size / 2;

    this.reset();
  }
  setRandomStartDirection() {
    const xOptions = [-5, 5];
    const yOptions = [-3, 3];

    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
    let xNew = xOptions[getRandomInt(xOptions.length)];
    let yNew = yOptions[getRandomInt(yOptions.length)];

    this.speed = { x: xNew, y: yNew };
    this.position = { x: this.game.gameWidth / 2, y: this.game.gameHeight / 2 };
  }

  reset() {
    this.setRandomStartDirection();
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.fill();
  }

  update(deltaTime) {
    // first update speed (current position) relative to previous position
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // wall top or bottom of screen
    if (
      this.position.y - this.radius < 0 ||
      this.position.y + this.radius > this.gameHeight
    ) {
      this.speed.y = -this.speed.y;
    }

    // left wall collision
    if (this.position.x - this.radius <= 0) {
      this.game.scoreBoard.addPointToRightPlayer();
      this.reset();
    }

    // right wall collision
    if (this.position.x + this.radius >= this.game.gameWidth) {
      this.game.scoreBoard.addPointToLeftPlayer();
      this.reset();
    }

    // check collision with LEFT paddle
    if (detectCollision(this, this.game.paddleLeft)) {
      this.speed.x = -this.speed.x;
    }
    // check collision with RIGHT paddle
    if (detectCollision(this, this.game.paddleRight)) {
      this.speed.x = -this.speed.x;
    }
  }
}

export default Ball;
