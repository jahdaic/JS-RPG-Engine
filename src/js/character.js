// Character Class

var Character = function ( stats )
{
	if ( typeof stats === 'undefined' ) stats = {};

	if(DEBUG) console.log( 'NEW CHARACTER', stats);

	LivingBeing.call(this, stats);

	Character.prototype = Object.create( LivingBeing.prototype );

	////////////////////////////////////
	// Properties                     //
	////////////////////////////////////
	this.type = 'hero';
};