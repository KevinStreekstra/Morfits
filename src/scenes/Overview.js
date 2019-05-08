import Player from '../classes/Player';
import AlignGrid from '../classes/AlignGrid';

class OverviewScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'OverviewScene'
        });

        this.background_cloud;

        this.morfitWalking;
        this.BottomNavbar;
        this.ground2;
        this.ground3;
        this.HomePlant;
        this.HomePlant2;
        this.nav;


        this.MentalBar;
        this.EnergyBar;
        this.PowerBar;

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
            rows: 15, 
            cols: 15, 
            width: this.sys.game.config.width, 
            height: this.sys.game.config.height
        });

        console.log(`Level Progress: ${this._player.getLevelProgress()}%`);

        this.bg = this.add.image(0, 0, 'overview:bg').setOrigin(0, 0); 

        //bottom navbar & ground
        this.ground2 = this.add.image(0, 0, 'overview:ground2').setOrigin(0.5, 0.42);
        this.grid.placeAtIndex(187, this.ground2);

        this.ground3 = this.add.image(0, 0, 'overview:ground3');
        this.grid.placeAtIndex(172, this.ground3);

        this.BottomNavbar = this.add.image(0, 0, 'overview:BottomNavbar');
        this.grid.placeAtIndex(217, this.BottomNavbar);

        //morfit & plants
        this.morfitWalking = this.add.image(0, 0, 'overview:morfitWalking');
        this.grid.placeAtIndex(127, this.morfitWalking);

        this.HomePlant = this.add.image(0, 0, 'overview:HomePlant2');
        this.grid.placeAtIndex(164, this.HomePlant);

        this.HomePlant2 = this.add.image(0, 0, 'overview:HomePlant');
        this.grid.placeAtIndex(151, this.HomePlant2);

        //top navbar & healthbars
        this.MentalBar = this.add.image(0, 0, 'overview:MentalBar');
        this.grid.placeAtIndex(32, this.MentalBar);

        this.EnergyBar = this.add.image(0, 0, 'overview:EnergyBar');
        this.grid.placeAtIndex(37, this.EnergyBar);

        this.PowerBar = this.add.image(0, 0, 'overview:PowerBar');
        this.grid.placeAtIndex(42, this.PowerBar);

        this.nav = this.add.image(0, 0, 'overview:TopNavbar');
        this.grid.placeAtIndex(7, this.nav);



        // this.energyTxt = this.add.text(20, 20, `Energy: ${this.player.energy}`);
        // this.foodTxt = this.add.text(20, 40, `Food: ${this.player.food}`);
        // this.healthTxt = this.add.text(20, 60, `Health: ${this.player.health}`);

        // this.grid.placeAtIndex(60, this.energyTxt);

        // this.levelTxt = this.add.text(20, 100, `Level: ${this._player.getLevel()}`);
        // // this.progressTxt = this.add.text(20, 120, `Progress: ${this._player.getLevelProgress()}`);
        // this.xpTxt = this.add.text(20, 120, `XP: ${this.player.xp}/${this._player.getRequiredXP(this._player.getLevel())}`);

        // this.dailyQuestion = this._player.getDailyQuestion();
        // this.add.text(20, 160, `${this.dailyQuestion.question}`);

        // this.grid.showNumbers();
    }
      
    update() {
        // this.background_cloud.tilePositionX -= .5;
        
        // this.player = this._player.get();
        // this.energyTxt.text = `Energy: ${this.player.energy}`;
        // this.foodTxt.text = `Food: ${this.player.food}`;
        // this.healthTxt.text = `Health: ${this.player.health}`;

        // this.levelTxt.text = `Level: ${this._player.getLevel()}`;
        // // this.progressTxt.text = `Progress: ${this._player.getLevelProgress()}`;
        // this.xpTxt.text = `XP: ${this.player.xp}/${this._player.getRequiredXP(this._player.getLevel())}`;
    }
}

export default OverviewScene;