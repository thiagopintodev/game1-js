ig.module( 
	'game.main' 
)
.requires(
//debug
//'impact.debug.debug',

	'impact.game',
	'impact.font',
  'game.levels.a',
  'game.levels.b',
  'game.features.camera',
  'game.features.input_bindings'
  //,
  //'game.entities.hero'

)
.defines(function(){

g1.Game = ig.Game.extend({
	
	// Load a font
	//TODO: get font from some external interface
	//ig.game.font1
	font1: new ig.Font( 'media/04b03.font.png' ),

	//ig.game.camera
	camera: new FeatureCamera(),
	
	/*
	loadLevel: function( level ) {        
    this.parent( level );
    //ig.hero = ig.game.getEntitiesByType( EntityHero )[0];
	},
*/
	init: function() {
		// Initialize your game here; bind keys etc.
		//new FeatureInputBindings();
		FeatureInputBindings.bind();

		//this.loadLevel(LevelA);
		//this.loadLevelDeferred(ig.global['LevelA']);
		ig.game.loadLevelDeferred(ig.global['LevelA']);

	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
    this.camera.follow( ig.hero );
	}
	/*
	,
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		// Add your own drawing code here
		var x = ig.system.width/2+8,
				y = ig.system.height/2-20;
		//this.font.draw( 'OAK', x, y, ig.Font.ALIGN.CENTER );
	}
	*/
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', g1.Game, 60, 320, 240, 2 );

});
