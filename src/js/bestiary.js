// Bestiary Class

var Bestiary = function ()
{
	////////////////////////////////////
	// MONSTERS                       //
	////////////////////////////////////

	Bestiary.prototype.slime = {
		name: 'Basic Bitch Slime',
		maxHealth: 25,
		attack: 1,
		speed: 1,
		experienceGiven: 1,
		defaultWeapon: 'Slimy Bits',
		attackChance: 15 / 20,
		defendChance: 5 / 20,
		magicChance: 0,
		itemChance: 0
	};

	Bestiary.prototype.snake = {
		name: 'Coil Snake',
		maxHealth: 18,
		attack: 3,
		defense: 4,
		speed: 2,
		experienceGiven: 1,
		moneyGiven: 4,
		defaultWeapon: 'Biting Attack',
		attackChance: 15 / 20,
		defendChance: 5 / 20,
		magicChance: 0,
		itemChance: 0,
		sprites: 'snake'
	};

	Bestiary.prototype.crow = {
		name: 'Spiteful Crow',
		maxHealth: 24,
		attack: 5,
		defense: 3,
		speed: 77,
		experienceGiven: 3,
		moneyGiven: 5,
		defaultWeapon: 'Beak',
		attackChance: 10 / 20,
		defendChance: 0,
		magicChance: 0,
		itemChance: 0,
		sprites: 'crow'
	};

	////////////////////////////////////
	// MONSTER GROUPS                 //
	////////////////////////////////////

	////////////////////////////////////
	// METHODS                        //
	////////////////////////////////////

	// Get Monster Data
	Bestiary.prototype.getMonsterData = function ( monster )
	{
		return this[ monster ];
	};
};