/**
 * Sleeps for the given number of milliseconds
 * @param   {int} ms - Time in milliseconds
 * @returns {Object} - Promise object
 */
function sleep( ms )
{
	return new Promise( resolve => setTimeout( resolve, ms ) );
}

/**
 * Write output
 * @param   {string} text - The text string to be written out
 */
function writeOutput( text )
{
	var nextLine = ( !document.getElementById( 'output' ).innerHTML ) ? '' : '<br>';

	document.getElementById( 'output' ).innerHTML = document.getElementById( 'output' ).innerHTML + nextLine + text;

	document.getElementById( 'output' ).scrollTop = document.getElementById( 'output' ).scrollHeight;
}

/**
 * Generates a unique ID used to identify objects
 * @returns {string} The generated RFC4122 version 4 compliant UUID
 */
function generateUUID()
{
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, function ( c )
	{
		var r = Math.random() * 16 | 0;
		var v = c == 'x' ? r : ( r & 0x3 | 0x8 );
		return v.toString( 16 );
	} );
}

async function flashSprite( thing )
{
	// Flash 4 times
	for (var i = 0; i < 4; i++) {
		document.getElementsByClassName( thing.id )[0].style.opacity = 0;
		await sleep(150);
		document.getElementsByClassName( thing.id )[0].style.opacity = 100;
		await sleep(150);
	}
}

/**
 * Adds a background to the body
 */
function addBattleBG()
{
	var bg = Math.floor( Math.random() * ( 7 - 1 ) ) + 1;
	document.body.background = 'src/images/bg' + bg + '.gif';
	document.body.style.imageRendering = 'pixelated';
	document.body.style.backgroundSize = "cover";
}

/**
 * Remove background from the body
 */
function removeBattleBG()
{
	document.body.background = '';
}

/**
 * [startBGMusic description]
 */
function playBGM( track, loop )
{
	bgm.loop = (loop) ? true : false;

	if ( !track )
		bgm.src = 'src/bgm/bgm' + (Math.floor( Math.random() * ( 3 - 1 ) ) + 1) + '.mp3';
	else
		bgm.src = 'src/bgm/' + track + '.mp3';

	bgm.play();
}

/**
 * [stopBGM description]
 */
function stopBGM()
{
	bgm.pause();
}

/**
 * [playSFX description]
 * @param   {[type]}   sound    [description]
 * @param   {Function} callback [description]
 */
function playSFX( sound, callback )
{
	var sfx = new Audio();
	sfx.src = 'src/sfx/' + sound + '.wav';
	sfx.play();

	return new Promise( resolve => sfx.addEventListener( 'ended', resolve ) );
}