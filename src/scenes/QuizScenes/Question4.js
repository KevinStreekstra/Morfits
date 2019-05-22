import AlignGrid from '../../classes/AlignGrid';

import { addImage } from '../../helpers';

class Question4 extends Phaser.Scene {
    constructor() {
        super({
            key: 'Question4'
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

        this.txt1;

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

        this.bg = this.addImage(0, 0, 'Stats:bg').setOrigin(0, 0).setScale(2.4);

        this.vines2 = this.addImage(0, 0, 'Question1:Vines');
        this.grid.placeAtIndex(77, this.vines2);

        this.vines = this.addImage(0, 0, 'Question1:Vines');
        this.grid.placeAtIndex(87, this.vines);

        this.popupPlank = this.addImage(0, 0, 'StopQuiz:popupPlank');
       this.grid.placeAtIndex(37, this.popupPlank);

        this.question = this.addImage(0, 0, 'Question1:question');
        this.grid.placeAtIndex(21, this.question);

        this.substraction = this.addImage(0, 0, 'Question1:substraction');
        this.grid.placeAtIndex(24, this.substraction);

        this.txt1 = this.add.text(0, 0, '4/5', { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(22 * window.devicePixelRatio)}px`,}).setOrigin(0.5, 0.5);
        this.grid.placeAtIndex(24, this.txt1);

        this.txt1 = this.add.text(0, 0, 'Welk toetje kan', { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(28 * window.devicePixelRatio)}px`,}).setOrigin(0.5, 0.55);
        this.grid.placeAtIndex(37, this.txt1);

        this.txt1 = this.add.text(0, 0, 'ik het beste eten?', { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(28 * window.devicePixelRatio)}px`,}).setOrigin(0.5, -0.15);
        this.grid.placeAtIndex(37, this.txt1);

       this.smallPlank = this.addImage(0, 0, 'Question1:smallPlank').setOrigin(0.5, 0.7);
       this.grid.placeAtIndex(187, this.smallPlank);

       this.answer = this.addImage(0, 0, 'Question1:answer').setOrigin(0.5, 0.8);
       this.grid.placeAtIndex(112, this.answer);

       this.txt1 = this.add.text(0, 0, 'Vanille ijs met fruit', { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(28 * window.devicePixelRatio)}px`,}).setOrigin(0.5, 1.25);
        this.grid.placeAtIndex(112, this.txt1);

       this.answer = this.addImage(0, 0, 'Question1:answer');
       this.grid.placeAtIndex(82, this.answer);

       this.txt1 = this.add.text(0, 0, 'Dubbel vla met yoghurt', { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(28 * window.devicePixelRatio)}px`,}).setOrigin(0.5, 0.5);
        this.grid.placeAtIndex(82, this.txt1);

       this.answer = this.addImage(0, 0, 'Question1:answer').setOrigin(0.5, 0.5);
       this.grid.placeAtIndex(127, this.answer);

       this.txt1 = this.add.text(0, 0, 'Yoghurt met fruit', { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(28 * window.devicePixelRatio)}px`,}).setOrigin(0.5, 0.5);
        this.grid.placeAtIndex(127, this.txt1);

       this.answer = this.addImage(0, 0, 'Question1:answer').setOrigin(0.5, 0.8);
       this.grid.placeAtIndex(157, this.answer);

       this.txt1 = this.add.text(0, 0, 'Chocolade muffin', { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(28 * window.devicePixelRatio)}px`,}).setOrigin(0.5, 1.25);
        this.grid.placeAtIndex(157, this.txt1);

        this.back = this.addImage(0, 0, 'Question1:back').setOrigin(0.6, 0.8).setInteractive();
        this.back.on('pointerdown', () => {
            this.scene.stop('Question4');
            this.scene.launch('StartQuiz');
        });
        this.grid.placeAtIndex(184, this.back);
 
        this.back = this.addImage(0, 0, 'Question1:back').setOrigin(0.5, 0.8).setInteractive();
        this.back.on('pointerdown', () => {
            this.scene.stop('Question4');
            this.scene.launch('InfoQuestion');
        });
        this.back.flipX = true;
        this.grid.placeAtIndex(190, this.back);

       this.quit = this.addImage(0, 0, 'Daily:quit').setOrigin(.5, .675).setInteractive();
       this.quit.on('pointerdown', () => {
           this.scene.sleep('Question4');
           this.scene.launch('StopQuiz');
       });
       this.grid.placeAtIndex(217, this.quit);

        //this.grid.showNumbers();
    }
    
}

    export default Question4;