import Player from '../classes/Player';
import AlignGrid from '../classes/AlignGrid';

class DailyScenes extends Phaser.Scene {
    constructor() {
        super({
            key: 'DailyScene'
        });

        this.overlay;
        this.popup;
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

        this.overlay = this.add.image(0, 0, 'Daily:bg').setOrigin(0, 0);
        this.grid.scaleY(this.overlay, 1);

        this.popup = this.add.image(0, 0, 'Daily:popup');
        this.grid.placeAtIndex(112, this.popup);

        //this.grid.showNumbers();
    }
}

export default DailyScenes;