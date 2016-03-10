var timer = new Timer();

var counter = {
  number: 0,

  display: function () {
    textSize(40);
    fill(255);
    text(this.number, 350, 350);
  },

  update: function() {

  },

  addOneToScore:function(){
      this.number++;
      console.log("Increment score to " + this.number);
  },

};

var balls = [];

var startingBalls = 20;
/*
var initializeBall = function (ball, oneBall, array) {
  ball.initialize();
};

var updateAndDisplay = function(ball, oneBall, array) {
  ball.update();
  ball.display();
};

*/

/*
  NOT PACMAN GAME
  This is the object where you should write just about all your code for this assignment.

*/

// constructor function
var NotPacmanGame = function () {

};

NotPacmanGame.prototype = {

  initialize: function () {
    createCanvas(400, 400);
    while (balls.length < startingBalls) balls.push(new BouncyBall(width/2, height/2));
    balls.forEach(initializeBall);
    this.keyedUpBall = new KeyedUpBall(25, 25);
    this.keyedUpBall.initialize();
},

  update: function () {
    this.keyedUpBall.update();
    balls.forEach(this.checkBallToDelete, this);
  },

display: function () {
      background(0);
      text(timer.getPrettyElapsedTime(), 50, 350);
      textSize(40);
      fill(255);
      balls.forEach(updateAndDisplay);
      this.keyedUpBall.update();
      this.keyedUpBall.display();
      balls.forEach(this.updateAndDisplayBalls);
      this.checkBallToDelete();
      counter.display();
      counter.addOneToScore();
      console.log("Testing display.");

  },

  checkBallToDelete: function(otherBall, oneBall, array) {
        if (this.keyedUpBall.detectCollision(otherBall)) this.deleteBallHere(oneBall);
    },

  deleteBallHere: function(oneBall) {
        console.log("Deleting ball at " + oneBall);
        balls.splice(oneBall, 1);
    },

  updateAndDisplayBalls: function(ball, index, array) {
    ball.update();
    ball.display();
  },
};
