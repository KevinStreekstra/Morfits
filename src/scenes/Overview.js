import Player from '../classes/Player';
import AlignGrid from '../classes/AlignGrid';

import { addImage, addElement } from '../helpers';

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

        this.whiteBg;

        this.MentalBar;
        this.EnergyBar;
        this.PowerBar;

        this.IconMental;
        this.IconEnergy;
        this.IconPower;

        this._player = new Player();
        this.player = {};


        this.dailyQuestion = {};
        this.addImage = addImage.bind(this);
        this.addElement = addElement.bind(this);

        this.scaleRatio = window.devicePixelRatio / 3;
    }

    preload() {
        this.player = this._player.get();
    }

    create() {
        console.log(this.player);

        this.grid = new AlignGrid({
            scene: this,
            rows: 15,
            cols: 15,
            width: this.sys.game.config.width,
            height: this.sys.game.config.height
        });

        this.bg = this.addImage(0, 0, 'overview:bg');   
        this.grid.placeAtIndex(112, this.bg);

        // Top Navbar 
        this.TopNavbar = this.addImage(0, 0, 'overview:BottomNavbar');
        this.grid.placeAtIndex(7, this.TopNavbar);
        this.whiteBg = this.addImage(0, 0, 'overview:whiteBG').setOrigin(0.55, 0.45).setInteractive();
        this.whiteBg.on('pointerdown', () => {
            this.scene.launch('StatsScene');
        });
        this.grid.placeAtIndex(3, this.whiteBg);
        this.Mylevel = this.add.text(0, 0, this._player.getLevel(), { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(18 * window.devicePixelRatio)}px`, fill: 'black'});

        this.Myname = this.add.text(0, 0, this.player.username, { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(16 * window.devicePixelRatio)}px`, fill: 'black', Align: 'center'}).setOrigin(0.6, 0.25);
        this.grid.placeAtIndex(3, this.Myname);
        this.navPP = this.addImage(0, 0, 'overview:navPP').setOrigin(0.8, 0.43);
        this.grid.placeAtIndex(9, this.navPP);
        this.MyPP = this.add.text(0, 0, this.player.powerpoints, { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(16 * window.devicePixelRatio)}px`, fill: 'black'}).setOrigin(1.4, 0.25);
        this.grid.placeAtIndex(9, this.MyPP);
        this.navM_Dollars = this.addImage(0, 0, 'overview:navM_Dollars').setOrigin(0.7, 0.4);
        this.grid.placeAtIndex(13, this.navM_Dollars);
        this.MyM_dollars = this.add.text(0, 0, this.player.morfos, { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(16 * window.devicePixelRatio)}px`, fill: 'black'}).setOrigin(0.5, 0.25);
        this.grid.placeAtIndex(12, this.MyM_dollars);



        

        //bottom navbar & ground & icons

        this.ground2 = this.addImage(0, 0, 'overview:ground2').setOrigin(0.5, 0.42);
        this.grid.placeAtIndex(187, this.ground2);

        this.ground3 = this.addImage(0, 0, 'overview:ground3');
        this.grid.placeAtIndex(172, this.ground3);

        this.BottomNavbar = this.addImage(0, 0, 'overview:BottomNavbar');
        this.grid.placeAtIndex(217, this.BottomNavbar);

        //icons
        this.kleding = this.addImage(0, 0, 'overview:btnKleding').setOrigin(0.5, 0.37);
        this.grid.placeAtIndex(196, this.kleding);

        this.txtKleding = this.add.text(0, 0, 'Kleding', { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(16 * window.devicePixelRatio)}px`, fill: 'white'}).setOrigin(0, 0.5);
        this.grid.placeAtIndex(210, this.txtKleding);

        this.games = this.addImage(0, 0, 'overview:btnGames').setOrigin(0.5, 0.37);
        this.grid.placeAtIndex(199, this.games);

        this.txtGames = this.add.text(0, 0, 'Games', { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(16 * window.devicePixelRatio)}px`, fill: 'white'}).setOrigin(-0.1, 0.5);
        this.grid.placeAtIndex(213, this.txtGames);

        this.market = this.addImage(0, 0, 'overview:btnMarket').setOrigin(0.5, 0.37).setInteractive();
        this.grid.placeAtIndex(202, this.market);
        this.market.on('pointerdown', () => {
            this.scene.launch('ShopScene');
        });

        this.txtMarket = this.add.text(0, 0, 'Markt', { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(16 * window.devicePixelRatio)}px`, fill: 'white'}).setOrigin(-0.2, 0.5);
        this.grid.placeAtIndex(216, this.txtMarket);

        this.inventory = this.addImage(0, 0, 'overview:btnInventory').setOrigin(0.5, 0.37);
        this.grid.placeAtIndex(205, this.inventory);

        this.txtInventory = this.add.text(0, 0, 'Rugzak', { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(16 * window.devicePixelRatio)}px`, fill: 'white'}).setOrigin(-0.05, 0.5);
        this.grid.placeAtIndex(219, this.txtInventory);

        this.quiz = this.addImage(0, 0, 'overview:btnQuiz').setOrigin(0.5, 0.37).setInteractive();
        this.quiz.on('pointerdown', () => {
            this.scene.launch('DailyScene');
        });
        this.grid.placeAtIndex(208, this.quiz);

        this.txtQuiz = this.add.text(0, 0, 'Quiz', { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(16 * window.devicePixelRatio)}px`, fill: 'white'}).setOrigin(-0.3, 0.5);
        this.grid.placeAtIndex(222, this.txtQuiz);


        //morfit & plants
        this.morfitWalking = this.addImage(0, 0, 'overview:morfitWalking');
        this.grid.placeAtIndex(127, this.morfitWalking);

        this.txtXPbar = this.add.text(0, 0, `${this.player.xp}/${this._player.getRequiredXP(this._player.getLevel())}`, { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(10 * window.devicePixelRatio)}px`});
        Phaser.Display.Align.In.Center(this.txtXPbar, this.bg, 0, 375 );

        this.XPbar = this.addImage(0, 0, 'overview:XPbar');
        Phaser.Display.Align.In.Center(this.XPbar, this.bg, 0, 395);

        this.HomePlant = this.addImage(0, 0, 'overview:HomePlant2');
        this.grid.placeAtIndex(164, this.HomePlant);

        this.HomePlant2 = this.addImage(0, 0, 'overview:HomePlant');
        this.grid.placeAtIndex(151, this.HomePlant2);

        this.settings = this.addImage(0, 0, 'overview:btnSettings').setOrigin(0.7, 0);
        this.grid.placeAtIndex(164, this.settings);

        this.friends = this.addImage(0, 0, 'overview:btnFriends').setOrigin(0.7, 0.6);
        this.grid.placeAtIndex(194, this.friends);



        // Healthbars
        // Mental
        this.MentalBar = this.addImage(0, 0, 'overview:MentalBar').setOrigin(0.4, 0); 
        this.grid.placeAtIndex(17, this.MentalBar);

        this.txtMentalbar = this.add.text(0, 0, '0/100', { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(16 * window.devicePixelRatio)}px`, fill: '#2CD632'}).setOrigin(0.1, 0.9);
        this.grid.placeAtIndex(32, this.txtMentalbar);

        this.IconMental = this.addImage(0, 0, 'overview:IconMental').setOrigin(0.3, 0.2);
        this.grid.placeAtIndex(15, this.IconMental);

        // Energy
        this.EnergyBar = this.addImage(0, 0, 'overview:EnergyBar').setOrigin(0.4, 0); 
        this.grid.placeAtIndex(22, this.EnergyBar);

        this.txtEnergybar = this.add.text(0, 0, '100/100', { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(16 * window.devicePixelRatio)}px`, fill: '#3192C9'}).setOrigin(0.1, 0.9);
        this.grid.placeAtIndex(37, this.txtEnergybar);

        this.IconEnergy = this.addImage(0, 0, 'overview:IconEnergy').setOrigin(0.3, 0.2);
        this.grid.placeAtIndex(20, this.IconEnergy);

        // Power
        this.PowerBar = this.addImage(0, 0, 'overview:PowerBar').setOrigin(0.4, 0); 
        this.grid.placeAtIndex(27, this.PowerBar);

        this.txtPowerbar = this.add.text(0, 0, '100/100', { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(16 * window.devicePixelRatio)}px`, fill: '#FF6565'}).setOrigin(0.1, 0.8);
        this.grid.placeAtIndex(42, this.txtPowerbar);

        this.IconPower = this.addImage(0, 0, 'overview:IconPower').setOrigin(0.3, 0.2);
        this.grid.placeAtIndex(25, this.IconPower);


        //this.grid.showNumbers();
    }

    update() {
        this.Mylevel.text = this._player.getLevel();
        Phaser.Display.Align.In.Center(
            this.Mylevel,
            this.whiteBg,
            -110,
            7      
        );
    }
}

export default OverviewScene;
