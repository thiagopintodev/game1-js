ig.module (
    'game.entities.player'
)
.requires(
    'impact.entity',
    'impact.font'
)
.defines(function(){
   
    EntityPlayer = ig.Entity.extend({
        
        size: {x: 16, y: 8},
        offset: {x: 0, y: 24},
        type:         ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.B,
        collides:     ig.Entity.COLLIDES.ACTIVE,

        last_touched: null,
        still_touches: function() {
            if (this.last_touched == null)
                return false;

//            console.log(Math.abs(this.last_touched.pos.x + this.last_touched.size.x)+' obj');
//            console.log(Math.abs(this.pos.x + this.size.x)+' hero');

/*
            x_dist = Math.abs(this.last_touched.pos.x - this.pos.x);
            y_dist = Math.abs(this.last_touched.pos.y - this.pos.y);

            //console.log("dist_y: "+ y_dist)

            touches_x = [this.last_touched.size.x, this.size.x].indexOf(x_dist) >= 0;
            touches_y = [this.last_touched.size.y, this.size.y].indexOf(y_dist) >= 0;

            //console.log("touches x: " + touches_x)
            //console.log("touches y: " + touches_y)

            if (touches_x) {
                med = (this.last_touched.size.y + this.size.y)/2;
                console.log("X, dist y: "+y_dist+" med: " +med)
            }
            if (touches_y) {
                med = (this.last_touched.size.x + this.size.x)/2;
                console.log("Y, dist x: "+x_dist+" med: " +med)
            }
*/


            //console.log(+' pos dist');
            //console.log(Math.abs(this.last_touched.size.y - this.size.y)+' size dist');
            //console.log(Math.abs(this.pos.x + this.size.x)+' hero');


            //console.log(Math.abs(this.last_touched.pos.y - this.pos.y)+' y')
            //if (this.touches(this.last_touched))
            //return (touches_x || touches_y) && !(touches_x || touches_y); //XOR
            return false;

            // MUST CHECK IF PLAYER POS IS THE SAME

            //this.last_touched = null;
            //return false;
        },
    
        speed_const: 70,

        //skin system should be like moving system :)
        skin: null,

        font1: new ig.Font( 'media/04b03.font.png' ),

        name: 'Hero',
        username: 'JACK',

        moving: {
            dir: {x: 0, y: 0},
            player: null,
            face: null,
            anims: {
                'up':    {x: 0, y: -1},
                'down':  {x: 0, y: +1},
                'left':  {x: -1, y: 0},
                'right': {x: +1, y: 0}
            },
            init: function(player) {
                this.player = player;
            },
            update: function() {

                if( ig.input.state('goto')) {

                    //works with absolute screen position
                    //var dist_x = ig.system.width/2 - ig.input.mouse.x;
                    //var dist_y = ig.system.height/2 - ig.input.mouse.y;

                    //works with relative player/map position
                    var player    = this.player.pos,
                        mapscroll = ig.game.backgroundMaps[0].scroll, //must be a more elgant way to get the current map
                        mouse     = ig.input.mouse;

                    var dist_x = player.x - mapscroll.x - ig.input.mouse.x,
                        dist_y = player.y - mapscroll.y - ig.input.mouse.y;


                    var face, running;

                    if (Math.abs(dist_x) > Math.abs(dist_y)) {
                        running = (Math.abs(dist_x) > 100);
                        face = (dist_x < 0) ? 'right' : 'left';
                    }
                    else
                    {
                        running = (Math.abs(dist_y) > 70);
                        face = (dist_y < 0) ? 'down' : 'up';
                    }
                    this.walk(face, running);
                }
                else if( ig.input.state('up')) {
                    this.walk('up', false);
                }
                else if( ig.input.state('down')) {
                    this.walk('down', false);
                }
                else if( ig.input.state('left')) {
                    this.walk('left', false);
                }
                else if( ig.input.state('right')) {
                    this.walk('right', false);
                }
                else if( ig.input.state('learn')) {
                    console.log('x: '+this.player.pos.x+' y: '+this.player.pos.y);
                    console.log('still touching last: '+this.player.still_touches());
                }
                else
                {
                    this.stop();
                }

            },
            //configures walk for a tile
            walk: function(face, running) {
                var state = running ? 'run' : 'walk';
                var spd = this.player.speed_const * (running ? 2 : 1);
                
                this.face               = face;
                this.player.vel.x       = spd * this.anims[face].x;
                this.player.vel.y       = spd * this.anims[face].y;
                this.player.currentAnim = this.player.anims[ ":state_:face".replace(':state', state).replace(':face', face) ];
            },
            stop: function() {
                this.player.vel.x = 0;
                this.player.vel.y = 0;
                if (this.face) {
                    this.player.currentAnim  = this.player.anims[ "idle_:face".replace(':face', this.face) ];
                }
            }
        },
        
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            
            this.includeSkin();
            this.moving.init(this);
/*
            font = new ig.Font( 'media/04b03.font.png' );
            font.draw( 'It Works!', 0, 0, ig.Font.ALIGN.CENTER );
*/
        },
        
        update: function() {

            this.moving.update();
            this.parent();

        },
        draw: function() {
            this.parent();

            // Add your own drawing code here
            var x =  this.pos.x - ig.game.screen.x + 8,
                y =  this.pos.y - ig.game.screen.y - 20;

            this.font1.draw( this.username, x, y, ig.Font.ALIGN.CENTER );


            //ig.game.font1.draw( this.username, x, y, ig.Font.ALIGN.CENTER );
        },


        check: function(other) {
            other.colideWithHero();
            this.parent(other);
        },

        /*
         * Loads and sets players current skin.
         *
         * @return undefined
         */
        includeSkin: function() {

            var valid_skins = ['boy1','boy2','girl1', 'girl2'];
            if (valid_skins.indexOf(this.skin) == -1)
                this.skin = valid_skins[0];

            // Load skin image resource.
            this.animSheet = new ig.AnimationSheet('media/entities/people/' + this.skin + '.png', 16, 32);

            // Duration of each frame.
            idleFrameTime = 1;
            walkFrameTime = 0.18;
            runFrameTime = 0.12;

            // Add movement animations.
            this.addAnim('idle_down',    idleFrameTime, [12], true);//default
            this.addAnim('idle_up',      idleFrameTime, [0], true);
            this.addAnim('idle_left',    idleFrameTime, [6], true);
            this.addAnim('idle_right',   idleFrameTime, [6], true);

            this.addAnim('walk_up',     walkFrameTime, [0, 1, 0, 2]);
            this.addAnim('walk_down',   walkFrameTime, [12, 13, 12, 14]);
            this.addAnim('walk_left',   walkFrameTime, [6, 7, 6, 8]);
            this.addAnim('walk_right',  walkFrameTime, [6, 7, 6, 8]);

            this.addAnim('run_up',     runFrameTime, [3, 4, 3, 5]);
            this.addAnim('run_down',   runFrameTime, [15, 16, 15, 17]);
            this.addAnim('run_left',   runFrameTime, [9, 10, 9, 11]);
            this.addAnim('run_right',  runFrameTime, [9, 10, 9, 11]);

            //sprite right == left.flip
            this.anims.idle_right.flip.x = true;
            this.anims.walk_right.flip.x = true;
            this.anims.run_right.flip.x = true;

        }
    });
    
});