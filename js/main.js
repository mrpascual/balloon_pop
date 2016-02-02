console.log ("Balloon Pop Loaded!");

/* Data Model */

var gamePaused = true;

function Shape(x,y,w,h,fill) {
  this.x = x || 0;
  this.y = y || 0;
  this.w = w || 1;
  this.h = h || 1;
  this.fill = fill || '#AAAAAA';
}

/* Game Behavior */

//start game
var startGame = function () {
  console.log("Game starting…");
};

/* VIEW: Helper methods */

// objects appears on screen
function draw (x,y) {
  ctx.clearRect(0,0,700,400); //clears canvas
  // ctx.fillStyle = "rgba(5,5,5,5)"; //balloon style
  // ctx.fillRect (200, y, 50, 50); // draws balloon
  y += -10; //increment the y position by some numeric value
  var loopTimer = setTimeout('draw('+x+','+y+')',30); //Animate
}

Shape.prototype.draw = function(ctx) {
  ctx.fillStyle = this.fill;
  ctx.fillRect(this.x, this.y, this.w, this.h);
}

var canvasEl = document.getElementById("main-canvas");
var ctx      = canvasEl.getContext("2d");

var $canvas  = $("#main-canvas");

$canvas.on("click", startGame);
