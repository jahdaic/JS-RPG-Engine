// Bestiary Class

// Constructor
var Armory = function() {
};

module.exports = Armory;

////////////////////////////////////
// MONSTERS                       //
////////////////////////////////////

Armory.prototype.slime = {
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
Armory.prototype.getItemData = function( item ) {
	
	return this[ item ];
};