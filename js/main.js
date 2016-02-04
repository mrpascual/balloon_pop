console.log ("Balloon Pop Loaded!");
//////////CREATE A CALL BACK FUNCTION
//////////WITH A SETTIMEOUT FUNCTION INSIDE OF IT
//////////ADD RECURSION FUNCTION
//////////OPTIONAL: IF MADE IT TO ROUND 10, AND HAVE 5000 POINTS, CONSOLELOG YOU WIN


/* Data Model */

var canvas = {
  width:  700,
  height: 600
};

var canvasEl = document.getElementById("main-canvas");
var ctx      = canvasEl.getContext("2d");
var $canvas  = $("#main-canvas");

var gamePaused = true;
var timer;
var points = 0;
var balloons = [
  new Balloon(100, 600),
  new Balloon(300, 600),
  new Balloon(500, 600),
  new Balloon(570, 600)
];

var bombs = [
  new Bomb(250, 600),
  new Bomb(450,600),
  new Bomb(600, 600),
  new Bomb(180,600)
];


var roundAmt = 2;
/* Game Behavior */

// Start game
var startGame = function() {
  console.log("Game starting…");
  timer = setInterval(tick, 30);
};


function roundTwo() {
  // Balloon.prototype.make10balloons();

  for(var i = 0; i< roundAmt; i++){
    console.log("Next Round");
    Balloon.prototype.make10balloons();
    Bomb.prototype.make10bombs();
  }
};




//function callMeBack() {
//  console.log("woot woot!");
// Balloon.prototype.make10balloons();
//  Bomb.prototype.make10bombs();
//  if (balloons[10].y === 50){
//    console.log("yo")
//  } else if(balloons[14].y === 0) {
//    Balloon.prototype.make10balloons();
//  }


//};

//var cb = setTimeout(callMeBack, 5000);

/* Interaction ********************************************************/

var tick = function() {
  // Balloons float up
  for (var i = 0; i < balloons.length; i++) {
    balloons[i].y = balloons[i].y - 5;

  }
  for (var i = 0; i < bombs.length; i++) {
    bombs[i].y = bombs[i].y - 5;
    }
  render();
  if (balloons[balloons.length - 1].y < 0) {
     console.log("check")
     roundTwo();
     if (roundAmt < 7) roundAmt++;
  }


//callMeBack();
};


/* VIEW render ********************************************************/

var render = function() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw balloons
  for (var i = 0; i < balloons.length; i++) {
    balloons[i].draw();
}
 // Draw bombs
  for (var i = 0; i < bombs.length; i++) {
    bombs[i].draw();

    $('#points').text(points);
    // ctx.font = "30px helvetica"
    // ctx.fillStyle = "FFFFFF";
    // ctx.fillText(points, 330, 45);
    }
  };


 //to create more ballons & bombs

Balloon.prototype.make10balloons = function() {
  for(var i = 0; i < 5; i ++) {
     balloons.push(new Balloon(Math.round((Math.random() * 700)),
     Math.round((Math.random() * 600) + 800)))
   }
     balloons.push(new Balloon(350, 600));
     console.log("just printed last balloon");
}


Bomb.prototype.make10bombs = function() {
  for(var i = 0; i < 5; i ++) {
     bombs.push(new Bomb(Math.round((Math.random() * 700)),
     Math.round((Math.random() * 600) + 800)))
   }
     bombs.push(new Bomb(350, 600));
     console.log("last bomb");
}


/*
 * x, y -> the coordinates on the canvas (where it is!)
 */
function Balloon(x, y, fillColor) {
  this.x = x || 0;
  this.y = y || 0;
  this.radius = 30;
  this.color  = "#1E90FF" || fillColor;
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


var pauseGame = function() {
  clearInterval(timer);
}


/* VIEW helpers *******************************************************/
//draws balloons on canvas
Balloon.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fillStyle = this.color;
  ctx.fill();
}
//draws bombs on canvas
Bomb.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fillStyle = this.color;
  ctx.fill();
}

// $canvas.on("click", startGame);
$canvas.on("click", function(evt) {
  console.log("CLICKED:", evt.offsetX, evt.offsetY);
  for (var i = 0; i < balloons.length; i++) {
    if(evt.offsetX <= balloons[i].x + 30 && evt.offsetX >= balloons[i].x - 30) {
      if(evt.offsetY <= balloons[i].y + 30 && evt.offsetY >= balloons[i].y - 30) {
        balloons[i].pop(); //removes balloon from canvas

        //balloons[i].make10balloons();
        points += 100; //adds 100 points for each balloon clicked
        console.log("POP!");
      }
    }
  }



  for (var i = 0; i < bombs.length; i++) {
    if(evt.offsetX <= bombs[i].x + 30 && evt.offsetX >= bombs[i].x - 30) {
      if(evt.offsetY <= bombs[i].y + 30 && evt.offsetY >= bombs[i].y - 30) {
        bombs[i].explode(); //removes bombs from canvas
        points -= 200 ; //minus 100 points for each bomb clicked
        console.log("BOOM!")
      }
    }
  }
});

startGame();

