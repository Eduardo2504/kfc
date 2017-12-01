var mainState = {
    preload: function() {

        this.game.load.image('player', 'assets/hei hei.png');
        this.game.load.image('wall', 'assets/tree.png');
        this.game.load.image('enemy', 'assets/redcar.png');
        this.game.load.image('background','assets/background.png');
        this.game.load.image('player', 'assets/chicken.png');

       this.game.load.image('coin', 'assets/coin.PNG');
        this.game.load.image('background','assets/background.png');


    },
    createAliens: function () {

        for (var y = 0; y < 4; y++)
        {
            for (var x = 0; x < 4; x++)
            {
                var alien = this.aliens.create(x * 120, y * 90, 'enemy');
                alien.anchor.setTo(0.5, 0.5);
                alien.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
                alien.play('fly');
                alien.body.moves = false;
            }
        }

        this.aliens.x = 10;
        this.aliens.y = 50;
           var tween = this.game.add.tween(this.aliens).to( { x: 610 }, 7000, Phaser.Easing.Linear.None, true, 0, 1000, false);

    //  When the tween loops it calls descend
    tween.onLoop.add(descend, this);
    },
    
    create: function() {
        this.game.add.tileSprite(0, 0, 550, 600, 'background');
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.enableBody = true;
        
        this.cursor = this.game.input.keyboard.createCursorKeys();
        
        this.player = this.game.add.sprite(250, 520, 'player');
        this.player.body.allowGravity = false;
        //this.player.body.immovable = false;
        this.player.body.collideWorldBounds=true;
    
        this.walls = this.game.add.group();
//        this.coins = this.game.add.group();
        this.enemies = this.game.add.group();
//        this.background = this.game.add.group('background.png');
        
        this.aliens = game.add.group();
        this.aliens.enableBody = true;
        this.aliens.physicsBodyType = Phaser.Physics.ARCADE;

       
        
        var level = [
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            'x                            x',
            'x                            x',
            'x                            x',
            'x                            x', 
            'x                            x', 
            'x                            x',
            'x                            x',
            'x                            x',
            'x                            x',
            'x                            x',
            'x                            x',
            'x                            x',
            'x                            x',
            'x                            x',
            'x                            x',
            'x                            x',
            'x                            x',
            'x                            x',
            'x                            x',
            'x                            x',
            'x                            x',
            'x                            x',
            'x                            x',
            'x                            x',
            'x                            x',
            'x                   !        x',
            'x                            x',
            'x                            x',
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        ];
         this.createAliens();
        for (var i = 0; i < level.length; i++) {
            for (var j = 0; j < level[i].length; j++) {

                if (level[i][j] == 'x') {
                    //debugger;
                    //var wall = game.add.sprite(17.6*j, 20*i, 'wall');
                    //wall.body.immovable = true; 
                  //  this.walls.add(wall);
                    
                  //  wall.body.moves=false;
                    
                    
                }

                else if (level[i][j] == 'o') {
                    var coin = game.add.sprite(30+20*j, 30+20*i, 'coin');
                    this.coins.add(coin);
                }

                else if (level[i][j] == '!') {
                    var enemy = game.add.sprite(30+20*j, 30+20*i, 'enemy');
                    this.enemies.add(enemy);
                }
            }
        }
    },
    collide: function(){
        debugger;
    },
    update: function() {
       // debugger;
        this.game.physics.arcade.collide(this.player, this.walls,this.collide);

        this.game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);

        this.game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);
        
        if(this.cursor.left.isDown)
            this.player.body.velocity.x += -10;
        else if (this.cursor.right.isDown)
            this.player.body.velocity.x += 10;
        else if(this.cursor.up.isDown)
            this.player.body.velocity.y += -10;
        else if (this.cursor.down.isDown)
            this.player.body.velocity.y += 10;
        else{
            this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        }
        
        if(this.cursor.up.isDown && this.player.body.touching.down)
            this.player.body.velocity.y = -200;
    },
    
    takeCoin: function(player, coin){
        coin.kill();
    },

    restart: function() {
        game.state.start('main');
    },
}