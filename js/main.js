console.log ("Balloon Pop Loaded!");


/* Data Model */

var canvas = {
  width:  700,
  height: 600
};

var canvasEl = document.getElementById("main-canvas");
var ctx      = canvasEl.getContext("2d");
var $canvas  = $("#main-canvas");

var gamePaused = true;
var getWinner = false;
var timer;
var points = 0;
var balloons = [
  new Balloon(100, 600),
  new Balloon(300, 600),
  new Balloon(350, 600),
  new Balloon(570, 600)
];

var bombs = [
  new Bomb(250, 0),
  new Bomb(450, 0),
];

var winner = function drawWinnerText() {
  var ctx = document.getElementById('main-canvas').getContext('2d');
  ctx.font = "200px impact";
  ctx.fillStyle = "#ffffff";
  //ctx.strokeStyle = "#000000";
  ctx.fillText("WINNER", 40, 300);

};


// triggers the balloon generator
var roundAmt = 2;
/* Game Behavior */

// Start game
var startGame = function() {
  console.log("Game starting…");
  timer = setInterval(tick, 20);
};


function roundTwo() {
  // Balloon.prototype.make10balloons();

  for(var i = 0; i< roundAmt; i++){
    console.log("Next Round"); //call this on the canvas
    Balloon.prototype.make10balloons();
    Bomb.prototype.make10bombs();
  }
};



/* Interaction ********************************************************/

var tick = function() {
  // Balloons float up
  for (var i = 0; i < balloons.length; i++) {
    balloons[i].y = balloons[i].y - 7;
  }
  for (var i = 0; i < bombs.length; i++) {
    bombs[i].y = bombs[i].y + 5;
    }
  render();
  if (balloons[balloons.length - 1].y < 0) {
     console.log("check")
     roundTwo();
     if (roundAmt < 7) roundAmt++;
  }

   if (points >= 1000) {   //get winnder
    getWinner = true;
    pauseGame();
    winner();//text(winner);
    playKarateKid();
    console.log("Graaavy!")
  }
};


/* VIEW render */

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
  }
};

 //to create more ballons & bombs

Balloon.prototype.make10balloons = function() {
  for(var i = 0; i < 1; i ++) {
     balloons.push(new Balloon(Math.round((Math.random() * 600)),
     Math.round((Math.random() * 600) + 800)))
   }
     balloons.push(new Balloon(200, 600));
     console.log("just printed last balloon");
}


Bomb.prototype.make10bombs = function() {
  for(var i = 0; i < 4; i ++) {
     bombs.push(new Bomb(Math.round((Math.random() * 600)),
     Math.round((Math.random() * 400) + 0)))
   }
     bombs.push(new Bomb(350, 600));
     console.log("last bomb");
}


/*
 * x, y -> the coordinates on the canvas
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


/* VIEW helpers */
//draws balloons on canvas
Balloon.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
  ctx.closePath();
  ctx.fillStyle = this.color;
  ctx.fill();
}
//draws bombs on canvas
Bomb.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
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
        playPopSound();
        points += 50; //adds 100 points for each balloon clicked
        console.log("POP!");
      }
    }
  }

  for (var i = 0; i < bombs.length; i++) {
    if(evt.offsetX <= bombs[i].x + 30 && evt.offsetX >= bombs[i].x - 30) {
      if(evt.offsetY <= bombs[i].y + 30 && evt.offsetY >= bombs[i].y - 30) {
        bombs[i].explode(); //removes bombs from canvas
        points -= 100 ; //minus 100 points for each bomb clicked
        console.log("BOOM!")
        playBombSound();
      }
    }
  }
});

$("#button").on("click", startGame)
$("#button2").on("click", pauseGame)



//audio manipulation

var pop = new Audio("./sounds/pop2.wav")
var bomb = new Audio("./sounds/bomb.mp3")
var karateKid = new Audio("./sounds/karatekid.mp3")

function playPopSound() {
  pop.play();
}

function playBombSound() {
  bomb.play();
}

function playKarateKid() {
  karateKid.play();
}

