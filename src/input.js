class InputHandler {
  constructor(paddleLeft, paddleRight, game) {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 38:
          paddleRight.moveUp();
          break;
        case 40:
          paddleRight.moveDown();
          break;
        case 37:
          paddleLeft.moveUp();
          break;
        case 39:
          paddleLeft.moveDown();
          break;
      }
    });

    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 38:
          if (paddleRight.speed < 0) {
            paddleRight.stop();
          }
          break;

        case 40:
          if (paddleRight.speed > 0) {
            paddleRight.stop();
          }
          break;
        case 37:
          if (paddleLeft.speed < 0) {
            paddleLeft.stop();
          }
          break;

        case 39:
          if (paddleLeft.speed > 0) {
            paddleLeft.stop();
          }
          break;
        case 27:
          game.togglePause();
          break;
        case 32:
          game.start();
          break;
      }
    });
  }
}

export default InputHandler;
