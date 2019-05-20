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
        '.                                          .'+
        '.                            h      1      .'+
        '.            1                             .'+
        '.                     1                    .'+
        '.             h                    u       .'+
        '.       1 h                 1              .'+
        '.2                   u                    3.'+
        '44444444444444444444444444444444444444444444';
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
        if(this.key_W.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-550);
        }
        if(this.key_A.isDown){
            this.player.setVelocityX(-150);
        }else if(this.key_D.isDown){
            this.player.setVelocityX(150);
        }else{
            this.player.setVelocityX(0);
        }
    }
    spawnPlayer(x, y) {
        this.player = this.physics.add.image(x, y, "games:player").setMaxVelocity(500);
        this.player.body.setGravityY(800);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.grounds);
        this.physics.add.overlap(this.player, this.healty, this.collectHealty, null, this);
        this.physics.add.overlap(this.player, this.finish, this.done, null, this);

        this.cameras.main.startFollow(this.player);

    }
    createPlatform(){
        this.platforms = this.physics.add.staticGroup();
        this.grounds = this.physics.add.staticGroup();
        this.healty = this.physics.add.group();

        const splittedMap = this.map.split('.');
        let drawX = 0;
        let drawY = 0;
        splittedMap.forEach(row=>{
            drawX = 0;
            for(let i = 0; i<row.length; i++){
                if(row.charAt(i)==='1'){
                    this.platforms.create(drawX, drawY, "games:platform");
                }else if(row.charAt(i)==='2'){
                    if(row.charAt(i+1)==='1'){
                        this.spawnPlayer(drawX-4, drawY-12);
                    }else if(row.charAt(i-1)==='1'){
                        this.spawnPlayer(drawX+4, drawY-12);
                    }else{
                        this.spawnPlayer(drawX, drawY-12);					
                    }
                } else if(row.charAt(i+1)==='h'){
                    this.healty.create(drawX, drawY+10, "games:lemon");
                } else if(row.charAt(i+1)==='3'){
                    this.healty.create(drawX, drawY+10, "games:finish");
                } else if(row.charAt(i+1)==='4'){
                    this.grounds.create(drawX, drawY-43, "games:ground");
                }
                drawX+=40;
            }
            drawY+=40;
        });
    };

    collectHealty(player, health){
        health.destroy();
        player.setAccelerationX(300);
    };

    done() {
        this.physics.pause();
        let deathText = this.add.text(0, 0, "YOU DIED", {
            color:"#d53636",
            fontFamily:"Arial Black",
            fontSize:"50px"
        }).setScrollFactor(0);
        Phaser.Display.Align.In.Center(deathText, this.add.zone(400, 250, 800, 500));
    }
}

export default RunMorfiRun;