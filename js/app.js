// Enemies our player must avoid

	 
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
  	this.x = 0;
  	this.y = Math.floor((Math.random() * 100) + 170);
  	this.width = 50;
  	this.height = 60; 
	this.speed = Math.floor((Math.random() * 35) + 9);
};
	

// Updates the enemy's positions using
// Parameter: dt, a time delta between ticks
// Modified from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random


Enemy.prototype.update = function(dt) {
	  this.time = this.speed;
      this.time = this.time * dt * 10;
      this.x += this.time;
	  
};

// Draw the enemy on the screen, required method for game

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	if (this.x >= 420){
		this.x = 0;
		this.y = Math.floor((Math.random() * 200) + 50);
		this.speed =  Math.floor((Math.random() * 35) + 5);
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

};

// Create the Player and its prototypes

var Player = function(){
    this.sprite = 'images/technigal.png';
    this.x = 200;
	this.y = 350;
	this.width = 50;
	this.height = 50;
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

//Check for collisions.  Modified from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

Player.prototype.checkCollisions = function(){
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


// allEnemy array sets y coordinate, min, and max speeds for the enemies

let allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()]; 
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


// Modal display modified from https://sabe.io/tutorials/how-to-create-modal-popup-box

var modal = document.querySelector('.modal');
document.querySelector('.modalRestart').addEventListener('click', toggleModal);

function toggleModal(){
  modal.classList.toggle('show-modal');
  closeModal();
}

function closeModal(){
   var closeButton = document.querySelector('.close-button');
   closeButton.addEventListener('click', toggleModal);
}


