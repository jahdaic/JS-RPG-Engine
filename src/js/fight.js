// Fight Class

var Fight = function ( setup )
{
	if ( DEBUG ) console.log( 'CREATING FIGHT', setup );

	////////////////////////////////////
	// PROPERTIES                     //
	////////////////////////////////////

	this.heroes = setup.heroes || [];
	this.enemies = setup.enemies || [];
	this.rounds = 0;
	this.enemiesDefeated = 0;
	this.fightFinished = false;
	this.attackOrder

	////////////////////////////////////
	// METHODS                        //
	////////////////////////////////////

	// Start the Fight
	this.start = async function ()
	{
		writeOutput( '<b>You were attacked by ' + this.listEnemies() + '!</b><br>' );
		await playSFX('fight');

		addBattleBG();
		playBGM(null, true);

		this.fightFinished = false;

		if(DEBUG) console.log('HEROES', this.heroes);
		if(DEBUG) console.log('ENEMIES', this.enemies);

		// Determine order of attack
		this.attackOrder = this.getFightOrder();
		if ( DEBUG ) console.log( 'FIGHT ORDER', this.attackOrder );

		while ( !this.fightFinished )
		{
			this.rounds++;

			await this.startRound();
		}

		this.end();
	};

	// Determine the order of attack
	this.getFightOrder = function ()
	{
		return this.heroes.concat( this.enemies ).sort( function ( a, b )
		{
			return b.getSpeed() - a.getSpeed();
		} );
	}

	// Start a round of combat
	this.startRound = async function ()
	{
		var heroActions = await this.getHeroActions();

		for ( var i in this.attackOrder )
		{
			var fightOver = this.checkIfFightOver();

			if ( fightOver == 1 )
			{
				this.victory();
				break;
			}
			else if ( fightOver == -1 )
			{
				this.defeat();
				break;
			}

			if ( DEBUG ) console.log( this.attackOrder[ i ].name + '\'s Turn' );

			// Reset defend status
			this.attackOrder[ i ].removeStatus( 'defending' );

			var fighter = this.attackOrder[ i ];
			if( fighter.type == 'hero' )
			{
				var target = this.getRandomFighter('monster');;
				var action = heroActions[ 0 ].toLowerCase();
			}
			else
			{
				var target = this.getRandomFighter('hero');
				var action = this.attackOrder[ i ].action();
			}

			if ( DEBUG ) console.log( 'ACTION', action );

			switch ( action )
			{
			case 'a':
				this.attack( fighter, target );
				break;
			case 'd':
				this.defend( fighter );
				break;
			case 'm':
				this.magic( fighter, null );
				break;
			case 'i':
				this.item( fighter, null );
				break;
			default:
				writeOutput( fighter.name + ' has a shit-eating grin on its face <i class="fa fa-smile-o"></i><br>' );
				break;
			}

			this.refreshStats();

			// Pause between turns
			await sleep( 1500 );
		}
	}

	// Get the heroes' actions for the next turn
	this.getHeroActions = async function ()
	{
		var actions = [];

		// Select Actions for Heroes
		for ( var i in this.heroes )
		{
			// document.getElementById('stats').childNodes[i].classList.add('');
			var action = 'a'; //prompt( 'Select an Action for ' + this.heroes[ i ].name + ':\n [A = Attack] [D = Defend] [M = Magic] [I = Item]' );
			actions.push( action );
			// document.getElementById('stats').childNodes[i].classList.remove('');

		}

		return actions;
	}

	// Gets a random fighter of specific type
	this.getRandomFighter = function ( type )
	{
		var list = [];

		for ( var i in this.attackOrder )
		{
			if ( this.attackOrder[ i ].type == type )
				list.push(this.attackOrder[i]);
		}

		return list[Math.floor(Math.random() * list.length)];
	}

	// Check if enemies or heroes have been defeated
	this.checkIfFightOver = function ()
	{
		var enemyCount = 0;
		var heroCount = 0;

		for ( var i in this.attackOrder )
		{
			if ( this.attackOrder[ i ].type == 'hero' )
				heroCount++;
			else
				enemyCount++
		}

		if ( enemyCount == 0 )
			return 1;
		else if ( heroCount == 0 )
			return -1;
		else
			return 0;
	}

	// Refresh Hero Stats
	this.refreshStats = function ()
	{
		var output = '';

		for ( var i in this.heroes )
		{
			output +=
				'<div class="col-sm-3">' +
					'<div class="text-center">' +
						this.heroes[ i ].drawSprite('fight') +
					'</div><br>' +
					'<div class="clearfix well well-sm">' +
						this.heroes[ i ].printStats() +
					'</div>' +
				'</div>';
		}

		document.getElementById( 'stats' ).innerHTML = output;

		var output = '';

		for ( var i in this.enemies )
		{
			output += '<div class="col-sm-3">'+
				'<div class="clearfix well well-sm">' +
					this.enemies[ i ].printStats() +
				'</div>'+
				'<div class="text-center">' +
					this.enemies[ i ].drawSprite('fight') +
				'</div>' +
			'</div>';
		}

		document.getElementById( 'stats-enemy' ).innerHTML = output;
	}

	// @todo
	this.listEnemies = function ()
	{
		var list = {};

		for (enemy of this.enemies) {
			if(list.hasOwnProperty(enemy.name))
				list[enemy.name]++;
			else
				list[enemy.name] = 1;
		}

		var names = [];

		for (enemy in list) {
			names.push( (list[enemy] > 1 ? list[enemy] : '') + ' ' + enemy + (list[enemy] > 1 ? 's' : ''));
		}

		var name = names.join(', ');

		name = name.substr(0, name.lastIndexOf(', ')) + ' and ' + name.substr(name.lastIndexOf(', ') +2)

		return name;
	}

	// Attack
	this.attack = function ( attacker, target )
	{
		writeOutput( attacker.name + ' attacked with ' + attacker.getEquipment( 'weapon' ) );

		var damage = attacker.attackEnemy( target );

		if ( damage == -1 )
		{
			playSFX('miss');
			writeOutput( 'The attack missed<br>' );
			return;
		}
		else if ( damage == -2 )
		{
			playSFX('dodge');
			writeOutput( target.name + ' nimbly dodged the attack<br>' );
			return;
		}

		if ( target.hasStatus( 'defending' ) )
			writeOutput( 'The blow was partially blocked' );

		if ( attacker.hasStatus( 'critical' ) )
		{
			playSFX('critical');
			writeOutput( 'A critical hit! <i class="fa fa-star"></i>' );
			attacker.removeStatus( 'critical' );
		}
		else
		{
			playSFX( attacker.equipment.weapon.sound || 'hit');
		}

		flashSprite( target );
		target.takeDamage( damage );

		writeOutput( target.name + ' took ' + damage + 'HP of damage<br>' );

		if ( target.health == 0 )
		{
			if( target.type == 'hero' ) playSFX('death');
			writeOutput( '<b>' + target.name + ' Died</b><br>' );
			this.eliminateFighter( target );
		}
	}

	// Defend
	this.defend = function ( defender )
	{
		writeOutput( defender.name + ' defended in anticipation of an attack <i class="fa fa-shield"></i><br>' );
		defender.addStatus( 'defending' );
	}

	// Magic
	this.magic = function ( caster, spell )
	{
		writeOutput( caster.name + ' cast a spell <i class="fa fa-book"></i><br>' );
	}

	// Item
	this.item = function ( user, item )
	{
		writeOutput( user.name + ' used an item <i class="fa fa-flask"></i><br>' );
	}

	// Eliminate a fighter
	this.eliminateFighter = function ( fighter )
	{
		var id = fighter.id;

		for ( var i in this.attackOrder )
		{
			if ( this.attackOrder[ i ].id == id )
			{
				this.attackOrder.splice( i, 1 );
				break;
			}
		}
	}

	// Won the fight
	this.victory = function ()
	{
		this.fightFinished = true;
		playBGM('victory');
		writeOutput( '<b>VICTORY!</b> <i class="fa fa-trophy"></i><br>' );
	}

	// Lost the fight
	this.defeat = function ()
	{
		this.fightFinished = true;
		playBGM('defeat');
		writeOutput( '<b>GAME OVER</b> <i class="fa fa-snapchat-ghost"></i><br>' );
	}

	// End the Fight
	this.end = function ()
	{
		removeBattleBG();
	};
};