/**
 * Pebble RPG
 *
 * This is where you write your app.
 */

var Game = require( 'game' );
var Bestiary = require( 'bestiary' );

// ENVIRONMENT
var rpg = new Game();
var bestiary = new Bestiary();

// var enemy = new Character( bestiary.getMonsterData( 'slime' ) );

rpg.hero.takeDamage( 1 );

rpg.startGame();