window.onload = function() {
        /* global Phaser */ 
        //  Note that this html file is set to pull down Phaser 2.5.0 from the JS Delivr CDN.
        //  Although it will work fine with this tutorial, it's almost certainly not the most current version.
        //  Be sure to replace it with an updated version before you start experimenting with adding your own code.

        var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create });

        function preload () {

            game.load.image('logo', 'Images/phaser.png');
            game.load.image('music', 'Images/icons8-music-50.png');

        }

        function create () {
            
            game.time.events.repeat(Phaser.Timer.SECOND / 5, 1000000000, moveIcons, this);
            game.stage.backgroundColor = "0800ff";
          
            //var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
            //logo.anchor.setTo(0.5, 0.5);
             var gfx = game.add.graphics(0,0);
            gfx.lineStyle(10, 0x33FF00);
            gfx.moveTo(game.width/5,game.height);
            gfx.lineTo(game.width/5,0);
            
            var music = game.add.sprite(game.world.centerX, game.world.centerY, 'music');
            music.inputEnabled = true;
            music.events.onInputDown.add(changeColor,this);
         

            function changeColor () {
              var c = Phaser.Color.getRandomColor(50, 255, 255) ;
              game.stage.backgroundColor = c ;
            }
        
            function moveIcons() {
                music.x = music.x - 10;
            }
        
        }

    };