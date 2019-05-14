import Player from '../classes/Player';
import AlignGrid from '../classes/AlignGrid';

class OverviewScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'OverviewScene'
        });

        this.scene;

        this.background_cloud;

        this.morfitWalking;
        this.XPbar;
        this.BottomNavbar;
        this.ground2;
        this.ground3;
        this.HomePlant;
        this.HomePlant2;
        this.nav;
        this.settings;
        this.friends;
        this.gym;
        this.games;
        this.feed;
        this.inventory;
        this.quiz;

        this.txtGym;
        this.txtGames;
        this.txtFeed;
        this.txtInventory;
        this.txtQuiz;
        this.txtXPbar;

        this.MentalBar;
        this.EnergyBar;
        this.PowerBar;

        this.IconMental;
        this.IconEnergy;
        this.IconPower;

        this.txtMentalbar;
        this.txtEnergybar;
        this.txtPowerbar;

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

        this.bg = this.add.image(0, 0, 'overview:bg').setOrigin(0, 0); 

        //bottom navbar & ground & icons
        
        this.ground2 = this.add.image(0, 0, 'overview:ground2').setOrigin(0.5, 0.42);
        this.grid.placeAtIndex(187, this.ground2);

        this.ground3 = this.add.image(0, 0, 'overview:ground3');
        this.grid.placeAtIndex(172, this.ground3);

        this.BottomNavbar = this.add.image(0, 0, 'overview:BottomNavbar');
        this.grid.placeAtIndex(217, this.BottomNavbar);

        //icons
        this.gym = this.add.image(0, 0, 'overview:btnGym').setOrigin(0.5, 0.37);
        this.grid.placeAtIndex(196, this.gym);

        this.txtGym = this.add.image(0, 0, 'overview:txtGym');
        this.grid.placeAtIndex(211, this.txtGym);

        this.games = this.add.image(0, 0, 'overview:btnGames').setOrigin(0.5, 0.37);
        this.grid.placeAtIndex(199, this.games);

        this.txtGames = this.add.image(0, 0, 'overview:txtGames');
        this.grid.placeAtIndex(214, this.txtGames);

        this.feed = this.add.image(0, 0, 'overview:btnfeed').setOrigin(0.5, 0.37);
        this.grid.placeAtIndex(202, this.feed);

        this.txtFeed = this.add.image(0, 0, 'overview:txtFeed');
        this.grid.placeAtIndex(217, this.txtFeed);

        this.inventory = this.add.image(0, 0, 'overview:btnInventory').setOrigin(0.5, 0.37);
        this.grid.placeAtIndex(205, this.inventory);

        this.txtInventory = this.add.image(0, 0, 'overview:txtInventory').setOrigin(0.5, 0.43);
        this.grid.placeAtIndex(220, this.txtInventory);

        this.quiz = this.add.image(0, 0, 'overview:btnQuiz').setOrigin(0.5, 0.37).setInteractive();
        this.quiz.on('pointerdown', () => {
            this.scene.launch('DailyScene');
        });
        this.grid.placeAtIndex(208, this.quiz);

        this.txtQuiz = this.add.image(0, 0, 'overview:txtQuiz');
        this.grid.placeAtIndex(223, this.txtQuiz);


        //morfit & plants
        this.morfitWalking = this.add.image(0, 0, 'overview:morfitWalking');
        this.grid.placeAtIndex(127, this.morfitWalking);

        this.txtXPbar = this.add.image(0, 0, 'overview:txtXPbar').setOrigin(0.6, 0);
        this.grid.scaleTo(this.txtXPbar, 0.15);
        this.grid.placeAtIndex(172, this.txtXPbar);

        this.XPbar = this.add.image(0, 0, 'overview:XPbar').setOrigin(0.6, 1.3);
        this.grid.placeAtIndex(187, this.XPbar);

        this.HomePlant = this.add.image(0, 0, 'overview:HomePlant2');
        this.grid.placeAtIndex(164, this.HomePlant);

        this.HomePlant2 = this.add.image(0, 0, 'overview:HomePlant');
        this.grid.placeAtIndex(151, this.HomePlant2);

        this.settings = this.add.image(0, 0, 'overview:btnSettings').setOrigin(0.7, 0);
        this.grid.placeAtIndex(164, this.settings);

        this.friends = this.add.image(0, 0, 'overview:btnFriends').setOrigin(0.7, 0.6);
        this.grid.placeAtIndex(194, this.friends);

        //top navbar & healthbars
        this.MentalBar = this.add.image(0, 0, 'overview:MentalBar');
        this.grid.placeAtIndex(32, this.MentalBar);

        // this.txtMentalbar = this.add.image(0, 0, 'overview:Mental80').setOrigin(0.2, 1.9);
        this.txtMentalbar = this.add.text(0, 0, '80/100', { fontFamily: 'Bubblegum Sans', fontSize: '16px', fill: 'green'}).setOrigin(0.5, 1.8);
        this.grid.placeAtIndex(47, this.txtMentalbar);

        this.IconMental = this.add.image(0, 0, 'overview:IconMental').setOrigin(0.45, 0.5);
        this.grid.placeAtIndex(30, this.IconMental);

        this.EnergyBar = this.add.image(0, 0, 'overview:EnergyBar');
        this.grid.placeAtIndex(37, this.EnergyBar);

        this.txtEnergybar = this.add.text(0, 0, '100/100', { fontFamily: 'Bubblegum Sans', fontSize: '16px', fill: 'blue'}).setOrigin(0.5, 1.8);
        this.grid.placeAtIndex(52, this.txtEnergybar);

        this.IconEnergy = this.add.image(0, 0, 'overview:IconEnergy').setOrigin(0.45, 0.5);
        this.grid.placeAtIndex(35, this.IconEnergy);

        this.PowerBar = this.add.image(0, 0, 'overview:PowerBar');
        this.grid.placeAtIndex(42, this.PowerBar);

        this.txtPowerbar = this.add.text(0, 0, '100/100', { fontFamily: 'Bubblegum Sans', fontSize: '16px', fill: 'red'}).setOrigin(0.5, 1.8);
        this.grid.placeAtIndex(57, this.txtPowerbar);

        this.IconPower = this.add.image(0, 0, 'overview:IconPower').setOrigin(0.45, 0.5);
        this.grid.placeAtIndex(40, this.IconPower);

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

        //this.grid.showNumbers();
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