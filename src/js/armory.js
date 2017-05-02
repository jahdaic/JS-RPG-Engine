// Armory Class

var Armory = function ()
{
	////////////////////////////////////
	// ITEMS (PROPERTIES)             //
	////////////////////////////////////

	this.crackedBat = {
		name: 'Cracked Bat',
		type: 'weapon',
		attack: 4,
		sound: 'slash'
	}

	this.baseballCap = {
		name: 'Baseball Cap',
		type: 'helmet',
		defense: 5
	};

	////////////////////////////////////
	// METHODS                        //
	////////////////////////////////////

	// Get Item Data
	this.getItemData = function ( item )
	{
		return this[ item ];
	};
};