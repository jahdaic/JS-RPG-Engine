// Game Class

var UI = require('ui');
var Vector2 = require('vector2');
var Settings = require('settings');
var Character = require( 'character' );

// Constructor
var Game = function() {	
};

////////////////////////////////////
// GAME OBJECTS                   //
////////////////////////////////////

Game.prototype.hero = new Character();

////////////////////////////////////
// SCREENS                        //
////////////////////////////////////

Game.prototype.start = new UI.Window({
	fullscreen: true
});

Game.prototype.world = new UI.Window({
	fullscreen: true,
	backgroundColor: 'green'
});

Game.prototype.menu = new UI.Window({
	fullscreen: true
});

////////////////////////////////////
// ENVIRONMENTAL VARIABLES        //
////////////////////////////////////

// World
Game.prototype.world.background      = null;
Game.prototype.world.avatar          = null;
Game.prototype.world.avatarState     = 1;
Game.prototype.world.avatarDirection = 'right';
Game.prototype.world.avatarTimers    = [];
Game.prototype.world.textbox         = null;
Game.prototype.world.dialog          = null;
Game.prototype.world.stats           = null;

// Menu
Game.prototype.menu.selection = 1;
Game.prototype.menu.hand = null;

////////////////////////////////////
// EVENTS                         //
////////////////////////////////////

// Press Start
Game.prototype.start.on('click', 'select', function(e) {
	
	Game.prototype.world.background = new UI.Image({
		position: new Vector2(0, 0),
		size: new Vector2(144, 168),
		image: 'images/test-bg.png'
	});
	
	Game.prototype.world.avatar = new UI.Image({
		position: new Vector2(62, 110),
		size: new Vector2(20, 45),
		image: 'images/hero-right-1.png',
		compositing: 'set'
	});
	
	Game.prototype.world.textbox = new UI.Image({
		position: new Vector2(2, 2),
		size: new Vector2(140, 51),
		image: 'images/textbox.png',
		compositing: 'set'
	});
	
	Game.prototype.world.dialog = new UI.Text({
		position: new Vector2(9, 9),
		size: new Vector2(126, 37),
		text: 'This is my text',
		font: 'gothic-14-bold',
		color: 'white'
	});
	
	var health = new UI.Text({
		position: new Vector2(2, 152),
		size: new Vector2(50, 15),
		text: 'HP ' + Game.prototype.hero.health + ' / ' + Game.prototype.hero.maxHealth,
		font: 'gothic-14-bold',
		color: 'white'
	});
	
	Game.prototype.world.add( Game.prototype.world.background );
	Game.prototype.world.add( Game.prototype.world.avatar );
	Game.prototype.world.add( Game.prototype.world.textbox );
	Game.prototype.world.add( Game.prototype.world.dialog );
	Game.prototype.world.add( health );
	
	Game.prototype.world.show();
});

// Call Menu
Game.prototype.world.on('click', 'back', function(e) {
	
	var menuBG = new UI.Image({
		position: new Vector2(0, 0),
		size: new Vector2(144, 168),
		image: 'images/menu-bg.png'
	});
			
	var level = new UI.Text({
		position: new Vector2(28, 68),
		size: new Vector2(50, 15),
		text: Game.prototype.hero.getLevel(),
		font: 'gothic-14-bold',
		color: 'white'
	});
	
	var health = new UI.Text({
		position: new Vector2(28, 86),
		size: new Vector2(50, 15),
		text: Game.prototype.hero.health + ' / ' + Game.prototype.hero.maxHealth,
		font: 'gothic-14-bold',
		color: 'white'
	});
	
	var magic = new UI.Text({
		position: new Vector2(28, 104),
		size: new Vector2(50, 15),
		text: Game.prototype.hero.magic + ' / ' + Game.prototype.hero.maxMagic,
		font: 'gothic-14-bold',
		color: 'white'
	});
	
	Game.prototype.menu.hand = new UI.Image({
		position: new Vector2(71, 11),
		size: new Vector2(16, 16),
		image: 'images/hand.png',
		compositing: 'set'
	});
	
	Game.prototype.menu.add( menuBG );
	Game.prototype.menu.add( health );
	Game.prototype.menu.add( level );
	Game.prototype.menu.add( magic );
	Game.prototype.menu.add( Game.prototype.menu.hand );
	
	Game.prototype.menu.show();
});

// Move Left
Game.prototype.world.on('longClick', 'up', function(e) { Game.prototype.startWalking( 'left' ); });

// Move Right
Game.prototype.world.on('longClick', 'down', function(e) { Game.prototype.startWalking( 'right' ); });

// Menu Up
Game.prototype.menu.on('click', 'up', function(e) {	Game.prototype.changeMenuSelection( -1 ); });

// Menu Down
Game.prototype.menu.on('click', 'down', function(e) { Game.prototype.changeMenuSelection( 1 ); });

////////////////////////////////////
// METHODS                        //
////////////////////////////////////

// Show title Screen
Game.prototype.startGame = function() {
	
	var title = new UI.Image({
		position: new Vector2(0, 0),
		size: new Vector2(144, 168),
		image: 'images/title.png'
	});

	Game.prototype.start.add( title );

	Game.prototype.start.show();
};

// Change selected menu option
Game.prototype.changeMenuSelection = function( change ) {
		
	if( !this.menu.selection ) this.menu.selection = 1;
	
	this.menu.selection = Math.max( Math.min( this.menu.selection + change, 5 ), 1 );
	
	var position = Game.prototype.menu.hand.position();
	position.y = this.menu.selection * 18 - 7;
	
	Game.prototype.menu.hand.animate('position', position, 250);
};

// Start Walking
Game.prototype.startWalking = function( direction ) {
	
	this.world.avatarDirection = direction;		
	this.world.avatarState = 1;
		
	this.setDialog( 'Moving: ' + direction );
	
	this.animateWalking( );
};

// Stop Walking
Game.prototype.animateWalking = function( ) {
	
	// So we don't get any conflicting loops, we cancel out the previous ones
	for ( var i = 0; i < Game.prototype.world.avatarTimers.length; i++ )
	{
		clearTimeout( Game.prototype.world.avatarTimers[i] );
	}
	
	Game.prototype.world.avatarTimers = [];
	
	Game.prototype.world.avatarState++;
	
	if( Game.prototype.world.avatarState > 4 ) Game.prototype.world.avatarState = 1;
	
	if( Game.prototype.world.avatarDirection == 'right' )
	{
		Game.prototype.world.avatar.image( 'images/hero-right-' + Game.prototype.world.avatarState + '.png' );
	}
	else
	{
		Game.prototype.world.avatar.image( 'images/hero-left-' + Game.prototype.world.avatarState + '.png' );
	}
	
	Game.prototype.world.avatarTimers.push( setTimeout( Game.prototype.animateWalking, 200 ) );
};

// Stop Walking
Game.prototype.stopWalking = function() {
	
};

// Display text in dialog box
Game.prototype.setDialog = function( dialog, more ) {
	
	this.world.dialog.text( dialog );
	
	// Add code for arrow indicating more text
};

// Save the game data to local storage
Game.prototype.saveGame = function() {
	
	var saveFile;
	
// 	saveFile.hero = hero;
	
	Settings.data('save', JSON.stringify( saveFile ) );
};

// Load game data from local storage and restore environment
Game.prototype.leadGame = function() {
	
// 	var saveFile = JSON.parse( Settings.data( 'save' ) );
	
// 	hero = saveFile.hero;
};

// Export the Class so we can use it
module.exports = Game;