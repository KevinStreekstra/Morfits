import Player from '../classes/Player';
import AlignGrid from '../classes/AlignGrid';

class OverviewScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'OverviewScene'
        });

        this.background_cloud;

        this.morfitWalking;
        this.ground;
        this.HomePlant;
        this.HomePlant2;
        this.SkyPlant;

        this._player = new Player();
        this.player = {};

        this.energyTxt;
        this.foodTxt;
        this.healthTxt;

        this.xpTxt;
        this.levelTxt;
        this.progressTxt;

        this.dailyQuestion = {};

        this.scaleRatio = window.devicePixelRatio / 3;
    } 

    preload() {
        this.player = this._player.get();
    }
      
    create() {

        this.grid = new AlignGrid({
            scene: this, 
            rows: 11, 
            cols: 11, 
            width: this.sys.game.config.width, 
            height: this.sys.game.config.height
        });

        console.log(`Level Progress: ${this._player.getLevelProgress()}%`);

        this.bg = this.add.image(0, 0, 'bg').setOrigin(0, 0);
        this.background_cloud = this.add.tileSprite(0, 0, this.width, this.height, 'bg_cloud').setOrigin(0, 0);
        this.add.image(0, 0, 'bg_mntn4').setOrigin(0, 0).setScrollFactor(.75);
        this.add.image(0, 0, 'bg_mntn3').setOrigin(0, 0).setScrollFactor(.60);
        this.add.image(0, 0, 'bg_mntn2').setOrigin(0, 0).setScrollFactor(.60);
        this.add.image(0, 0, 'bg_mntn1').setOrigin(0, 0).setScrollFactor(.60);
        this.add.image(0, 450, 'bg_mntn0').setOrigin(0, 0).setScrollFactor(.60);
        this.add.image(0, 0, 'bg_sky').setOrigin(0, 0);

        this.ground = this.add.image(0, 0, 'ground');
        this.grid.placeAtIndex(109, this.ground);

        this.HomePlant = this.add.image(0, 0, 'HomePlant');
        this.grid.scaleTo(this.HomePlant, .4);
        this.grid.placeAtIndex(86, this.HomePlant);

        this.HomePlant2 = this.add.image(0, 0, 'HomePlant2');
        this.grid.scaleTo(this.HomePlant2, .4);
        this.grid.placeAtIndex(78, this.HomePlant2);

        this.SkyPlant = this.add.image(0, 0, 'SkyPlant');
        this.grid.scaleTo(this.SkyPlant, .5);
        this.grid.placeAtIndex(24, this.SkyPlant);

        this.morfitWalking = this.add.image(0, 0, 'morfitWalking');
        this.morfitWalking.flipX = true;
        this.grid.scaleTo(this.morfitWalking, .5);
        this.grid.placeAtIndex(60, this.morfitWalking);

        this.energyTxt = this.add.text(20, 20, `Energy: ${this.player.energy}`);
        this.foodTxt = this.add.text(20, 40, `Food: ${this.player.food}`);
        this.healthTxt = this.add.text(20, 60, `Health: ${this.player.health}`);

        this.grid.placeAtIndex(60, this.energyTxt);

        this.levelTxt = this.add.text(20, 100, `Level: ${this._player.getLevel()}`);
        // this.progressTxt = this.add.text(20, 120, `Progress: ${this._player.getLevelProgress()}`);
        this.xpTxt = this.add.text(20, 120, `XP: ${this.player.xp}/${this._player.getRequiredXP(this._player.getLevel())}`);

        this.dailyQuestion = this._player.getDailyQuestion();
        this.add.text(20, 160, `${this.dailyQuestion.question}`);

        this.grid.showNumbers();
    }
      
    update() {
        this.background_cloud.tilePositionX -= .5;
        
        this.player = this._player.get();
        this.energyTxt.text = `Energy: ${this.player.energy}`;
        this.foodTxt.text = `Food: ${this.player.food}`;
        this.healthTxt.text = `Health: ${this.player.health}`;

        this.levelTxt.text = `Level: ${this._player.getLevel()}`;
        // this.progressTxt.text = `Progress: ${this._player.getLevelProgress()}`;
        this.xpTxt.text = `XP: ${this.player.xp}/${this._player.getRequiredXP(this._player.getLevel())}`;
    }
}

export default OverviewScene;