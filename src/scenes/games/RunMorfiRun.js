class RunMorfiRun extends Phaser.Scene {
    constructor() {
        super({
            key: 'RunMorfiRun'
        });
        /* Map of the game.
            ' ' = nothing,
            1 = platform
            2 = spawn point
            3 = finish point
            4 = ground
            'h' = H ealty food
            'u' = U nhealty food
            '.' = End of platform boundary
        */ 
        this.map = 
 
        '.                              1                                                                                                       1                                     1                                                                                                       1                             .'+
        '.                      h                         u                1         h                                   h              h                                     h                         u                1         h                                   h              h                         u           .'+
        '.        1                               1             1                                               1                                         1     1                               1             1                                               1                                         1                   .'+
        '.2              h                  u                            h               u      h       1                       1                   u                  h                  u                            h               u      h       1                       1                   u                         .'+
        '.                                                                                                                                                                                                                                                                                                                 3.'+
        '4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444';
    }
    
    preload() {}

    create() {
        console.log('run morfi run game created');      
        this.cameras.main.setBackgroundColor('#ffffff');


        this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.createPlatform();
        this.spawnPlayer();

    }
    update() {
        this.setSpeed();
    }

    setSpeed(x = 400, y = 550){
        if(this.key_W.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-y);
        }
        if(this.key_A.isDown) {
            this.player.setVelocityX(-x);
        } else if(this.key_D.isDown) {
            this.player.setVelocityX(x);
        } else{
            this.player.setVelocityX(0);
        }
    };

    spawnPlayer(x, y) {
        this.player = this.physics.add.image(x, y, "games:player");
        //set the width of the sprite
        this.player.displayWidth = 75;
        //scale evenly
        this.player.scaleY = this.player.scaleX;
                
        this.player.body.setGravityY(750);
        this.physics.add.collider(this.player, this.platforms, this.removeSpeed, null, this);
        this.physics.add.collider(this.player, this.grounds);
        this.physics.add.overlap(this.player, this.healty, this.collectHealty, null, this);
        this.physics.add.overlap(this.player, this.unhealty, this.reduceSpeed, null, this);
        this.physics.add.overlap(this.player, this.finish, this.done, null, this);

        this.cameras.main.startFollow(this.player);

    }
    createPlatform(){
        this.platforms = this.physics.add.staticGroup();
        this.grounds = this.physics.add.staticGroup(); 
        this.healty = this.physics.add.staticGroup();
        this.unhealty = this.physics.add.staticGroup();
        this.finish = this.physics.add.staticGroup();

        const splittedMap = this.map.split('.');
        let drawX = 0;
        let drawY = 0;
        splittedMap.forEach(row=>{
            drawX = 0;
            for(let i = 0; i<row.length; i++){
                if(row.charAt(i)==='1') {
                    // this.platforms.create(drawX, drawY, "games:platform").setScale(0.25).refreshBody();
                    this.platforms.create(drawX, drawY, "games:platform").setScale(0.25).setOrigin(0, 3).refreshBody();
                } else if(row.charAt(i)==='2') {
                    if(row.charAt(i+1)==='1') {
                        this.spawnPlayer(drawX-4, drawY-12);
                    } else if(row.charAt(i-1)==='1'){
                        this.spawnPlayer(drawX+4, drawY-12);
                    } else {
                        this.spawnPlayer(drawX, drawY-12);					
                    }
                } else if(row.charAt(i+1)==='h') {
                    this.healty.create(drawX, drawY+10, "games:lemon").setScale(0.25).setOrigin(0, 3).refreshBody();
                } else if(row.charAt(i+1)==='u') {
                    this.unhealty.create(drawX, drawY+10, "games:hamburger").setScale(0.25).setOrigin(0, 3).refreshBody();
                } else if(row.charAt(i+1)==='3') {
                    this.finish.create(drawX, drawY+10, "games:finish").setScale(0.5).setOrigin(0, 1.4).refreshBody();
                } else if(row.charAt(i+1)==='4') {
                    this.grounds.create(drawX, drawY, "games:ground");
                }
                drawX+=40;
            }
            drawY+=40;
        });
    };

    collectHealty(player, health){
        health.destroy();
        // player.setAccelerationX(300);
        console.log(this.player, this.healty, this.platforms);
        player.body.setAccelerationX(player.body.acceleration.x + 10000);
    };

    removeSpeed(player, forced){
        if(player.body.blocked.left || player.body.blocked.right || forced){
            player.body.setAccelerationX(0);
        }
    }

    reduceSpeed(player, unhealthy){
        unhealthy.destroy();
        this.removeSpeed(player, true);
    };

    done() {
        this.physics.pause();
        let deathText = this.add.text(0, 0, "FINISHED", {
            color:"#d53636",
            fontFamily:"Arial Black",
            fontSize:"50px"
        }).setScrollFactor(0);
        Phaser.Display.Align.In.Center(deathText, this.add.zone(400, 250, 800, 500));
    }
}

export default RunMorfiRun;