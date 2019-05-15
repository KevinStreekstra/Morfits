import AlignGrid from '../classes/AlignGrid';

import { addImage } from '../helpers';

class DailyScenes extends Phaser.Scene {
    constructor() {
        super({
            key: 'DailyScene'
        });

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

        this.overlay = this.addImage(0, 0, 'Daily:bg').setOrigin(0, 0);
        this.grid.scaleY(this.overlay, 1);

        this.popup = this.addImage(0, 0, 'Daily:popup');
        this.grid.placeAtIndex(112, this.popup);
        this.grid.scaleTo(this.popup, 0);

        this.Mask = this.addImage(0, 0, 'Daily:BgMask');
        this.grid.placeAtIndex(112, this.Mask);
        this.grid.scaleTo(this.Mask, 0);

        this.quit = this.addImage(0, 0, 'Daily:quit').setInteractive();
        this.quit.on('pointerdown', () => {
            this.scene.stop('DailyScene');
        });
        this.grid.placeAtIndex(202, this.quit);
        this.grid.scaleTo(this.quit, 0);

        this.start = this.addImage(0, 0, 'Daily:start');
        this.grid.placeAtIndex(172, this.start);
        this.grid.scaleTo(this.start, 0);

        this.popupplank = this.addImage(0, 0, 'Daily:popupPlank');
        this.grid.placeAtIndex(142, this.popupplank);
        this.grid.scaleTo(this.popupplank, 0);

        this.popuptxt = this.addImage(0, 0, 'Daily:Planktxt');
        this.grid.placeAtIndex(142, this.popuptxt);
        this.grid.scaleTo(this.popuptxt, 0);

        this.ribbonCoins = this.addImage(0, 0, 'Daily:ribbonCoins');
        this.grid.placeAtIndex(97, this.ribbonCoins);
        this.grid.scaleTo(this.ribbonCoins, 0);

        this.active = this.addImage(0, 0, 'Daily:active');
        this.grid.placeAtIndex(48, this.active);
        this.grid.scaleTo(this.active, 0);

        this.Quiz = this.addImage(0, 0, 'Daily:Quiz');
        this.grid.placeAtIndex(48, this.Quiz);
        this.grid.scaleTo(this.Quiz, 0);

        this.seperator = this.addImage(0, 0, 'Daily:seperator');
        this.grid.placeAtIndex(52, this.seperator);
        this.grid.scaleTo(this.seperator, 0);

        this.mission = this.addImage(0, 0, 'Daily:Mission').setInteractive();
        this.grid.placeAtIndex(56, this.mission);
        this.mission.on('pointerdown', () => {
            this.scene.sleep('DailyScene');
            this.scene.launch('WeeklyScene');
        });
        this.grid.scaleTo(this.mission, 0);

        this.tweens.add({
            targets: [
                this.popup,
                this.Mask,
                this.start,
                this.quit,
                this.popupplank,
                this.popuptxt,
                this.ribbonCoins,
                this.active,
                this.Quiz,
                this.seperator,
                this.mission,
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

export default DailyScenes;