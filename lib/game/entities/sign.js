ig.module(
    'game.entities.sign'
)
.requires(
    'game.entities._transparent'
)
.defines(function() {

    EntitySign = Entity_transparent.extend({

        weltmeister_anim: 3,
        // The message to be drawn to screen.
        msg: '',
        name: 'sign1',
        font1: new ig.Font( 'media/04b03.font.png' ),
/*
        init: function(x, y, settings) {
            this.parent(x, y, settings);
        },
        update: function() {
            // Call parent.
            this.parent();
        },
*/
        draw: function() {
            this.parent();


            // Add your own drawing code here
            var x =  this.pos.x - ig.game.screen.x + 8,
                y =  this.pos.y - ig.game.screen.y - 8;

            //im not using it lol
            this.font1.draw( 'THE SIGN', x, y, ig.Font.ALIGN.CENTER );

            //console.log('drawing sign '+x)
        },
        colideWithHero: function() {
            console.log('colideWithHero() :)');
            ig.hero.last_touched = this;
            // MUST STORE PLAYER POS IN PLAYER, SO I KNOW IF THEY WALKED AWAY:)
        }
    });

})