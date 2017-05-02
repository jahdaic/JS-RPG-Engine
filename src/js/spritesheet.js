// Spritesheet Class

var Spritesheet = function ()
{
	////////////////////////////////////
	// ITEMS (PROPERTIES)             //
	////////////////////////////////////

	this.ness = {
		fight: 'ness-up'
	}

	this.paula = {
		fight: 'paula-up'
	};

	this.snake = {
		fight: 'snake'
	};

	this.crow = {
		fight: 'crow'
	};

	////////////////////////////////////
	// METHODS                        //
	////////////////////////////////////

	// Get Sprite Data
	this.getSpriteData = function ( spriteset )
	{
		return this[ spriteset ];
	};
};

