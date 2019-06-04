import AlignGrid from '../../classes/AlignGrid';

import { addImage } from '../../helpers';
import OverviewScene from '../Overview';

class Question5 extends Phaser.Scene {
    constructor() {
        super({
            key: 'Question5'
        });

        this.bg;
        this.vines;
        this.vines2;
        this.popupPlank;
        this.smallPlank;
        this.answer;
        this.back;
        this.substraction;

        this.answer1;
        this.answer2;



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

        this.vines2 = this.addImage(0, 0, 'Question1:Vines').setScale(2.18);
        this.grid.placeAtIndex(92, this.vines2);

        this.vines = this.addImage(0, 0, 'Question1:Vines').setScale(2.18);
        this.grid.placeAtIndex(102, this.vines);

        this.popupPlank = this.addImage(0, 0, 'StopQuiz:popupPlank');
       this.grid.placeAtIndex(37, this.popupPlank);

       this.question = this.add.text(0, 0, 'Vraag',
       { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(30 * window.devicePixelRatio)}px`}).setOrigin(0.5, 0.6);
       this.grid.placeAtIndex(21, this.question);

        this.substraction = this.addImage(0, 0, 'Question1:substraction');
        this.grid.placeAtIndex(24, this.substraction);

        this.txt1 = this.add.text(0, 0, '5/5', { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(22 * window.devicePixelRatio)}px`,}).setOrigin(0.5, 0.5);
        this.grid.placeAtIndex(24, this.txt1);


        this.txt1 = this.add.text(0, 0, 'Wat is waar?', { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(28 * window.devicePixelRatio)}px`,}).setOrigin(0.5, 0.55);
        this.grid.placeAtIndex(37, this.txt1);

       this.smallPlank = this.addImage(0, 0, 'Question1:smallPlank').setOrigin(0.5, 0.7);
       this.grid.placeAtIndex(157, this.smallPlank);

        this.answer1 = this.addImage(0, 0, 'Question5:answer1').setInteractive();
        this.answer1.on('pointerdown', () => {
            this.scene.stop('Question5');
            this.scene.launch('QuizAnswer');
        });
        this.grid.placeAtIndex(82, this.answer1);

        this.answer2 = this.addImage(0, 0, 'Question5:answer2').setInteractive();
        this.answer2.on('pointerdown', () => {
            this.scene.stop('Question5');
            this.scene.launch('QuizAnswer');
        });
        this.grid.placeAtIndex(112, this.answer2);

        this.back = this.addImage(0, 0, 'Question1:back').setOrigin(0.5, 0.8).setInteractive();
        this.back.on('pointerdown', () => {
            this.scene.stop('Question5');
            this.scene.launch('InfoQuestion');
        });
        this.grid.placeAtIndex(157, this.back);
 
        this.plank = this.addImage(0, 0, 'Info:plank');
       this.grid.placeAtIndex(187, this.plank);

       this.inleveren = this.addImage(0, 0, 'Info:Inleveren').setInteractive();
       this.inleveren.on('pointerdown', () => {
        this.scene.stop('Question5');
        this.scene.launch('QuizAnswer');
    });
       this.grid.placeAtIndex(187, this.inleveren);

       this.quit = this.addImage(0, 0, 'Daily:quit').setOrigin(.5, .675).setInteractive();
       this.quit.on('pointerdown', () => {
           this.scene.sleep('Question5');
           this.scene.launch('StopQuiz');
       });
       this.grid.placeAtIndex(217, this.quit);

       this.BonusPlank = this.addImage(0, 0, 'Info:bonusPlank').setOrigin(0.5, 0.8);
       this.grid.placeAtIndex(67, this.BonusPlank);

        //this.grid.showNumbers();
    }
    
}

    export default Question5;