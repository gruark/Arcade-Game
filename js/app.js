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

// Now write your on player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(){
    this.sprite = 'images/technigal.png';
    this.x = 200;
	this.y = 350;
	this.width = 75;
	this.height = 75;
};

Player.prototype.update = function(dt) {
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
	
	if(this.y === 30){
		this.y = 350;
	    toggleModal();
	}
};

Player.prototype.handleInput = function(e) {

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



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

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


