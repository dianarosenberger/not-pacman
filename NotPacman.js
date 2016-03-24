var timer = new Timer();

var counter = {
  number: 0,
  display: function () {
    textSize(40);
    fill(255);
    text(this.number, 350, 350);
},
};

var balls = [];

var startingBalls = 20;


var initializeBall = function (ball, oneBall, array) {
  ball.initialize();
};

var updateAndDisplay = function(ball, oneBall, array) {
  ball.update();
  ball.display();
};


var NotPacmanGame = function () {

};

NotPacmanGame.prototype = {

  initialize: function () {
    createCanvas(400, 400);
    timer.pause();
    this.gameInPlay = false;
},

  update: function () {

  },

  display: function () {
    background(0);
    counter.display();
    text(timer.getPrettyElapsedTime(), 50, 350);
    textSize(40);
    fill(255);
    if (this.gameInPlay) this.keepPlaying();
  },


checkBallToDelete: function(otherBall, oneBall, array) {
  if (this.keyedUpBall.detectCollision(otherBall)) this.deleteBallHere(oneBall);
},

deleteBallHere: function(oneBall) {
  balls.splice(oneBall, 1);
  counter.number ++;
},

updateAndDisplayBalls: function(ball, index, array) {
  ball.update();
  ball.display();
},

startGame: function () {
  while (balls.length < startingBalls) balls.push(new BouncyBall(width/2, height/2));
  balls.forEach(initializeBall);
  this.keyedUpBall = new KeyedUpBall(25, 25);
  this.keyedUpBall.initialize();
  timer.unpause();
  this.gameInPlay = true;
},

keepPlaying: function () {
  this.keyedUpBall.update();
  balls.forEach(this.checkBallToDelete, this);
  if (balls.length === 0) timer.pause();
  if (balls.length > 0) this.keyedUpBall.display();
  balls.forEach(this.updateAndDisplayBalls);

}
};
