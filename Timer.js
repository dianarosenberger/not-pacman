/*
  TIMER
  This is a simple timer that counts up from zero, and can render the time elapsed in a pretty mm:ss format.

  GENERAL USE:
  Make a new timer when you want one. If you ask it to getPrettyElapsedTime(), it returns the time elapsed in mm:ss format. It starts counting right away. You can pause, unpause, or restart the timer.

  SPECIFIC USE:
  This is pretty simple: it does what it says. It only updates when asked for the time. The only functions that the outside world need know about are:
  * a constructor, which takes no arguments
  * restart(), which restarts the timer
  * pause(), which pauses the timer at its current value
  * unpause(), which causes the timer to continue counting from its paused value
  * getPrettyElapsedTime(), which is a wordy description for returning a readable mm:ss representation of the time elapsed
*/

/*
  Timer constructor: takes no arguments and calls initialize() immediately, beginning the countup.
*/
var Timer = function () {
  this.initialize();
};

Timer.prototype = {

  // initialize() starts the counter running; this need only be used internally
  initialize: function() {
    this.init = Date.now();
    this.now = Date.now();
    this.running = true;
  },

  // restart() restarts the counter from zero
  restart: function() {
    this.initialize();
  },

  // pause() stops the timer at the current value
  pause: function() {
    this.running = false;
  },

  // unpause() resumes counting from the previously paused value
  unpause: function() {
    var elapsedSoFar = this.millisecondsElapsed();
    this.initialize();
    var newInit = new Date(this.now - elapsedSoFar);
    this.init = newInit.getTime();
  },

  // update() is only called internally; it effectively makes current the internal representation of time
  update: function() {
    if (this.running) this.now = Date.now();
  },

  // millisecondsElapsed() tells you how many millisconds have elapsed since the timer was last initialize()ed
  millisecondsElapsed: function() {
    this.update();
    return this.now - this.init;
  },

  // secondsElapsed() converts milliseconds elapsed to seconds elapsed
  secondsElapsed: function() {
    return Math.floor(this.millisecondsElapsed() / 1000);
  },

  // minutesElapsed() converts seconds elapsed to minutes elapsed
  minutesElapsed: function() {
    return Math.floor(this.secondsElapsed() / 60);
  },

  // getPrettyElapsedTime() returns the time elapsed since initialization in mm:ss format, as a string
  getPrettyElapsedTime: function() {
    return this.minutesElapsed() + this.getPrettySeconds();
  },

  // getPrettySeconds() calculates the seconds elapsed in a given minute, with a leading zero if necessary, as a string
  getPrettySeconds: function() {
    var secondCounter = this.secondsElapsed() % 60; // % is the modulo operator
    if (secondCounter < 10) secondCounter = "0" + secondCounter;
    return ":" + secondCounter;
  }
};
