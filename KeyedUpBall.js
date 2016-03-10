/*
  KEYED UP BALL
  KeyedUpBall is a "ball" (really, just a circle) that moves around a canvas in response to key presses from a user. It's a bit more complicated than that, but not by much. It uses p5.Vector objects as internal representation of position and direction, and a simple integer for speed. It also uses KeyListener objects to make it responsive.

  GENERAL USE:
  This is designed not as a general-purpose object, but it is a pattern that can be used for any number of moving objects. This is less a resuable object and more the sort of object pattern that will be very useful in future coding.

  SPECIFIC USE:
  Like most shapes, there are only really four things the outside world needs to know about:
  * The constructor, which takes an x and y for the starting position.
  * initialize(), which sets up the KeyListeners
  * display(), which of course draws the circle
  * update(), which updates state in response to any user actions
  * detectCollision(), which you have to write. See line 103.
*/

// constructor: takes a starting x and y position.
var KeyedUpBall = function(x, y) {
  this.position = new p5.Vector(x, y);
  this.direction = new p5.Vector(0, 0);
};

KeyedUpBall.prototype = {

  speed: 3, // speed is the speed at which the ball moves in a given direction in a given frame
  radius: 10, // instead of size, radius (this makes our math simpler)
  listeners: [], // this holds our listeners

  // below are the key mappings; these variables are defined on the prototype, but can easily be overwritten on a given instance
  keyUp: 'W', // describes the key to move the ball up
  keyLeft: 'A', // describes the key to move left
  keyDown: 'S', // decribes the key to move down
  keyRight: 'D', // describes the key to move right

  // initialize() sets up the KeyListeners on the movement keys
  initialize: function() {
    this.listeners.push(new KeyListener(this.keyUp, this.moveUp, this));
    this.listeners.push(new KeyListener(this.keyLeft, this.moveLeft, this));
    this.listeners.push(new KeyListener(this.keyDown, this.moveDown, this));
    this.listeners.push(new KeyListener(this.keyRight, this.moveRight, this));
  },

  // display() draws the InteractiveBall
  display: function() {
    noStroke();
    fill(52, 43, 231, 181);
    ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
  },

  // update() resets the direction of the ball to zero, so it can be changed by user interaction, then moves the ball
  update: function() {
    this.resetDirection();
    this.listen();
    this.move();
  },

  // listen() simply tells all listeners to listen
  listen: function() {
    this.listeners.forEach(function listen(listener) {
      listener.listen();
    });
  },

  // resetDirection() sets the direction vector to [0, 0]
  // this is called every update(); key presses work by modifying a baseline of [0, 0]
  resetDirection: function() {
    this.direction.x = 0;
    this.direction.y = 0;
  },

  // move()s the ball by adding the direction vector, constraining the ball's to the canvas
  move: function() {
    if (this.direction.mag() > 0) this.normalizeSpeed(); // if the vector has any magnitued, normalize it
    this.position.x = constrain(this.position.x + this.direction.x, this.radius, width - this.radius);
    this.position.y = constrain(this.position.y + this.direction.y, this.radius, height - this.radius);
  },

  // normalize() takes the direction vector and scales it so that its magnitude is always equivalent to speed
  // this is necessary so that diagonal movement isn't faster than horizontal or vertical movement
  normalizeSpeed: function() {
    this.direction.normalize(); // changes the vector so that it keeps its direction, but sets is magnitude to 1
    this.direction.mult(this.speed); // mutliplies by speed
  },

  // the various move functions modify a baseline direction vector of [0, 0]
  // they do so by adding and subtracting, so that opposite key presses cancel each other out
  moveUp: function() {
    this.direction.y -= 1;
  },

  moveLeft: function() {
    this.direction.x -= 1;
  },

  moveRight: function() {
    this.direction.x += 1;
  },

  moveDown: function() {
    this.direction.y += 1;
  },

  // checkForIntersection() should returns true if this ball intersects with another ball
  // for this to work, the other ball must have its position represented by a position object that has an x and y, as well as a radius, as our BouncyBall does
detectCollision: function(otherBall) {
  var distanceBetweenBalls = dist(this.position.x, this.position.y, otherBall.position.x, otherBall.position.y);
  var collisionDistance = this.radius + otherBall.radius;
  return (distanceBetweenBalls < collisionDistance);

  }

};
