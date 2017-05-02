// Roster Class

var Roster = function ()
{
	////////////////////////////////////
	// HEROES                         //
	////////////////////////////////////

	Roster.prototype.ness = {
		name: 'Ness',
		maxHealth: 30,
		maxMagic: 10,
		attack: 2,
		defense: 2,
		speed: 2,
		guts: 2,
		vitality: 2,
		iq: 2,
		luck: 2,
		experienceCurve: {
			attack: 18,
			defense: 5,
			speed: 4,
			guts: 7,
			vitality: 5,
			iq: 5,
			luck: 6
		},
		equipment: {
			weapon: 'crackedBat',
			armor: 'baseballCap'
		},
		sprites: 'ness'
	};

	Roster.prototype.paula = {
		name: 'Paula',
		defaultWeapon: 'Sassiness',
		maxHealth: 30,
		maxMagic: 10,
		attack: 2,
		defense: 2,
		speed: 2,
		guts: 2,
		vitality: 2,
		iq: 2,
		luck: 2,
		experienceCurve: {
			attack: 12,
			defense: 3,
			speed: 8,
			guts: 5,
			vitality: 2,
			iq: 7,
			luck: 5
		},
		equipment: {
		},
		sprites: 'paula'
	};

	////////////////////////////////////
	// METHODS                        //
	////////////////////////////////////

	// Get Hero Data
	this.getHeroData = function ( hero )
	{
		return this[ hero ];
	};
};