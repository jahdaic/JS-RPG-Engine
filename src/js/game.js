// Game Class

var Game = function ()
{
	////////////////////////////////////
	// CREATE GAME ENVIRONMENT        //
	////////////////////////////////////

	// Create background music channel
	window.bgm = new Audio();

	// Setup the "databases"
	window.armory = new Armory();
	window.bestiary = new Bestiary();
	window.roster = new Roster();
	window.spritesheet = new Spritesheet();

	////////////////////////////////////
	// GAME OBJECTS                   //
	////////////////////////////////////

	this.party = [];

	////////////////////////////////////
	// METHODS                        //
	////////////////////////////////////

	this.addPartyMember = async function ( member )
	{
		this.party.push( new Character( roster.getHeroData( member ) ) );
		writeOutput( '<b>' + this.party[ this.party.length - 1].name + ' joined the party!</b><br>');
		await playSFX('new-party-member');
	}

	// Save the game data to local storage
	this.saveGame = function ()
	{
		localStorage.save = JSON.stringify( this );
	};

	// Load game data from local storage and restore environment
	this.loadGame = function ()
	{
		return JSON.parse(localStorage.save);
	};
};