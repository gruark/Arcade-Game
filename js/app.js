// Enemies our player must avoid
var Enemy = function(y) {
    this.sprite = 'images/enemy-bug.png';
  	this.x = 0;
  	this.y = y;
  	this.width = 100;
  	this.height = 65;
  	this.once = false;
};

// Updates the enemy's positions using
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    let time = Math.floor(Math.random() * 40) + 1;
    time = time * dt * 15;
    this.x += time;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

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
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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

var allEnemies = [new Enemy(180), new Enemy(100), new Enemy(250)];
var player = new Player();


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
