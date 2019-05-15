import AlignGrid from '../classes/AlignGrid';

import { addImage } from '../helpers';

class WeeklyScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'WeeklyScene'
        });

        this.addImage = addImage.bind(this);
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

        this.Mask = this.addImage(0, 0, 'Daily:BgMask');
        this.grid.placeAtIndex(112, this.Mask);

        this.quit = this.addImage(0, 0, 'Daily:quit').setInteractive();
        this.quit.on('pointerdown', () => {
            this.scene.stop('WeeklyScene');
        });
        this.grid.placeAtIndex(202, this.quit);

        this.popupplank = this.addImage(0, 0, 'Daily:popupPlank');
        this.grid.placeAtIndex(97, this.popupplank);

        this.plank1 = this.addImage(0, 0, 'Weekly:Plank1');
        this.grid.placeAtIndex(96, this.plank1);

        this.check = this.addImage(0, 0, 'Weekly:Check');
        this.grid.placeAtIndex(102, this.check);

        this.popupplank = this.addImage(0, 0, 'Daily:popupPlank');
        this.grid.placeAtIndex(127, this.popupplank);

        this.plank2 = this.addImage(0, 0, 'Weekly:Plank2');
        this.grid.placeAtIndex(125, this.plank2);

        this.check2 = this.addImage(0, 0, 'Weekly:Check2');
        this.grid.placeAtIndex(132, this.check2);

        this.popupplank = this.addImage(0, 0, 'Daily:popupPlank');
        this.grid.placeAtIndex(157, this.popupplank);

        this.plank3 = this.addImage(0, 0, 'Weekly:Plank3');
        this.grid.placeAtIndex(156, this.plank3);

        this.check2 = this.addImage(0, 0, 'Weekly:Check2');
        this.grid.placeAtIndex(162, this.check2);

        this.active = this.addImage(0, 0, 'Daily:active');
        this.grid.placeAtIndex(56, this.active);

        this.Quiz = this.addImage(0, 0, 'Daily:Quiz').setInteractive();
        this.Quiz.on('pointerdown', () => {
            this.scene.stop('WeeklyScene');
            this.scene.wake('DailyScene');
        });
        this.grid.placeAtIndex(48, this.Quiz);    

        this.seperator = this.addImage(0, 0, 'Daily:seperator');
        this.grid.placeAtIndex(52, this.seperator);   

        this.mission = this.addImage(0, 0, 'Daily:Mission');
        this.grid.placeAtIndex(56, this.mission);
       

        // this.grid.showNumbers();
    }
}

export default WeeklyScene;