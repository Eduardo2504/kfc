var mainState = {
    preload: function() {
        this.game.load.image('player', 'assets/player.PNG');
        this.game.load.image('wall', 'assets/wall.PNG');
        this.game.load.image('coin', 'assets/coin.PNG');
        this.game.load.image('enemy', 'assets/lava.PNG');
    },
    
    create: function() {
        this.game.stage.backgroundColor = '#3598db';
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.enableBody = true;
        
        this.cursor = this.game.input.keyboard.createCursorKeys();
        
        this.player = this.game.add.sprite(70, 100, 'player');
        
        this.player.body.gravity.y = 600;
        
        this.walls = this.game.add.group();
        this.coins = this.game.add.group();
        this.enemies = this.game.add.group();
        
        var level = [
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            '!         !                               x',
            '!                 o        o         o    x',
            '!         o                     !         x',
            '!                    x                    x',
            '!     o   !    x     x        o      o    x',
            'xxxxxxxxxxxxxxxx!!!!!xxxxxxxxxxxxxxxxxxxxxx',
        ];
        
        for (var i = 0; i < level.length; i++) {
            for (var j = 0; j < level[i].length; j++) {

                if (level[i][j] == 'x') {
                    var wall = game.add.sprite(30+20*j, 30+20*i, 'wall');
                    this.walls.add(wall);
                    wall.body.immovable = true; 
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
    
    update: function() {
        this.game.physics.arcade.collide(this.player, this.walls);

        this.game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);

        this.game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);
        
        if(this.cursor.left.isDown)
            this.player.body.velocity.x = -200;
        else if (this.cursor.right.isDown)
            this.player.body.velocity.x = 200;
        else
            this.player.body.velocity.x = 0;
        
        if(this.cursor.up.isDown && this.player.body.touching.down)
            this.player.body.velocity.y = -250;
    },
    
    takeCoin: function(player, coin){
        coin.kill();
    },

    restart: function() {
        game.state.start('main');
    },
}