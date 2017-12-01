var mainState = {
    preload: function() {

        this.game.load.image('player', 'cookedchicken.png');
        this.game.load.image('enemy', 'assets/redcar.png');
        this.game.load.image('background','assets/background.png');
        this.game.load.image('coin', 'assets/coin.PNG');


    },
    createCars: function () {
  
        for (var y = 0; y < 4; y++)
        {
            var max=100;
            var min=0;
            var newx = 0

            for (var x = 0; x < 3; x++)
            {
                 if(Math.random()>0.4) {
                newx += 110 + ( Math.floor(Math.random() * (max - min + 1)) + min);
                var car = this.cars.create(newx, y * 110, 'enemy');
                
               // this.game.add.sprite()
                car.anchor.setTo(0.5, 0.5);
               // cars.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
               // car.play('fly');
                //cars.body.moves = false;
                car.body.velocity.x = 200;
                //car.body.x = 100;
               // car.body.y = 500;
                 }
                
            }
        }

       // this.cars.x = 100;
        this.cars.y = 130;
    },
    
    create: function() {
        this.game.add.tileSprite(0, 0, 550, 600, 'background');
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.enableBody = true;
        this.game.world.setBounds(0,0,550,600);
        
        this.cursor = this.game.input.keyboard.createCursorKeys();
        
        this.player = this.game.add.sprite(250, 520, 'player');
        this.player.body.allowGravity =true;
        //this.player.body.immovable = false;
        this.player.body.collideWorldBounds=true;
    
        this.walls = this.game.add.group();
//        this.coins = this.game.add.group();
        this.enemies = this.game.add.group();
//        this.background = this.game.add.group('background.png');
        
        this.cars = game.add.group();
        this.cars.enableBody = true;
        this.cars.physicsBodyType = Phaser.Physics.ARCADE;

       
        
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
            'x                            x',
            'x                            x',
            'x                            x',
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        ];
         this.createCars();
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

        this.game.physics.arcade.overlap(this.player, this.cars, this.restart, null, this);
        
        if(this.cursor.left.isDown)
            this.player.body.velocity.x += -15;
        else if (this.cursor.right.isDown)
            this.player.body.velocity.x += 15;
        else if(this.cursor.up.isDown)
            this.player.body.velocity.y += -15;
        else if (this.cursor.down.isDown)
            this.player.body.velocity.y += 15;
        else{
            this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;
        }
        
        if(this.cursor.up.isDown && this.player.body.touching.down)
            this.player.body.velocity.y = -200;
        //this.game.world.wrap(this.aliens, 0);
//        this.game.world.wrap(this.cars,0,true);
        console.log(this.cars);
        this.cars.forEachExists(function(car) {
          this.game.world.wrap(car, 0, true, true, true)
        })
    },
    
    takeCoin: function(player, coin){
        coin.kill();
    },

    restart: function() {
        game.state.start('main');
    },
}