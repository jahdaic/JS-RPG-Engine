// Character Class

// Constructor
var Character = function( stats ) {
	if(typeof stats === 'undefined')
		stats = {};

	this.maxHealth       = ( stats.hasOwnProperty( 'maxHealth' ) )       ? stats.maxHealth       : 10;
	this.health          = ( stats.hasOwnProperty( 'health' ) )          ? stats.health          : this.maxHealth;
	this.experienceCurve = ( stats.hasOwnProperty( 'experienceCurve' ) ) ? stats.experienceCurve : [];
	this.experience      = ( stats.hasOwnProperty( 'experience' ) )      ? stats.experience      : 0;
	this.maxMagic        = ( stats.hasOwnProperty( 'maxMagic' ) )        ? stats.maxMagic        : 10;
	this.magic           = ( stats.hasOwnProperty( 'magic' ) )           ? stats.magic           : this.maxMagic;
	this.attack          = ( stats.hasOwnProperty( 'attack' ) )          ? stats.attack          : 1;
	this.defense         = ( stats.hasOwnProperty( 'defense' ) )         ? stats.defense         : 0;
	this.speed           = ( stats.hasOwnProperty( 'speed' ) )           ? stats.speed           : 1;
};

module.exports = Character;

////////////////////////////////////
// Properties                     //
////////////////////////////////////

Character.prototype.status = [];

////////////////////////////////////
// METHODS                        //
////////////////////////////////////

// Set Health
Character.prototype.setHealth = function( health ) {
	
	this.health = Math.max( Math.min( health, this.maxHealth ), 0 );
};

// Recover Health
Character.prototype.recoverHealth = function( recovered ) {
	
	this.health = Math.min( (this.health + recovered), this.maxHealth );
};

// Take Damage
Character.prototype.takeDamage = function( damage ) {
	
	this.health = Math.max( (this.health - damage), 0 );
};

// Add a status to a character
Character.prototype.addStatus = function( status ) {
	if(this.status.indexOf( status ) == -1)
		this.status.push( status );
};

// Remove a status from a character
Character.prototype.removeStatus = function( status ) {

	var i = this.status.indexOf( status );
	
	if(i !== -1) {
		this.status.splice(i, 1);
	}
};

// Get Character's Level From Experience
Character.prototype.getLevel = function() {
	if(this.experienceCurve.length)
		return 0;
	else
		return 1;
};