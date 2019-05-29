import AlignGrid from '../../classes/AlignGrid';

import { addImage } from '../../helpers';


class QuizReward extends Phaser.Scene {
    constructor() {
        super({
            key: 'QuizReward'
        });

        this.bg;
        this.confetti1;

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

        this.confetti1 = this.addImage(0, 0, 'QuizReward:Confetti1');
        this.grid.placeAtIndex(52, this.confetti1);    

        //this.grid.showNumbers();
    }
    
}

    export default QuizReward;