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
        this.level;
        this.levelIndicator;
        this.Myname;
        this.Xpbar;
        this.XpCount;

        this.SmallHeart;
        this.SmallEnergy;
        this.SmallPower;
        this.Hitpoints;
        this.EnergiePoints;
        this.Kracht;
        this.Heart21;
        this.Energy32;
        this.Power52;

        this.BigHeart;
        this.BigEnergy;
        this.BigPower;
        this.Mentalitytxt;
        this.Energytxt;
        this.Powertxt;

        this.addImage = addImage.bind(this);
    }

    preload() {

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
        this.bg = this.addImage(0, 0, 'Daily:bg').setOrigin(0, 0);
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

        this.levelIndicator = this.addImage(0, 0, 'Stats:levelIndicator');
        this.grid.placeAtIndex(37, this.levelIndicator);
        this.grid.scaleTo(this.levelIndicator, 0);

        this.level = this.addImage(0, 0, 'Stats:level');
        this.grid.placeAtIndex(52, this.level);
        this.grid.scaleTo(this.level, 0);

        this.Myname = this.addImage(0, 0, 'Stats:MyName').setOrigin(0.5, 0.9);
        this.grid.placeAtIndex(67, this.Myname);
        this.grid.scaleTo(this.Myname, 0);

        this.Xpbar = this.addImage(0, 0, 'Stats:XPBar');
        this.grid.placeAtIndex(82, this.Xpbar);
        this.grid.scaleTo(this.Xpbar, 0);

        this.XpCount = this.addImage(0, 0, 'Stats:XPCount').setOrigin(0.5, 2.0);
        this.grid.placeAtIndex(82, this.XpCount);
        this.grid.scaleTo(this.XpCount, 0);

        this.SmallHeart = this.addImage(0, 0, 'Stats:SmallHeart');
        this.grid.placeAtIndex(93, this.SmallHeart);
        this.grid.scaleTo(this.SmallHeart, 0);

        this.Hitpoints = this.addImage(0, 0, 'Stats:Hitpoints');
        this.grid.placeAtIndex(95, this.Hitpoints);
        this.grid.scaleTo(this.Hitpoints, 0);

        this.Heart21 = this.addImage(0, 0, 'Stats:21');
        this.grid.placeAtIndex(100, this.Heart21);
        this.grid.scaleTo(this.Heart21, 0);

        this.SmallEnergy = this.addImage(0, 0, 'Stats:SmallEnergy');
        this.grid.placeAtIndex(108, this.SmallEnergy);
        this.grid.scaleTo(this.SmallEnergy, 0);

        this.EnergiePoints = this.addImage(0, 0, 'Stats:Energypoints').setOrigin(0.6, 0.5);
        this.grid.placeAtIndex(110, this.EnergiePoints);
        this.grid.scaleTo(this.EnergiePoints, 0);

        this.Energy32 = this.addImage(0, 0, 'Stats:32');
        this.grid.placeAtIndex(115, this.Energy32);
        this.grid.scaleTo(this.Energy32, 0);

        this.SmallPower = this.addImage(0, 0, 'Stats:SmallPower');
        this.grid.placeAtIndex(123, this.SmallPower);
        this.grid.scaleTo(this.SmallPower, 0);

        this.Kracht = this.addImage(0, 0, 'Stats:kracht').setOrigin(0.7, 0.5);
        this.grid.placeAtIndex(125, this.Kracht);
        this.grid.scaleTo(this.Kracht, 0);

        this.Power52 = this.addImage(0, 0, 'Stats:52');
        this.grid.placeAtIndex(130, this.Power52);
        this.grid.scaleTo(this.Power52, 0);

        this.quit = this.addImage(0, 0, 'Daily:quit').setOrigin(.5, .675).setInteractive();
        this.quit.on('pointerdown', () => {
            this.scene.stop('StatsScene');
        });
        this.grid.placeAtIndex(217, this.quit);
        this.grid.scaleTo(this.quit, 0);

        this.popupplank = this.addImage(0, 0, 'Stats:plank_1');
        this.grid.placeAtIndex(172, this.popupplank);
        this.grid.scaleTo(this.popupplank, 0);

        this.BigHeart = this.addImage(0, 0, 'Stats:BigHeart').setOrigin(0.5, 0.2);
        this.grid.placeAtIndex(153, this.BigHeart);
        this.grid.scaleTo(this.BigHeart, 0);

        this.Mentalitytxt = this.addImage(0, 0, 'Stats:Mentalitytxt').setOrigin(0.5, 1.0);
        this.grid.placeAtIndex(183, this.Mentalitytxt);
        this.grid.scaleTo(this.Mentalitytxt, 0);

        this.BigEnergy = this.addImage(0, 0, 'Stats:BigEnergy').setOrigin(0.5, 0.2);
        this.grid.placeAtIndex(157, this.BigEnergy);
        this.grid.scaleTo(this.BigEnergy, 0);

        this.Energytxt = this.addImage(0, 0, 'Stats:Energytxt').setOrigin(0.5, 1.0);
        this.grid.placeAtIndex(187, this.Energytxt);
        this.grid.scaleTo(this.Energytxt, 0);

        this.BigPower = this.addImage(0, 0, 'Stats:BigPower').setOrigin(0.5, 0.2);
        this.grid.placeAtIndex(161, this.BigPower);
        this.grid.scaleTo(this.BigPower, 0);

        this.Powertxt = this.addImage(0, 0, 'Stats:Powertxt').setOrigin(0.5, 1.0);
        this.grid.placeAtIndex(191, this.Powertxt);
        this.grid.scaleTo(this.Powertxt, 0);

        this.tweens.add({
            targets: [
            this.popup,
            this.quit,
            this.popupplank,
            this.vines,
            this.vines2,
            this.level,
            this.levelIndicator,
            this.Myname,
            this.Xpbar,
            this.XpCount,

            this.SmallHeart,
            this.SmallEnergy,
            this.SmallPower,
            this.Hitpoints,
            this.EnergiePoints,
            this.Kracht,
            this.Heart21,
            this.Energy32,
            this.Power52,

            this.BigHeart,
            this.BigEnergy,
            this.BigPower,
            this.Mentalitytxt,
            this.Energytxt,
            this.Powertxt,
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