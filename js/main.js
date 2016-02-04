console.log ("Balloon Pop Loaded!");

/* Data Model */

var gamePaused = true;
var timer;
var points = 0;
var balloons = [
  new Balloon(600, 400),
  new Balloon(400, 400),
  new Balloon(200, 400),
  new Balloon(300, 400)
];

var bombs = [
  new Bomb(200, 400),
  new Bomb(300,600)
];

// //to create more ballons
//for(var i = 0; i < 10; i ++) {
//   balloons.push(new Balloon(Math.round((Math.random() * 500)),
//   Math.round((Math.random() * 500))))
// }


/*
 * x, y -> the coordinates on the canvas (where it is!)
 */
function Balloon(x, y, fillColor) {
  this.x = x || 0;
  this.y = y || 0;
  this.radius = 30;
  this.color  = "#1E90FF" || fillColor; /* Dodger blue baby */
}

Balloon.prototype.pop = function() {
  this.radius = 0;
}

function Bomb(x, y, fillColor) {
  this.x = x || 0;
  this.y = y || 0;
  this.radius = 30;
  this.color  = "#1a0000" || fillColor;
}

Bomb.prototype.explode = function() {
  this.radius = 0;
}


/* Game Behavior */

// Start game
var startGame = function() {
  console.log("Game starting…");

  timer = setInterval(tick, 50);


};

var pauseGame = function() {
  clearInterval(timer);
}

/* VIEW helpers *******************************************************/

Balloon.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fillStyle = this.color; // FIXME!
  ctx.fill();
}

Bomb.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fillStyle = this.color;
  ctx.fill();
}

var canvas = {
  width:  700,
  height: 400
};




/* VIEW render ********************************************************/

var render = function() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw balloons
  for (var i = 0; i < balloons.length; i++) {
    balloons[i].draw();

  // Draw bombs
  for (var i = 0; i < bombs.length; i++) {
    bombs[i].draw();

    ctx.font = "30px helvetica"
    ctx.fillStyle = "FFFFFF";
    ctx.fillText(points, 330, 30);
    }
  }
};

var canvasEl = document.getElementById("main-canvas");
var ctx      = canvasEl.getContext("2d");
var $canvas  = $("#main-canvas");




/* Interaction ********************************************************/

var tick = function() {
  // Balloons float up
  for (var i = 0; i < balloons.length; i++) {
    balloons[i].y = balloons[i].y - 5;

  for (var i = 0; i < bombs.length; i++) {
    bombs[i].y = bombs[i].y - 5;

    }
  }

  render();
};


// $canvas.on("click", startGame);
startGame();

$canvas.on("click", function(evt) {
  console.log("CLICKED:", evt.offsetX, evt.offsetY);

  for (var i = 0; i < balloons.length; i++) {
    if(evt.offsetX <= balloons[i].x + 30 && evt.offsetX >= balloons[i].x - 30) {
      if(evt.offsetY <= balloons[i].y + 30 && evt.offsetY >= balloons[i].y - 30) {
        balloons[i].pop(); //removes balloon from canvas
        points = points + 100; //adds 100 points for each balloon clicked
        console.log("POP!")
      }
    }
  }
  for (var i = 0; i < bombs.length; i++) {
    if(evt.offsetX <= bombs[i].x + 30 && evt.offsetX >= bombs[i].x - 30) {
      if(evt.offsetY <= bombs[i].y + 30 && evt.offsetY >= bombs[i].y - 30) {
        bombs[i].explode(); //removes bombs from canvas
        points = points - 100; //minus 100 points for each bomb clicked
        console.log("BOOM!")
      }
    }
  }
});




