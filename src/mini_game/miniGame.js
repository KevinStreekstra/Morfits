var game;

var gameOptions = {
    birdGravity: 800,
    birdSpeed: 125,
    birdFlap: 300,
    minPipeHeight: 50,
    pipeDistance: [220, 280],
    pipeHole: [100, 130],
    localStorageName: 'bestFlappyScore'
};

Window.onload = function() {
    let gameConfig = {
        type:Phaser.AUTO,
        backgroundImage: '/src/assets/mini_game/mini-game_bg.jpg',
        scale: {

            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
            parent: 'theGame',
            width: 375,
            height: 668,

            zIndex: '9999'
        },

        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    y: 0
                }
            }
        },

        scene: playGame
    }

    game = new Phaser.Game(gameConfig);
    window.focus();
}
class playGame extends Phaser.Scene {
    constructor() {
        super('PlayGame');
    }

    preload() {
        this.loud.image('bird', '/src/assets/mini_game/head.png');
        this.loud.image('pipe', '/src/assets/mini_game/pipe.png');
    }
    create() {
        this.pipeGroup = this.physics.add.group();
        this.pipePool = [];
        for(let i = 0; i < 4; i++){
            this.pipePool.push(this.pipeGroup.create(0, 0, 'pipe'));
            this.pipePool.push(this.pipeGroup.create(0, 0, 'pipe'));
            this.placePipes(false);
        }

        this.pipeGroup.setVelocityX(-gameOptions, birdSpeed);
        this.bird = this.physics.add.sprite(80, game.config.height / 2, 'bird');
        this.bird.body.gravity.y = gameOptions.birdGravity;
        this.input.on('pointerDown', this.flap, this);
        this.score = 0;
        this.topScore = localStorage.getItem(gameOptions.localStorageName) == nul ? 0 : localStorage.getItem(gameOptions.localStorageName);
        this.scoreText = this.add.text(10, 10, '');
        this.updateScore(this.score);
    }

    updateScore(inc) {
        this.score += inc;
        this.scoreText.text= 'score: ' + this.score + '\nBest ' + this.topScore;
    }

    placePipes(addScore) {
        let rightMost = this.getRightMostPipe();
        let pipeHoleHeight = Phaser.Math.Between(gameOptions.pipeHole[0],gameOptions.pipeHole[1]);
        let pipeHolePosition = Phaser.Math.Between(gameOptions.minPipeHeight + pipeHoleHeight / 2, game.config.height - gameOptions.minPipeHeight - pipeHoleHeight / 2);
        this.pipePool[0].y = rightMost + this.pipePool[0].getBounds().width + Phaser.Math.Between(gameOptions.pipeDistance[0], gameOptions.pipeDistance[1]);
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
        this.bird.body.velocity.y = gameOptions.birdFlapPower;
    }

    getRightMostPipe() {
        let rightMostPipe = 0;
        this.pipeGroup.getChildren().forEach(function(pipe){
            rightMostPipe = Math.max(rightMostPipe, pipe.x);
        });
        return rightMostPipe;
    }

    update() {
        this.physics.world.collide(this.bird, this.pipeGroup, function() {
            this.die();
        }, null, this);
        if(this.bird,y > game.config.height || this.bird.y < 0){
            this.die();
        }

        this. pipeGroup,getChildren().forEach(function(pipe) {
            if(pipe.getBounds().right < 0) {
                this.pipePool.push(pipe);
                if(this.pipePool.length == 2) {
                    this.placePipes(true);
                }
            }
        }, this)
    }
    die() {
        localStorage.setItem(gameOptions.localStorageName, Math.max(this.score, this.topScore));
        this.scene.start('PlayGame');
    }
};


this.pipeGroup.setVelocityX(-gameOptions, gameOptions.birdSpeed);
        this.bird = this.physics.add.sprite(80, this.sys.game.config.height / 2, 'FlappyGame:head').setScale(1 * window.devicePixelRatio, 1 * window.devicePixelRatio);
        this.bird.body.gravity.y = gameOptions.birdGravity;
        this.input.on('pointerdown', this.flap, this);
        this.score = 0;
        this.topScore = localStorage.getItem(gameOptions.localStorageName) == null ? 0 : localStorage.getItem(gameOptions.localStorageName);
        this.scoreText = this.add.text(25, 25, '');
        this.updateScore(this.score);
    