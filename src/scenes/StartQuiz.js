import AlignGrid from '../classes/AlignGrid';

import { addImage } from '../helpers';

class StartQuiz extends Phaser.Scene {
    constructor() {
        super({
            key: 'StartQuiz'
        });

        this.bg;
        this.popup;
        this.quit;
        this.popupplank;
        this.vines;
        this.vines2;
        this.quiz;
        this.btn;
        this.plank1;
        this.plank2;
        this.plank3;
        this.plank4;

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

        this.vines2 = this.addImage(0, 0, 'Stats:Vines');
        this.grid.placeAtIndex(2, this.vines2);

        this.vines = this.addImage(0, 0, 'Stats:Vines');
        this.grid.placeAtIndex(12, this.vines);

        this.popup = this.addImage(0, 0, 'Quiz:bg');
        this.grid.placeAtIndex(112, this.popup);

        this.Mask = this.addImage(0, 0, 'Daily:BgMask');
        this.grid.placeAtIndex(112, this.Mask);

        this.quiz = this.addImage(0, 0, 'Quiz:Start');
        this.grid.placeAtIndex(37, this.quiz);

        this.btn = this.addImage(0, 0, 'Quiz:Btn').setInteractive();
        this.btn.on('pointerdown', () => {
            this.scene.stop('StartQuiz');
            this.scene.launch('Question1');
        });
        this.grid.placeAtIndex(187, this.btn);

        this.plank1 = this.addImage(0, 0, 'Quiz:Plank_1');
        this.grid.placeAtIndex(67, this.plank1);

        this.txt1 = this.add.text(0, 0, 'Doe mee met de quiz van de week en win 5 M-Dollars voor vandaag!', { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(16 * window.devicePixelRatio)}px`, wordWrap: {width: (175 * window.devicePixelRatio), useAdvancedWrap: true}}).setOrigin(0.5, 0.5).setAngle(4, 1);
        this.grid.placeAtIndex(67, this.txt1);
  

        this.plank2= this.addImage(0, 0, 'Quiz:Plank_2');
        this.grid.placeAtIndex(97, this.plank2);

        this.txt2 = this.add.text(0, 0, 'Er zijn 5 vragen, voor elke vraag krijg je een punt!', { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(16 * window.devicePixelRatio)}px`, wordWrap: {width: (175 * window.devicePixelRatio), useAdvancedWrap: true}}).setOrigin(0.5, 0.5);
        this.grid.placeAtIndex(97, this.txt2);
  

        this.plank3 = this.addImage(0, 0, 'Quiz:Plank_3');
        this.grid.placeAtIndex(127, this.plank3);

        this.txt3 = this.add.text(0, 0, 'De laatste is een bonus vraag waarop je extra M-Dollars voor krijgt!', { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(16 * window.devicePixelRatio)}px`, wordWrap: {width: (175 * window.devicePixelRatio), useAdvancedWrap: true}}).setOrigin(0.5, 0.5).setAngle(357, 1);
        this.grid.placeAtIndex(127, this.txt3);

        this.plank4 = this.addImage(0, 0, 'Quiz:Plank_4').setOrigin(0.5, 0.45);
        this.grid.placeAtIndex(157, this.plank4);

        this.txt1 = this.add.text(0, 0, 'Ben je er klaar voor?', { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(16 * window.devicePixelRatio)}px`,}).setOrigin(0.5, 0.5).setAngle(3, 1);
        this.grid.placeAtIndex(157, this.txt1);
      
        this.quit = this.addImage(0, 0, 'Daily:quit').setOrigin(.5, .675).setInteractive();
        this.quit.on('pointerdown', () => {
            this.scene.sleep('StartQuiz');
            this.scene.launch('StopQuiz');
        });
        this.grid.placeAtIndex(217, this.quit);


        //this.grid.showNumbers();
    }
    
}

    export default StartQuiz;