// Enemies our player must avoid

	 
var Enemy = function(y, minSpeed, maxSpeed) {
    this.sprite = 'images/enemy-bug.png';
  	this.x = 0;
  	this.y = y;
  	this.width = 100;
  	this.height = 65; 
	this.max = maxSpeed;
	this.min = minSpeed;
};
	

// Updates the enemy's positions using
// Parameter: dt, a time delta between ticks
// Modified from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

Enemy.prototype.update = function(dt) {
	  let min = Math.ceil(this.min);
	  let max = Math.floor(this.max);
      this.time = Math.floor(Math.random() * (max - min + 1)) + min;
      this.time = this.time * dt * 10;
      this.x += this.time;
	  
};

// Draw the enemy on the screen, required method for game

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	if (this.x >= 420){
		this.x = 0;
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

};

// Create the Player and its prototypes

var Player = function(){
    this.sprite = 'images/technigal.png';
    this.x = 200;
	this.y = 350;
	this.width = 75;
	this.height = 75;
};

Player.prototype.update = function() {
	//Set canvas boundaries for the player
	if(this.x < 0){
		this.x = 0;
	} if (this.y < 30){
		this.y = 30;
	} if (this.y >= 350) {
        this.y = 350;
    } if (this.x >= 400) {
		this.x = 400;
	}
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	//If Player reaches the computers, trigger the modal and reset the player.
	   if(this.y === 30){
		  this.y = 350;
	      toggleModal();
	  }

};

Player.prototype.handleInput = function(e) {
//Handles movement of the player.  Modified from https://stackoverflow.com/questions/23585320/how-to-move-object-with-keyboard-in-javascript
	switch (e){
    case 'left':
	  this.x += -50;
	  break;
	case 'right':
	  this.x += 50;
	  break;
	case 'up':
	 this.y += -50;
	  break;
	case 'down':
	  this.y += 50;
	  break;
   }	
};


// allEnemy array sets y coordinate, min, and max speeds for the enemies

let allEnemies = [new Enemy(180, 5, 35), new Enemy(100, 5, 20), new Enemy(250, 10, 40)]; 
let player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);

});

//Check for collisions.  Modified from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

function checkCollisions(){
	playerX = player.x;
	playerY = player.y;
	playerW = player.width;
	playerH = player.height;
	
	for(var i = 0; i < allEnemies.length; i++){
	if (playerX < allEnemies[i].x + allEnemies[i].width  && playerX + playerW  > allEnemies[i].x &&
		playerY < allEnemies[i].y + allEnemies[i].height && playerY + playerH > allEnemies[i].y) {
        player.x = 200;
	    player.y = 350;
	} 
	}
};


// Modal display modified from https://sabe.io/tutorials/how-to-create-modal-popup-box

var modal = document.querySelector(".modal");
document.querySelector('.modalRestart').addEventListener('click', toggleModal);

function toggleModal(){
  modal.classList.toggle("show-modal");
  closeModal();
}

function closeModal(){
   var closeButton = document.querySelector(".close-button");
   closeButton.addEventListener("click", toggleModal);
}


