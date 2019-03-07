import { detectCollision } from "/src/collisionDetection";

class Ball {
  constructor(game) {
    this.game = game;
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    //this.image = document.getElementById("img-ball");

    this.size = 14;
    this.radius = this.size / 2;

    this.reset();
  }

  reset() {
    // add reset condition, position for mid round & player

    // reset initial position // TODO
    this.speed = { x: -3, y: -2 };
    this.position = { x: this.game.gameWidth / 2, y: this.game.gameHeight / 2 };
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
