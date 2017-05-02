/**
 * Pebble RPG
 *
 * This is where you write your app.
 */

DEBUG = false;

if (!DEBUG)
{
	console.log(
	'    __| |____________________________________________________________________________| |__\n'+
	'   (__   ____________________________________________________________________________   __)\n'+
	'      | |    ___ _____   ____________ _____    _____ _   _ _____ _____ _   _  _____  | |\n'+
	'      | |   |_  /  ___|  | ___ \\ ___ \\  __ \\  |  ___| \\ | |  __ \\_   _| \\ | ||  ___| | |\n'+
	'      | |     | \\ `--.   | |_/ / |_/ / |  \\/  | |__ |  \\| | |  \\/ | | |  \\| || |__   | |\n'+
	'      | |     | |`--. \\  |    /|  __/| | __   |  __|| . ` | | __  | | | . ` ||  __|  | |\n'+
	'      | | /\\__/ /\\__/ /  | |\\ \\| |   | |_\\ \\  | |___| |\\  | |_\\ \\_| |_| |\\  || |___  | |\n'+
	'      | | \\____/\\____/   \\_| \\_\\_|    \\____/  \\____/\\_| \\_/\\____/\\___/\\_| \\_/\\____/  | |\n'+
	'    __| |____________________________________________________________________________| |__\n'+
	'   (__   ____________________________________________________________________________   __)\n'+
	'      | |                                                                            | |'
	);
}

(async function ()
{
	// Load Necessary Scripts
	var scripts = [
		'spritesheet',
		'armory',
		'bestiary',
		'roster',
		'item',
		'living',
		'character',
		'monster',
		'fight',
		'game'
	];

	for (var i in scripts) {
		var script = document.createElement('script');
		script.src = 'src/js/'+ scripts[i] +'.js';
		document.head.appendChild(script);
	}

	await sleep(1000);

	// ENVIRONMENT
	window.rpg = new Game();

	await rpg.addPartyMember( 'ness' );
	await rpg.addPartyMember( 'paula' );

	window.enemy1 = new Monster( bestiary.getMonsterData( 'snake' ) );
	window.enemy2 = new Monster( bestiary.getMonsterData( 'crow' ) );

	window.fight = new Fight(
	{
		heroes: rpg.party,
		enemies: [ this.enemy1, this.enemy2 ]
	} );

})();