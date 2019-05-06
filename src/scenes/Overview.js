import Player from '../classes/Player';

class OverviewScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'OverviewScene'
        });

        this.background_cloud;

        this._player = new Player();
        this.player = {};

        this.energyTxt;
        this.foodTxt;
        this.healthTxt;

        this.xpTxt;
        this.levelTxt;
        this.progressTxt;

        this.dailyQuestion = {};
    } 

    preload() {
        this.player = this._player.get();
    }
      
    create() {
        console.log(`Level Progress: ${this._player.getLevelProgress()}%`);

        this.add.image(0, 0, 'bg').setOrigin(0, 0);
        this.background_cloud = this.add.tileSprite(0, 0, this.width, this.height, 'bg_cloud').setOrigin(0, 0);
        this.add.image(0, 0, 'bg_mntn4').setOrigin(0, 0).setScrollFactor(.75);
        this.add.image(0, 0, 'bg_mntn3').setOrigin(0, 0).setScrollFactor(.60);
        this.add.image(0, 0, 'bg_mntn2').setOrigin(0, 0).setScrollFactor(.60);
        this.add.image(0, 0, 'bg_mntn1').setOrigin(0, 0).setScrollFactor(.60);
        this.add.image(0, 450, 'bg_mntn0').setOrigin(0, 0).setScrollFactor(.60);
        this.add.image(0, 0, 'bg_sky').setOrigin(0, 0);

        this.energyTxt = this.add.text(20, 20, `Energy: ${this.player.energy}`);
        this.foodTxt = this.add.text(20, 40, `Food: ${this.player.food}`);
        this.healthTxt = this.add.text(20, 60, `Health: ${this.player.health}`);

        this.levelTxt = this.add.text(20, 100, `Level: ${this._player.getLevel()}`);
        // this.progressTxt = this.add.text(20, 120, `Progress: ${this._player.getLevelProgress()}`);
        this.xpTxt = this.add.text(20, 120, `XP: ${this.player.xp}/${this._player.getRequiredXP(this._player.getLevel())}`);

        this.dailyQuestion = this._player.getDailyQuestion();
        this.add.text(20, 160, `${this.dailyQuestion.question}`);
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