ig.module( 
	'game.main' 
)
.requires(
//debug
'impact.debug.debug',

	'impact.game',
	'impact.font',
  'game.levels.a',
  'game.levels.b',
  'game.entities.player'

)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	//TODO: get font from some external interface
	font1: new ig.Font( 'media/04b03.font.png' ),

	getHero: function() {
		return this.getEntitiesByType( EntityPlayer )[0];
	},
	
	init: function() {
		// Initialize your game here; bind keys etc.
		ig.input.bind( ig.KEY.A, 'left' );
		ig.input.bind( ig.KEY.D, 'right');
		ig.input.bind( ig.KEY.W, 'up' 	);
		ig.input.bind( ig.KEY.S, 'down' );

		ig.input.bind( ig.KEY.LEFT_ARROW, 	'left' 	);
		ig.input.bind( ig.KEY.RIGHT_ARROW, 	'right' );
		ig.input.bind( ig.KEY.UP_ARROW, 		'up' 		);
		ig.input.bind( ig.KEY.DOWN_ARROW, 	'down' 	);
		
		ig.input.bind( ig.KEY.L, 	'learn' 	);



		ig.input.bind( ig.KEY.MOUSE1, 	'goto' 	);
		
		//ig.input.bind( ig.KEY.UP_ARROW, 'jump' );

		//this.loadLevel(LevelA);
		//this.loadLevelDeferred(ig.global['LevelA']);
		ig.game.loadLevelDeferred(ig.global['LevelA']);

	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
		var h = this.getHero();
		if( h ) {
			this.screen.x = h.pos.x - ig.system.width/2;
			this.screen.y = h.pos.y - ig.system.height/2;
		}

/*
		
		// doesn't work properly with HEIGHTS and makes the hero dance when close to edges
		var h = this.getHero();
		if( h ) {
			var x_limit = ig.system.width/2,
					y_limit = ig.system.height/2,
					x = h.pos.x - x_limit,
					y = h.pos.y - y_limit;

			if (x < 0)       x = 0; else
			if (x > x_limit) x = x_limit;
			if (y < 0)       y = 0; else
			if (y > y_limit) y = y_limit;

			this.screen.x = x;
			this.screen.y = y;
		}
		*/
		/*
		// In your game's or entity's update() method
		if( ig.input.pressed('jump') ) {
		    this.vel.y = -100;
		}
		*/
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		// Add your own drawing code here
		var x = ig.system.width/2+8,
				y = ig.system.height/2-20;


		//this.font.draw( 'OAK', x, y, ig.Font.ALIGN.CENTER );

		
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 320, 240, 2 );

});
