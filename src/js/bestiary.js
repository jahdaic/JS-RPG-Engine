// Bestiary Class

// Constructor
var Bestiary = function() {
};

module.exports = Bestiary;

////////////////////////////////////
// MONSTERS                       //
////////////////////////////////////

Bestiary.prototype.slime = {
	maxHealth: 3,
	maxMagic: 0,
	attack: 1,
	defense: 0
};

////////////////////////////////////
// MONSTER GROUPS                 //
////////////////////////////////////



////////////////////////////////////
// METHODS                        //
////////////////////////////////////

// Get Monster Data 
Bestiary.prototype.getMonsterData = function( monster ) {
	
	return this[ monster ];
};