// Item Class

var Item = function ( stats )
{
	if ( typeof stats === 'undefined' ) stats = {};

	////////////////////////////////////
	// PROPERTIES                     //
	////////////////////////////////////

	if(DEBUG) console.log('NEW ITEM', stats);

	this.name = (stats.hasOwnProperty('name')) ? stats.name : 'Unknown Item';
	this.type = (stats.hasOwnProperty('type')) ? stats.type : 'item';
	this.attack = (stats.hasOwnProperty('attack')) ? stats.attack : 0;
	this.defense = (stats.hasOwnProperty('defense')) ? stats.defense : 0;
	this.speed = (stats.hasOwnProperty('speed')) ? stats.speed : 0;
	this.guts = (stats.hasOwnProperty('guts')) ? stats.guts : 0;
	this.vitality = (stats.hasOwnProperty('vitality')) ? stats.vitality : 0;
	this.iq = (stats.hasOwnProperty('iq')) ? stats.iq : 0;
	this.luck = (stats.hasOwnProperty('luck')) ? stats.luck : 0;
	this.sound = (stats.hasOwnProperty('sound')) ? stats.sound : '';


	////////////////////////////////////
	// METHODS                        //
	////////////////////////////////////
};