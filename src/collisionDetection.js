export function detectCollision(ball, gameObject) {
  // check collision with paddle

  //   let leftSideOfBall = ball.position.x - ball.radius;
  //   let rightSideOfBall = ball.position.x + ball.radius;
  //   let topOfBall = ball.position.y - ball.radius;
  //   let bottomOfBall = ball.position.y + ball.radius;

  let leftSideOfObject = gameObject.position.x;
  let rightSideOfObject = gameObject.position.x + gameObject.width;
  let topOfObject = gameObject.position.y;
  let bottomOfObject = gameObject.position.y + gameObject.height;

  if (
    ball.position.x > leftSideOfObject &&
    ball.position.x < rightSideOfObject &&
    ball.position.y > topOfObject &&
    ball.position.y < bottomOfObject
  ) {
    return true;
  } else {
    return false;
  }
}
