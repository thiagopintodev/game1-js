ig.module (
  'game.features.camera'
)
.requires(
    //'impact.entity'
)
.defines(function(){

  FeatureCamera = ig.Class.extend({
    /*
    init: function() {
    },
    */
    follow: function( entity ) {
      ig.game.screen.x = entity.pos.x - ig.system.width/2;
      ig.game.screen.y = entity.pos.y - ig.system.height/2;
    }
  });

});

      /*

      // doesn't work properly with HEIGHTS and makes the hero dance when close to edges
      var h = ig.hero;
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