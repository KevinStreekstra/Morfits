import PopupModalScene from '../PopupModal';
import { withDPI } from '../../helpers';

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
        '.2     3         h                  u                            h               u      h       1                       1                   u                  h                  u                            h               u      h       1                       1                   u                        3.'+
        '.                                                                                                                                                                                                                                                                                                                  .'+
        '.                                                                                                                                                                                                                                                                                                                  .'+
        '4444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444';
    }
    
    preload() {    }

    create() {
        console.log('run morfi run game created');      
        this.cameras.main.setBackgroundColor('#132B4B');


        this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.add.sprite(0,0, 'games:bg').setDepth(-1).setScrollFactor(0.04).setScale(withDPI(1), withDPI(1));

        this.you = this.physics.add.image(0,0, 'games:you').setScrollFactor(0).setScale(withDPI(1), withDPI(1));


        this.button_run = this.add.sprite(0,0, 'games:run').setOrigin(-0,-4.5).setDepth(2).setScale(withDPI(0.4)).setScrollFactor(0);
        this.button_jump = this.add.sprite(0,0, 'games:jump').setOrigin(-2,-4.5).setDepth(2).setScale(withDPI(0.4)).setScrollFactor(0);
        this.button_run.setInteractive();
        this.button_jump.setInteractive();

        this.createPlatform();
        this.spawnPlayer();
        this.spawnMinimap();

        this.button_jump.on('pointerdown', () => {
            if(this.player.body.touching.down) {
                this.player.setVelocityY(withDPI(-550));
            }
        });



        this.button_run.on('pointerdown', (pointer) => {
            console.log(pointer.isDown);
            this.updateSpeed(pointer.isDown);
        });
        this.button_run.on('pointerup', (pointer) => {
            this.updateSpeed(pointer.isDown);
        });
        


    }
    update() {
        this.setSpeed();
        this.updateSpeed();
    }

    updateSpeed(pointer){
        pointer ? this.player.setVelocityX(withDPI(400)) : null;
    }
    setSpeed(x = withDPI(400), y = withDPI(550)){
        if(this.key_W.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-y);
        }
        if(this.key_A.isDown) {
            this.player.setVelocityX(-x);
            this.you.setVelocityX(-50);
        } else if(this.key_D.isDown) {
            this.player.setVelocityX(x);
            this.you.setVelocityX(50);
        } else{
            this.player.setVelocityX(0);
            this.you.setVelocityX(0);
        }
    };

    spawnPlayer(x, y) {
        this.player = this.physics.add.image(x, y, "games:player");
        //set the width of the sprite
        this.player.displayWidth = withDPI(75);
        //scale evenly
        this.player.scaleY = this.player.scaleX;

        this.player.body.setGravityY(withDPI(750));
        this.physics.add.collider(this.player, this.platforms, this.removeSpeed, null, this);
        this.physics.add.collider(this.player, this.grounds);
        this.physics.add.overlap(this.player, this.healty, this.collectHealty, null, this);
        this.physics.add.overlap(this.player, this.unhealty, this.reduceSpeed, null, this);

        this.physics.add.collider(this.you, this.platforms, this.removeSpeed, null, this);
        this.physics.add.collider(this.you, this.grounds);
        this.physics.add.overlap(this.you, this.healty, this.collectHealty, null, this);
        this.physics.add.overlap(this.you, this.unhealty, this.reduceSpeed, null, this);

        this.physics.add.overlap(this.player, this.finish, this.done, null, this);
        
        this.cameras.main.startFollow(this.player, true, true, 0);
    }
    spawnMinimap(){
        // max width of map (i think) 1109px
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
                    this.platforms.create(drawX, drawY, "games:platform").setScale(withDPI(0.15),withDPI(0.15)).setOrigin(0, withDPI(2)).refreshBody();
                } else if(row.charAt(i)==='2') {
                    if(row.charAt(i+1)==='1') {
                        this.spawnPlayer(drawX-withDPI(4), drawY-withDPI(12));
                    } else if(row.charAt(i-1)==='1'){
                        this.spawnPlayer(drawX+withDPI(4), drawY-withDPI(12));
                    } else {
                        this.spawnPlayer(drawX, drawY-withDPI(12));					
                    }
                } else if(row.charAt(i+1)==='h') {
                    this.healty.create(drawX, drawY, "games:lemon").setScale(withDPI(0.15),withDPI(0.15)).setOrigin(0, 4).refreshBody();
                } else if(row.charAt(i+1)==='u') {
                    this.unhealty.create(drawX, drawY+withDPI(10), "games:hamburger").setScale(withDPI(0.15),withDPI(0.15)).setOrigin(0, 4).refreshBody();
                } else if(row.charAt(i+1)==='3') {
                    this.finish.create(drawX, drawY-withDPI(10), "games:finish").setScale(withDPI(0.5),withDPI(0.5)).setOrigin(0, 1.3).setDepth(2).refreshBody();
                } else if(row.charAt(i+1)==='4') {
                    this.grounds.create(withDPI(800)*(i-1), drawY-withDPI(150), "games:ground").setScale(withDPI(1),withDPI(1)).refreshBody();
                }
                drawX+=withDPI(40);
            }
            drawY+=withDPI(40);
        });
    };

    collectHealty(player, healty){
        healty.destroy();
        player.body.setAccelerationX(player.body.acceleration.x + 10000);
    };

    removeSpeed(player){
        if(player.body.blocked.down && player.body.blocked.right || player.body.blocked.right){
            player.body.setAccelerationX(0);
        }
    }

    reduceSpeed(player, unhealthy){
        unhealthy.destroy();
        player.body.setAccelerationX(0);
    };

    done() {
        this.physics.pause();
        this.scene.launch('PopupModalScene', {
            scenes: {
                start: ['OverviewScene'],
                stop: [
                    'PopupModalScene',
                    'RunMorfiRun',
                ],
            },
            woodenBackground: 'popup:background',
            assets: [
                {
                    asset: 'popup:button',
                    x: 0,
                    y: 100,
                    UseDefinedScenes: true,
                    scenes: {},
                },
                {
                    asset: 'games:money',
                    x: 20,
                    y: 0,
                    UseDefinedScenes: false,
                    scenes: {},
                },
            ],
            content: [
                {
                    text: 'Goed Gedaan!',
                    fontSize: 42,
                    x: 0,
                    y: -110,
                },
                {
                    text: 'x 20',
                    fontSize: 27,
                    x: 60,
                    y: -30,
                },
                {
                    text: 'Prijs:',
                    fontSize: 42,
                    x: -50,
                    y: 0,
                }
            ]
        });
    }
}

export default RunMorfiRun;