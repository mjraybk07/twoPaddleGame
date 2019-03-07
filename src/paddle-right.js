class PaddleRight {
  constructor(game) {
    this.game = game;
    this.width = 15;
    this.height = 100;
    this.speed = 0;
    this.maxSpeed = 9;
    this.position = {
      x: this.game.gameWidth - (this.width + 20),
      y: this.game.gameHeight / 2 - this.height / 2
    };
  }

  moveUp() {
    this.speed -= this.maxSpeed;
  }
  moveDown() {
    this.speed = this.maxSpeed;
  }
  stop() {
    this.speed = 0;
  }

  update(deltaTime) {
    // update current paddle position from previous
    this.position.y += this.speed;

    // set limits for top and bottom boundaries;
    if (this.position.y < 0) {
      this.position.y = 0;
    }
    if (this.position.y + this.height > this.game.gameHeight) {
      this.position.y = this.game.gameHeight - this.height;
    }
  }
  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

export default PaddleRight;
