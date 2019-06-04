import Phaser from 'phaser'

const gameOptions = {
    birdGravity: 800,
    birdSpeed: 125,
    birdFlap: 300,
    minPipeHeight: 50,
    pipeDistance: [220, 280],
    pipeHole: [200, 230],
    localStorageName: 'bestFlappyScore'
};

class FlappyGame extends Phaser.Scene {
    constructor() {
        super({
            key: 'FlappyGame',
            backgroundImage: '/src/assets/mini_game/mini-game_bg.jpg',
            physics: {
                default: 'arcade',
                arcade: {
                    x: 0,
                    y: 0,
                    gravity: {
                        y: 0
                    },
                    debug: true,

                }
            }
        });
    }

    preload() {
        this.load.image('FlappyGame:head', '/src/assets/mini_game/head.png');
        this.load.image('FlappyGame:pipe', '/src/assets/mini_game/pipe.png');
        this.load.image('FlappyGame:background', '/src/assets/mini_game/mini-game_bg.jpg')
    }
    create() {
        // FIXME: add dpi handler
        this.add.image(0, 0, 'FlappyGame:background').setScale(1 * window.devicePixelRatio, 1 * window.devicePixelRatio).setOrigin(0,0)
        this.pipeGroup = this.physics.add.group();
        
        this.pipePool = [];
        for(let i = 0; i < 4; i++){
            this.pipePool.push(this.pipeGroup.create(0, 0, 'FlappyGame:pipe').setScale(1 * window.devicePixelRatio, 1 * window.devicePixelRatio));
            this.pipePool.push(this.pipeGroup.create(0, 0, 'FlappyGame:pipe').setScale(1 * window.devicePixelRatio, 1 * window.devicePixelRatio));
            this.placePipes(false);
        }
 
        this.pipeGroup.setVelocityX(-gameOptions.birdSpeed);
        this.bird = this.physics.add.sprite(80, this.sys.game.config.height / 2, 'FlappyGame:head').setScale(1 * window.devicePixelRatio, 1 * window.devicePixelRatio);
        this.bird.body.gravity.y = gameOptions.birdGravity;
        this.bird.body.setGravityY(gameOptions.birdGravity)
        this.input.on('pointerdown', this.flap, this);
        this.score = 0;
        this.topScore = localStorage.getItem(gameOptions.localStorageName) == null ? 0 : localStorage.getItem(gameOptions.localStorageName);
        this.scoreText = this.add.text(10, 10, '');
        
        this.updateScore(this.score);
    }

    
    updateScore(inc){
        
        this.score += inc;
        this.scoeText.text = 'score: ' + this.score + '\nBest: ' + this.topScore;
    }

    placePipes(addScore) {
        let rightMost = this.getRightMostPipe();
        let pipeHoleHeight = Phaser.Math.Between(gameOptions.pipeHole[0],gameOptions.pipeHole[1]);
        let pipeHolePosition = Phaser.Math.Between(gameOptions.minPipeHeight + pipeHoleHeight / 2, this.sys.game.config.height - gameOptions.minPipeHeight - pipeHoleHeight / 2);
        this.pipePool[0].x = rightMost + this.pipePool[0].getBounds().width + Phaser.Math.Between(gameOptions.pipeDistance[0], gameOptions.pipeDistance[1]);
        this.pipePool[0].y = pipeHolePosition - pipeHoleHeight / 2;
        this.pipePool[0].setOrigin(0, 1);
        this.pipePool[1].x = this.pipePool[0].x;
        this.pipePool[1].y = pipeHolePosition + pipeHoleHeight / 2;
        this.pipePool[1].setOrigin(0, 0);
        this.pipePool = [];
        if (addScore) {
            this.updateScore(1);
        }
    }

    flap() {
        this.bird.body.setVelocityY(-gameOptions.birdFlap);
    }

    getRightMostPipe() {
        let rightMostPipe = 0;
        this.pipeGroup.getChildren().forEach(function(pipe){
            rightMostPipe = Math.max(rightMostPipe, pipe.x);
        });
        return rightMostPipe;
    }

    update(){
        this.physics.world.collide(this.bird, this.pipeGroup, function() {
            this.die();
        }, null, this);
        if(this.bird.y > this.sys.game.config.height || this.bird.y < 0){
            this.die();
        }

        this. pipeGroup.getChildren().forEach(function(pipe) {
            if(pipe.getBounds().right < 0) {
                this.pipePool.push(pipe);
                if(this.pipePool.length == 2) {
                    this.placePipes(true);
                }
            }
        }, this)
    }
    
    die(){
        localStorage.setItem(gameOptions.localStorageName, Math.max(this.score, this.topScore));
        this.scene.start('PlayGame');
    }
};

export default FlappyGame