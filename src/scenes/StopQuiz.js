import AlignGrid from '../classes/AlignGrid';

import { addImage } from '../helpers';

class StopQuiz extends Phaser.Scene {
    constructor() {
        super({
            key: 'StopQuiz'
        });

        this.overlay;
        this.popupBg;
        this.popupPlank;
        this.btnYes;
        this.btnNo;
        this.text;
       
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

        this.overlay = this.addImage(0, 0, 'StopQuiz:overlay');
        this.grid.scaleY(this.overlay, 1);
        this.grid.placeAtIndex(112, this.overlay);

       this.popupBg = this.addImage(0, 0, 'StopQuiz:popupBg');
       this.grid.placeAtIndex(112, this.popupBg);

       this.popupPlank = this.addImage(0, 0, 'StopQuiz:popupPlank');
       this.grid.placeAtIndex(97, this.popupPlank);

       this.btnYes = this.addImage(0, 0, 'StopQuiz:btnYes').setInteractive();
       this.grid.placeAtIndex(139, this.btnYes);
       this.btnYes.on('pointerdown', () => {
        this.scene.stop('StopQuiz');
        this.scene.launch('OverviewScene');
         });

       this.btnNo = this.addImage(0, 0, 'StopQuiz:btnNo').setInteractive();
       this.grid.placeAtIndex(145, this.btnNo);
       this.btnNo.on('pointerdown', () => {
        this.scene.stop('StopQuiz');
        this.scene.launch('StartQuiz');
         });

       this.text = this.addImage(0, 0, 'StopQuiz:Text');
       this.grid.placeAtIndex(97, this.text);

        //this.grid.showNumbers();
    }
    
}

    export default StopQuiz;