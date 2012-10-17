ig.module(
    'game.entities._transparent'
)
.requires(
    'impact.entity'
)
.defines(function() {

    Entity_transparent = ig.Entity.extend({
        size: {
            x: 16,
            y: 16
        },
        type:         ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides:     ig.Entity.COLLIDES.FIXED,


        // Load image resource for Weltmeister.
        animSheet: new ig.AnimationSheet('media/entities/transparent.png', 16, 16),

        weltmeister_anim: 0,


        init: function(x, y, settings) {
            this.parent(x, y, settings);

            // Specify which icon to use in Weltmeister.
            this.addAnim('weltmeister', 0.1, [this.weltmeister_anim], true);

            // Set current icon.
            this.currentAnim = this.anims.weltmeister;

            // Specify which icon to use in Weltmeister.
            //this.addAnim('weltmeister', 0.1, [3], true);
        },

        //invoked inside Hero
        colideWithHero: function() {
            console.log('colideWithHero() not implemented');
        },

        ready: function() {
            // Make sign entity invisible in-game.
            //delete this.currentAnim;
        }
    });

})