export default class s1GameScene extends Phaser.Scene {
    constructor(){
        super('s2GameScene')
    }

    init(){
        this.lives = 3;
        this.player;
        this.coins;
        this.cursors;
        this.coinsScore = 0;
        this.coinCounter = 0;
        this.score = 0;
        this.pMobs;
        this.gEnemies;
        this.boomCounter = 1;
        this.scale = 1;
        this.bEnemies;
    }

    preload(){
        this.load.image('tiles', './assets/maps/sheet.png');
        this.load.tilemapTiledJSON('tilemap2', './assets/maps/s2Map.tmj');
            
        this.load.image('heart', './assets/icons/heart.png');

        this.load.image('coin', './assets/images/coin.png');
        this.load.image('push-mobs', './assets/images/push-mobs.png');
        this.load.image('ground-enemies', './assets/images/ground-enemies.png');
        this.load.image('bounce-enemies', './assets/images/bounce-enemies.png');
        this.load.spritesheet('dude', './assets/images/dude.png', {frameWidth: 32, frameHeight: 48});
    }

    create(){

        // Map  
        this.map = this.make.tilemap({key: 'tilemap2'});
        this.tileset = this.map.addTilesetImage('tiles_packed', 'tiles');
        this.platform = this.map.createLayer('platform', this.tileset, 0, 60);
        this.flag = this.map.createLayer('flag', this.tileset, 0, 60);
        this.water = this.map.createLayer('water', this.tileset, 0, 60);

        this.map.createLayer('backdrops', this.tileset, 0, 60)
        this.map.createLayer('extra-backdrops', this.tileset, 0, 60)

        this.flag.setCollisionByExclusion(-1, true);
        this.platform.setCollisionByExclusion(-1, true);
        this.water.setCollisionByExclusion(-1, true);

        // Player
        this.player = this.physics.add.sprite(200, 350, 'dude');

        this.player.setCollideWorldBounds(false);
    
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
    
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.player.invulnerable = false;

        // Ground Enemies
        this.enemyGround = this.map.getObjectLayer('ground enemies')['objects'];
    
        this.gEnemies = this.physics.add.group();
        this.enemyGround.forEach(object => {
            let obj = this.gEnemies.create(object.x, object.y, "ground-enemies");
            obj.setScale(object.width/16, object.height/16); 
            obj.setOrigin(0);
            obj.setImmovable([true]); 
            obj.body.width = object.width; 
            obj.body.height = object.height;
        });

        // Bounce Enemies
        this.enemyBounce = this.map.getObjectLayer('bounce enemies')['objects'];
        
        this.bEnemies = this.physics.add.group();
        this.enemyBounce.forEach(object => {
            let obj = this.bEnemies.create(object.x, object.y, "bounce-enemies");
            obj.setScale(object.width/16, object.height/16); 
            obj.setOrigin(0); 
            obj.setBounce(1);
            obj.setImmovable([true]); 
            obj.body.width = object.width; 
            obj.body.height = object.height;
        });

        // Push Mobs
        this.pushMobs = this.map.getObjectLayer('push mobs')['objects'];
        
        this.pMobs = this.physics.add.group();
        this.pushMobs.forEach(object => {
            let obj = this.pMobs.create(object.x, object.y, "push-mobs");
            obj.setScale(object.width/16, object.height/16); 
            obj.setOrigin(0); 
            obj.body.width = object.width; 
            obj.body.height = object.height;
        });

        // Hearts
        this.heart1 = this.add.sprite(30, 50, 'heart').setScrollFactor(0);
        this.heart2 = this.add.sprite(60, 50, 'heart').setScrollFactor(0);
        this.heart3 = this.add.sprite(90, 50, 'heart').setScrollFactor(0);

        // Coins
        this.CoinLayer = this.map.getObjectLayer('coins')['objects'];
        
        this.coins = this.physics.add.staticGroup()
        this.CoinLayer.forEach(object => {
            let obj = this.coins.create(object.x, object.y, "coin"); 
            obj.setScale(object.width/18, object.height/18); 
            obj.setOrigin(0.5, 0.5); 
            obj.body.width = object.width; 
            obj.body.height = object.height;
        })

        // Texts
        this.coinText = this.add.text(180, 10, `Coins: ${this.coinsScore}x`, {
            fontSize: '20px',
            fill: '#000000'
          });
        this.coinText.setScrollFactor(0);
    
        this.scoreText = this.add.text(15, 10, `Score: ${this.score}`,{
            fontSize: '20px',
            fill: '#000000'
        });
        this.scoreText.setScrollFactor(0);

        // Physics and Camera
        this.physics.add.collider(this.player, this.platform);
        this.physics.add.collider(this.player, this.pMobs);
        this.physics.add.collider(this.gEnemies, this.platform);
        this.physics.add.collider(this.bEnemies, this.water);
        this.physics.add.collider(this.pMobs, this.platform);

        this.physics.add.overlap(this.player, this.coins, this.collectCoins, null, this);
        this.physics.add.collider(this.player, this.pMobs, this.upMob, null, this);
        this.physics.add.collider(this.pMobs, this.gEnemies, this.hitMob, null, this);

        // Lose Conditions - If player collides with red enemies/water
        this.physics.add.collider(this.player, this.water, this.gameOver, null, this);
        this.physics.add.collider(this.player, this.gEnemies, this.hitEnemy, null, this);
        this.physics.add.collider(this.player, this.bEnemies, this.hitEnemyBounce, null, this);

        // Win Conditions - If player collides with the flag at the end of the map
        this.physics.add.collider(this.player, this.flag, this.clear, null, this);

        this.cameras.main
        .setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels)
        .startFollow(this.player);
    }
    
    update(){
        this.cursors = this.input.keyboard.createCursorKeys();
        this.speed = 150;

        if (this.cursors.left.isDown){
            this.player.setVelocityX(-this.speed);
            this.player.anims.play('left', true);
        }
    
        else if (this.cursors.right.isDown){
            this.player.setVelocityX(this.speed);
            this.player.anims.play('right', true);
        }
    
        else{
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }   
    
        if (this.cursors.up.isDown && this.player.body.onFloor()){
            this.player.setVelocityY(-380);
        }
    }

    collectCoins(player, coins){
        coins.destroy(coins.x, coins.y)
        this.coinsScore ++;
        this.coinCounter++;

        this.coinText.setText(`Coins: ${this.coinsScore}x`);
        
        if(this.coinCounter==5){
            this.score+=200
            this.scoreText.setText(`Score: ${this.score}`);
            this.coinCounter = 0;
        }

        if(this.coinsScore==48){
            this.score+=1000
            this.scoreText.setText(`Score: ${this.score}`);
        }
    
        return false; 
    }

    hitEnemy(player, gEnemies){

        player.setVelocityY(-400)

        if(gEnemies.body.touching.up && !gEnemies.hit){
            gEnemies.disableBody(false,false);
            this.tweens.add({
                targets: gEnemies,
                alpha: 0.3,
                scaleX: 1.5,
                scaleY: 1.5,
                ease: 'Linear',
                duration: 200,
                onComplete: function() {
                    gEnemies.destroy(gEnemies.x, gEnemies.y);
                },
            });

            this.score+=100
            this.scoreText.setText(`Score: ${this.score}`);
        }

        else{
            if (player.invulnerable == false){
                this.lives-=1
                player.setTint(0xff0000);
                player.invulnerable = true;
                
                if (this.lives == 2){
                    this.tweens.add({
                        targets: this.heart3,
                        alpha: 0,
                        scaleX: 0,
                        scaleY: 0,
                        ease: 'Linear',
                        duration: 200
                    });
                }

                else if(this.lives == 1){
                    this.tweens.add({
                        targets: this.heart2,
                        alpha: 0,
                        scaleX: 0,
                        scaleY: 0,
                        ease: 'Linear',
                        duration: 200
                    });
                }
            }
    
            // remove I-frame
            this.time.delayedCall(1000, this.removeIFrame, [], this);
    
            if(this.lives==0){
            this.scene.start("GameOverScene")
            }
        }
    }

    removeIFrame(){
        this.player.clearTint()
        this.player.invulnerable = false;
    }

    // For Bouncing Enemies
    hitEnemyBounce(player, bEnemies){

        player.setVelocityY(-450)

        if(this.boomCounter != 3 && bEnemies.body.touching.up){
            this.scale+=0.5
            bEnemies.setScale(this.scale);
            this.boomCounter++;
        }

        else if (this.boomCounter == 3){
            this.tweens.add({
                targets: bEnemies,
                alpha: 0.3,
                scaleX: 1.5,
                scaleY: 1.5,
                ease: 'Linear',
                duration: 200,
                onComplete: function() {
                    bEnemies.destroy(bEnemies.x, bEnemies.y);
                },
            });

            this.score+=150
            this.scoreText.setText(`Score: ${this.score}`);
            this.boomCounter = 0;
        }
    }

    hitMob (pMobs, gEnemies){
        
        pMobs.setVelocityX(100)

        gEnemies.disableBody(false,false);
        this.tweens.add({
            targets: gEnemies,
            alpha: 0.3,
            scaleX: 1.5,
            scaleY: 1.5,
            ease: 'Linear',
            duration: 200,
            onComplete: function() {
                gEnemies.destroy(gEnemies.x, gEnemies.y);
            },
        });
        this.score+=100;
        this.scoreText.setText(`Score: ${this.score}`);    
    }
    
    // when player is up the pMob
    upMob (player, pMobs){
        player.setVelocityY(-400)
    }

    gameOver(){
        this.scene.start("s2GameOverScene")
    }

    clear(){
        this.scene.start("s2StageClearScene")
    }
}