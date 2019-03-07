class ScoreBoard {
  constructor(game) {
    this.game = game;

    this.scoreLeftPlayer = 0; // save score state in game component???
    this.scoreRightPlayer = 0; // save score state in game component???

    this.fontSize = 60;
    this.fontType = "'Press Start 2P'";
    this.font = `${this.fontSize}px ${this.fontType}`;

    // canvas position for 2 player scores
    this.positionLeft = {
      x: this.game.gameWidth / 2 - (this.fontSize + 30),
      y: this.fontSize + 10
    };
    this.positionRight = {
      x: this.game.gameWidth / 2 + this.fontSize + 30,
      y: this.fontSize + 10
    };
  }

  addPointToLeftPlayer() {
    this.scoreLeftPlayer++;
  }
  addPointToRightPlayer() {
    this.scoreRightPlayer++;
  }

  draw(ctx) {
    //draw left score
    ctx.font = this.font;
    ctx.textAlign = "center";
    ctx.fillText(
      this.scoreLeftPlayer,
      this.positionLeft.x,
      this.positionLeft.y
    );

    // draw right score
    ctx.font = this.font;
    ctx.textAlign = "center";
    ctx.fillText(
      this.scoreRightPlayer,
      this.positionRight.x,
      this.positionRight.y
    );
  }
  update(deltaTime) {}
}

export default ScoreBoard;
