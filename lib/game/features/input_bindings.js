ig.module (
  'game.features.input_bindings'
)
.defines(function(){

  FeatureInputBindings = {
    bind: function() {
      ig.input.bind( ig.KEY.A, 'left' );
      ig.input.bind( ig.KEY.D, 'right');
      ig.input.bind( ig.KEY.W, 'up'   );
      ig.input.bind( ig.KEY.S, 'down' );

      ig.input.bind( ig.KEY.LEFT_ARROW,   'left'  );
      ig.input.bind( ig.KEY.RIGHT_ARROW,  'right' );
      ig.input.bind( ig.KEY.UP_ARROW,     'up'    );
      ig.input.bind( ig.KEY.DOWN_ARROW,   'down'  );

      ig.input.bind( ig.KEY.L,  'learn'   );


      ig.input.bind( ig.KEY.MOUSE1,   'goto'  );

      //ig.input.bind( ig.KEY.UP_ARROW, 'jump' );
    }
  }

});