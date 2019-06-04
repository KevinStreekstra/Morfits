import Player from '../classes/Player';
import AlignGrid from '../classes/AlignGrid';

import { addImage } from '../helpers';

class StatsScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'StatsScene'
        });

        this.bg;
        this.popup;
        this.quit;
        this.popupplank;
        this.vines;
        this.vines2;
        this.levelIndicator;
        this.Xpbar;


        this.SmallHeart;
        this.SmallEnergy;
        this.SmallPower;
   

        this._player = new Player();
        this.player = {};

        this.BigHeart;
        this.BigEnergy;
        this.BigPower;

        this.addImage = addImage.bind(this);
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

        // this.bg = this.addImage(0, 0, 'Stats:bg').setOrigin(0, 0);
        this.bg = this.addImage(0, 0, 'Daily:bg');
        this.grid.placeAtIndex(112, this.bg);
        this.grid.scaleY(this.bg, 1);

        this.vines2 = this.addImage(0, 0, 'Stats:Vines');
        this.grid.placeAtIndex(2, this.vines2);
        this.grid.scaleTo(this.vines2, 0);

        this.vines = this.addImage(0, 0, 'Stats:Vines');
        this.grid.placeAtIndex(12, this.vines);
        this.grid.scaleTo(this.vines, 0);

        this.popup = this.addImage(0, 0, 'Stats:TabBg');
        this.grid.placeAtIndex(112, this.popup);
        this.grid.scaleTo(this.popup, 0);

        this.levelIndicatorBG = this.addImage(0, 0, 'Stats:levelIndicatorBG');
        this.grid.placeAtIndex(37, this.levelIndicatorBG);
        this.grid.scaleTo(this.levelIndicatorBG, 0);

        this.levelIndicator = this.add.text(0, 0, this._player.getLevel(), { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(32 * window.devicePixelRatio)}px`});
      
        Phaser.Display.Align.In.Center(this.levelIndicator,this.levelIndicatorBG,0 ,2 * window.devicePixelRatio);
        

        this.level = this.add.text(0, 0, 'Level', { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(22 * window.devicePixelRatio)}px`, fill: '#75BBE2'}); 
        Phaser.Display.Align.In.Center(this.level, this.bg, 0, -180 * window.devicePixelRatio);

        this.myUsername = this.add.text(0, 0, this.player.username, { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(28 * window.devicePixelRatio)}px`});
        Phaser.Display.Align.In.Center(this.myUsername, this.bg, 0, -155 * window.devicePixelRatio);

        this.xpCount = this.add.text(0, 0, `${this.player.xp}/${this._player.getRequiredXP(this._player.getLevel())}`, { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(14 * window.devicePixelRatio)}px`});
        Phaser.Display.Align.In.Center(this.xpCount,this.bg, 0, -120 * window.devicePixelRatio);

        this.Xpbar = this.addImage(0, 0, 'Stats:XPBar');
        Phaser.Display.Align.In.Center(this.Xpbar, this.bg, 0, -100 * window.devicePixelRatio);
        this.grid.scaleTo(this.Xpbar, 0);

        // Mentaliteit 
        this.SmallHeart = this.addImage(0, 0, 'Stats:SmallHeart');
        this.grid.placeAtIndex(93, this.SmallHeart);
        this.grid.scaleTo(this.SmallHeart, 0);

        this.Mentality = this.add.text(0, 0, 'Mentaliteit', { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(18 * window.devicePixelRatio)}px`}).setOrigin(0.05, 0.45);
        Phaser.Display.Align.In.Center(this.Mentality, this.bg, -45 * window.devicePixelRatio, -45 * window.devicePixelRatio);

        this.mentalityStat = this.add.text(0, 0, this.player.mentality, { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(18 * window.devicePixelRatio)}px`});
        Phaser.Display.Align.In.Center(this.mentalityStat, this.bg, 75 * window.devicePixelRatio, -45 * window.devicePixelRatio);

        // Energie
        this.SmallEnergy = this.addImage(0, 0, 'Stats:SmallEnergy');
        this.grid.placeAtIndex(108, this.SmallEnergy);
        this.grid.scaleTo(this.SmallEnergy, 0);

        this.Energy = this.add.text(0, 0, 'Energie', { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(18 * window.devicePixelRatio)}px`});
        Phaser.Display.Align.In.Center(this.Energy, this.bg, -55 * window.devicePixelRatio, 0);

        this.energyStat = this.add.text(0, 0, this.player.energy, { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(18 * window.devicePixelRatio)}px`});
        Phaser.Display.Align.In.Center(this.energyStat, this.bg, 75 * window.devicePixelRatio, 0)

        // Kracht
        this.SmallPower = this.addImage(0, 0, 'Stats:SmallPower');
        this.grid.placeAtIndex(123, this.SmallPower);
        this.grid.scaleTo(this.SmallPower, 0);


        this.Kracht = this.add.text(0, 0, 'Kracht', { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(18 * window.devicePixelRatio)}px`});
        Phaser.Display.Align.In.Center(this.Kracht, this.bg, -59 * window.devicePixelRatio, 50 * window.devicePixelRatio);

        this.krachtStat = this.add.text(0, 0, this.player.powerpoints, { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(18 * window.devicePixelRatio)}px`});
        Phaser.Display.Align.In.Center(this.krachtStat, this.bg, 75 * window.devicePixelRatio, 50 * window.devicePixelRatio);

        // Stop scene
        this.quit = this.addImage(0, 0, 'Daily:quit').setOrigin(.5, .675).setInteractive();
        this.quit.on('pointerdown', () => {
            this.scene.stop('StatsScene');
        });
        this.grid.placeAtIndex(217, this.quit);
        this.grid.scaleTo(this.quit, 0);

        this.popupplank = this.addImage(0, 0, 'Stats:plank_1');
        this.grid.placeAtIndex(172, this.popupplank);
        this.grid.scaleTo(this.popupplank, 0);

        // Mentaliteit
        this.BigHeart = this.addImage(0, 0, 'Stats:BigHeart');
        Phaser.Display.Align.In.Center(this.BigHeart, this.popupplank, -200, -60);
        this.grid.scaleTo(this.BigHeart, 0);

        this.mentalitytxt = this.add.text(0, 0, 'Mentaliteit', { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(16 * window.devicePixelRatio)}px`});
        Phaser.Display.Align.In.Center(this.mentalitytxt,this.popupplank,-200,30);
        
        this.mentalityView = this.add.text(0, 0, `${this.player.mentality}/100`, { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(16 * window.devicePixelRatio)}px`});
        Phaser.Display.Align.In.Center(this.mentalityView,this.popupplank, -200, 80);
      

        // Energie
        this.BigEnergy = this.addImage(0, 0, 'Stats:BigEnergy');
        this.grid.scaleTo(this.BigEnergy, 0);
        Phaser.Display.Align.In.Center(this.BigEnergy,this.popupplank,0,-60);

        this.energytxt = this.add.text(0, 0, 'Energie', { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(16 * window.devicePixelRatio)}px`});
        Phaser.Display.Align.In.Center(this.energytxt,this.popupplank,0,30);
        
        this.energyView = this.add.text(0, 0, `${this.player.energy}/100`, { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(16 * window.devicePixelRatio)}px`});
        Phaser.Display.Align.In.Center(this.energyView,this.popupplank, 0, 80);

        // Kracht
        this.BigPower = this.addImage(0, 0, 'Stats:BigPower');
        Phaser.Display.Align.In.Center(this.BigPower,this.popupplank,200,-60);
        this.grid.scaleTo(this.BigPower, 0);

        this.powertxt = this.add.text(0, 0, 'Power', { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(16 * window.devicePixelRatio)}px`});
        Phaser.Display.Align.In.Center(this.powertxt,this.popupplank,200,30);
        
        this.powerView = this.add.text(0, 0, `${this.player.powerpoints}/100`, { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(16 * window.devicePixelRatio)}px`});
        Phaser.Display.Align.In.Center(this.powerView,this.popupplank, 200, 80);

        this.tweens.add({
            targets: [
            this.popup,
            this.quit,
            this.popupplank,
            this.vines,
            this.vines2,
            this.levelIndicatorBG,
            this.Xpbar,
            this.XpCount,

            this.SmallHeart,
            this.SmallEnergy,
            this.SmallPower,

            this.BigHeart,
            this.BigEnergy,
            this.BigPower,
             ],
            scaleX: 1 * window.devicePixelRatio,
            scaleY: 1 * window.devicePixelRatio,
            ease: 'Bounce',
            duration: 300,
            repeat: 0,
            yoyo: false
        });

         //this.grid.showNumbers();
    }
}

export default StatsScene;