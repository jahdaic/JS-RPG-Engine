// Living Being Class
// @todo - Experience curve

var LivingBeing = function ( stats )
{
	if ( typeof stats === 'undefined' ) stats = {};

	////////////////////////////////////
	// Properties                     //
	////////////////////////////////////

	this.id = generateUUID();
	this.name = ( stats.hasOwnProperty( 'name' ) ) ? stats.name : 'Nameless';
	this.defaultWeapon = stats.defaultWeapon || 'Bare Hand';
	this.level = 1;
	this.maxHealth = ( stats.hasOwnProperty( 'maxHealth' ) ) ? stats.maxHealth : 10;
	this.health = ( stats.hasOwnProperty( 'health' ) ) ? stats.health : this.maxHealth;
	this.maxMagic = ( stats.hasOwnProperty( 'maxMagic' ) ) ? stats.maxMagic : 0;
	this.magic = ( stats.hasOwnProperty( 'magic' ) ) ? stats.magic : this.maxMagic;
	this.attack = ( stats.hasOwnProperty( 'attack' ) ) ? stats.attack : 0;
	this.defense = ( stats.hasOwnProperty( 'defense' ) ) ? stats.defense : 0;
	this.speed = ( stats.hasOwnProperty( 'speed' ) ) ? stats.speed : 0;
	this.guts = ( stats.hasOwnProperty( 'guts' ) ) ? stats.guts : 0;
	this.vitality = ( stats.hasOwnProperty( 'vitality' ) ) ? stats.vitality : 0;
	this.iq = ( stats.hasOwnProperty( 'iq' ) ) ? stats.iq : 0;
	this.luck = ( stats.hasOwnProperty( 'luck' ) ) ? stats.luck : 0;
	this.status = ( stats.hasOwnProperty( 'status' ) ) ? stats.status : [];
	this.experienceCurve = ( stats.hasOwnProperty( 'experienceCurve' ) ) ? stats.experienceCurve : {};
	this.experience = ( stats.hasOwnProperty( 'experience' ) ) ? stats.experience : 0;
	this.equipment = {
		weapon: ( stats.hasOwnProperty( 'equipment' ) && stats.equipment.hasOwnProperty( 'weapon' ) ) ? new Item( armory.getItemData( stats.equipment.weapon ) ) : '',
		helmet: ( stats.hasOwnProperty( 'equipment' ) && stats.equipment.hasOwnProperty( 'helmet' ) ) ? new Item( armory.getItemData( stats.equipment.helmet ) ) : '',
		armor: ( stats.hasOwnProperty( 'equipment' ) && stats.equipment.hasOwnProperty( 'armor' ) ) ? new Item( armory.getItemData( stats.equipment.armor ) ) : '',
		leggings: ( stats.hasOwnProperty( 'equipment' ) && stats.equipment.hasOwnProperty( 'leggings' ) ) ? new Item( armory.getItemData( stats.equipment.leggings ) ) : '',
		shield: ( stats.hasOwnProperty( 'equipment' ) && stats.equipment.hasOwnProperty( 'shield' ) ) ? new Item( armory.getItemData( stats.equipment.shield ) ) : ''
	}
	this.inventory = [];
	this.sprites = ( stats.hasOwnProperty( 'sprites' ) ) ? spritesheet.getSpriteData( stats.sprites ) : {};

	if ( stats.hasOwnProperty( 'level' ) ) this.levelUp( stats.level );

	////////////////////////////////////
	// METHODS                        //
	////////////////////////////////////

	// Set Health
	this.setHealth = function ( health )
	{
		this.health = Math.max( Math.min( health, this.maxHealth ), 0 );
	};

	// Recover Health
	this.recoverHealth = function ( recovered )
	{
		this.health = Math.min( ( this.health + recovered ), this.maxHealth );
	};

	// Take Damage
	this.takeDamage = function ( damage )
	{
		this.setHealth( this.health - damage );
	};

	// Add a status to a character
	this.addStatus = function ( status )
	{
		if ( this.status.indexOf( status ) == -1 )
			this.status.push( status );
	};

	// Remove a status from a character
	this.removeStatus = function ( status )
	{
		var i = this.status.indexOf( status );

		if ( i !== -1 )
		{
			this.status.splice( i, 1 );
		}
	};

	// Check if character has a specific status
	this.hasStatus = function ( status )
	{
		return ( this.status.indexOf( status ) == -1 ) ? false : true;
	};

	// Level up to the given level
	this.levelUp = function ( level )
	{
		for ( var i = level - this.level; i > 0; i-- )
		{
			this.attack = this.levelUpStat( 'attack' );
			this.defense = this.levelUpStat( 'defense' );
			this.speed = this.levelUpStat( 'speed' );
			this.guts = this.levelUpStat( 'guts' );
			this.vitality = this.levelUpStat( 'vitality' );
			this.iq = this.levelUpStat( 'iq' );
			this.luck = this.levelUpStat( 'luck' );
			this.maxHealth = this.levelUpStat( 'maxHealth' );
			this.maxMagic = this.levelUpStat( 'maxMagic' );

			// Restor magic and health
			this.health = this.setHealth( this.maxHealth );
			this.magic = this.maxMagic;

			this.level++;
		}
	}

	// Levels up a given stat one level
	this.levelUpStat = function ( stat )
	{
		if ( stat == 'maxHealth' )
		{
			return ( 15 * this.vitality - this[ stat ] < 2 ) ? Math.floor( Math.random() * ( 3 - 1 ) ) + 1 + this[ stat ] : 15 * this.vitality;
		}
		else if ( stat == 'maxMagic' )
		{
			return ( 5 * this.iq - this[ stat ] < 2 ) ? Math.floor( Math.random() * ( 2 - 0 ) ) + 0 + this[ stat ] : 5 * this.iq;
		}
		else
		{
			var growthRate = this.experienceCurve[ stat ];

			if ( ( stat == 'vitality' || stat == 'iq' ) && this.level + 1 <= 10 )
				var r = 5;
			else
				var r = ( ( ( this.level + 1 ) % 4 == 0 ) ? Math.floor( Math.random() * ( 10 - 7 ) ) + 7 : Math.floor( Math.random() * ( 6 - 3 ) ) + 6 );

			return this[ stat ] + Math.round( ( ( growthRate * this.level ) - ( ( this[ stat ] - 2 ) * 10 ) ) * r / 50 );
		}
	}

	// Get Character's Level From Experience
	this.getLevel = function ()
	{
		if ( this.experienceCurve.length )
			return 0;
		else
			return 1;
	};

	// Get Character's Total Attack
	this.getAttack = function ()
	{
		var weapon = this.equipment.weapon.attack || 0;
		var helmet = this.equipment.helmet.attack || 0;
		var armor = this.equipment.armor.attack || 0;
		var leggings = this.equipment.leggings.attack || 0;
		var shield = this.equipment.shield.attack || 0;

		return this.attack + weapon + helmet + armor + leggings + shield;
	}

	// Get Character's Total Defense
	this.getDefense = function ()
	{
		var weapon = this.equipment.weapon.defense || 0;
		var helmet = this.equipment.helmet.defense || 0;
		var armor = this.equipment.armor.defense || 0;
		var leggings = this.equipment.leggings.defense || 0;
		var shield = this.equipment.shield.defense || 0;

		return this.defense + weapon + helmet + armor + leggings + shield;
	}

	// Get Character's Total Defense
	this.getSpeed = function ()
	{
		var weapon = this.equipment.weapon.speed || 0;
		var helmet = this.equipment.helmet.speed || 0;
		var armor = this.equipment.armor.speed || 0;
		var leggings = this.equipment.leggings.speed || 0;
		var shield = this.equipment.shield.speed || 0;

		return this.speed + weapon + helmet + armor + leggings + shield;
	}

	// Get Character's Total Defense
	this.getLuck = function ()
	{
		var weapon = this.equipment.weapon.luck || 0;
		var helmet = this.equipment.helmet.luck || 0;
		var armor = this.equipment.armor.luck || 0;
		var leggings = this.equipment.leggings.luck || 0;
		var shield = this.equipment.shield.luck || 0;

		return this.luck + weapon + helmet + armor + leggings + shield;
	}

	// Get the name of the attacking weapon
	this.getEquipment = function ( item )
	{
		if ( item == 'weapon' && !this.equipment.weapon ) return this.defaultWeapon;

		return this.equipment[ item ].name;
	}

	// Attack a Monster
	this.attackEnemy = function ( enemy )
	{
		// Is the target defending?
		var modifier = ( enemy.hasStatus( 'defending' ) ) ? 0.5 : 1;

		// Did the attack miss?
		var miss = ( Math.random <= 1 / 16 ) ? true : false;
		if ( miss ) return -1;

		// Was it a Critical Hit?
		var criticalHit = ( Math.random() <= ( ( this.luck / 500 > 1 / 20 ) ? this.luck / 500 : 1 / 20 ) ) ? true : false;
		if ( criticalHit )
		{
			this.addStatus( 'critical' );
			return Math.round( ( 4 * Math.max( this.getAttack() - enemy.getDefense(), 1 ) ) * modifier );
		}

		// Did the enemy dodge?
		var dodge = ( Math.random() <= ( 2 * enemy.getSpeed() - this.getSpeed() ) / 500 ) ? true : false;
		if ( dodge ) return -2;

		// We managed to attack!
		var attack = Math.round( ( ( this.getAttack() - enemy.getDefense() ) * ( ( Math.floor( Math.random() * ( 125 - 75 ) ) + 75 ) / 100 ) ) * modifier );
		return Math.max( attack, 1 );
	}

	// Draw sprite with status conditions
	this.drawSprite = function (sprite)
	{
		if( this.hasStatus('poison') )
			status = '';

		return '<img src="src/images/sprites/' + this.sprites.fight + '.gif" class="'+this.id+'" style="'+status+'">';
	}

	this.printStats = function ()
	{

		var stats =
			'<div class="row">' +
			'<div class="col-xs-12">' +
			'<b>' + this.name + '</b><br>' +
			'</div>' +
			'<div class="col-sm-6">' +
			'HP: ' + this.health + ' / ' + this.maxHealth +
			'<div class="progress">' +
			'<div class="progress-bar progress-bar-success" role="progressbar" style="width: ' + this.health / this.maxHealth * 100 + '%;"></div>' +
			'</div>' +
			'</div>' +
			'<div class="col-sm-6">' +
			'MP: ' + this.magic + ' / ' + this.maxMagic +
			'<div class="progress">' +
			'<div class="progress-bar progress-bar-danger" role="progressbar" style="width: ' + this.magic / this.maxMagic * 100 + '%;"></div>' +
			'</div>' +
			'</div>' +
			'</div>';

		return stats;
	};
};