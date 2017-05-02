// Monster Class

var Monster = function ( stats )
{
	if ( typeof stats === 'undefined' ) stats = {};

	if ( DEBUG ) console.log( 'New Monster', stats );

	LivingBeing.call( this, stats );

	Monster.prototype = Object.create( LivingBeing.prototype );

	////////////////////////////////////
	// Properties                     //
	////////////////////////////////////

	this.type = 'monster';
	this.heldItems = [];
	this.experienceGiven = ( stats.hasOwnProperty('experienceGiven') ) ? stats.experienceGiven : 1;
	this.moneyGiven = ( stats.hasOwnProperty('moneyGiven') ) ? stats.moneyGiven : 1;
	this.attackChance = ( stats.hasOwnProperty('attackChance') ) ? stats.attackChance : 15 / 20;
	this.defendChance = ( stats.hasOwnProperty('defendChance') ) ? stats.defendChance : 5 / 20;
	this.magicChance = ( stats.hasOwnProperty('magicChance') ) ? stats.magicChance : 0;
	this.itemChance = ( stats.hasOwnProperty('itemChance') ) ? stats.itemChance : 0;

	////////////////////////////////////
	// METHODS                        //
	////////////////////////////////////

	this.action = function ()
	{
		var action = Math.random();

		if ( action <= this.attackChance )
			return 'a';
		else if ( action <= this.defendChance + this.attackChance )
			return 'd';
		else if ( action <= this.magicChance + this.defendChance + this.attackChance )
			return 'm';
		else if ( action <= this.itemChance + this.magicChance + this.defendChance + this.attackChance )
			return 'i';
		else
			return '';
	}
};