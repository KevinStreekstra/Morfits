import AlignGrid from '../../classes/AlignGrid';

import { addImage } from '../../helpers';

class InfoQuestion extends Phaser.Scene {
    constructor() {
        super({
            key: 'InfoQuestion'
        });

        this.bg;
        this.vines;
        this.vines2;
        this.popupPlank;
        this.smallPlank;
        this.answer;
        this.back;
        this.question;
        this.substraction;
        this.vraag;
        this.plank;
        this.BigPlank;
        this.BonusPlank;
        this.inleveren;



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

        this.bg = this.addImage(0, 0, 'Stats:bg').setOrigin(0, 0);
        this.grid.scaleX(this.bg, 1);
        this.grid.scaleY(this.bg, 1);

        this.vines2 = this.addImage(0, 0, 'Question1:Vines');
        this.grid.placeAtIndex(77, this.vines2);

        this.vines = this.addImage(0, 0, 'Question1:Vines');
        this.grid.placeAtIndex(87, this.vines);

        this.popupPlank = this.addImage(0, 0, 'StopQuiz:popupPlank');
       this.grid.placeAtIndex(37, this.popupPlank);


       this.plank = this.addImage(0, 0, 'Info:plank');
       this.grid.placeAtIndex(187, this.plank);

       this.BigPlank = this.addImage(0, 0, 'Info:BigPlank').setOrigin(0.5, 0.45);
       this.grid.placeAtIndex(97, this.BigPlank);

       this.smallPlank = this.addImage(0, 0, 'Question1:smallPlank').setOrigin(0.5, 0.7);
       this.grid.placeAtIndex(157, this.smallPlank);

       this.BonusPlank = this.addImage(0, 0, 'Info:bonusPlank');
       this.grid.placeAtIndex(67, this.BonusPlank);

       this.inleveren = this.addImage(0, 0, 'Info:Inleveren');
       this.grid.placeAtIndex(187, this.inleveren);

        this.back = this.addImage(0, 0, 'Question1:back').setOrigin(0.6, 0.8).setInteractive();
        this.back.on('pointerdown', () => {
            this.scene.stop('InfoQuestion');
            this.scene.launch('Question4');
        });
        this.grid.placeAtIndex(154, this.back);
 
        this.back = this.addImage(0, 0, 'Question1:back').setOrigin(0.5, 0.8).setInteractive();
        this.back.on('pointerdown', () => {
            this.scene.stop('InfoQuestion');
            this.scene.launch('Question5');
        });
        this.back.flipX = true;
        this.grid.placeAtIndex(160, this.back);

       this.quit = this.addImage(0, 0, 'Daily:quit').setOrigin(.5, .675).setInteractive();
       this.quit.on('pointerdown', () => {
           this.scene.sleep('Question1');
           this.scene.launch('StopQuiz');
       });
       this.grid.placeAtIndex(217, this.quit);

       this.txt1 = this.add.text(0, 0, 'Bij de volgende vraag hoort de onderste uitleg bij, snap jij wat er staat?',
       { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(28 * window.devicePixelRatio)}px`, align: 'center', wordWrap: {width: (250 * window.devicePixelRatio), useAdvancedWrap: true}}).setOrigin(0.5, 0.7);
       this.grid.placeAtIndex(37, this.txt1);
       //bovenste plank
    

       //Middelste plank
       this.txt1 = this.add.text(0, 0, 'Calorieën worden omgezet in energie waardoor je kan bewegen. Als je te veel calorieën eet word je dik',
       { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(28 * window.devicePixelRatio)}px`, align: 'center', wordWrap: {width: (270 * window.devicePixelRatio), useAdvancedWrap: true}}).setOrigin(0.5, 0.7);
       this.grid.placeAtIndex(112, this.txt1);




        //this.grid.showNumbers();
    }
    
}

    export default InfoQuestion;