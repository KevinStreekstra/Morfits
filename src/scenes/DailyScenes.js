import Player from '../classes/Player';
import AlignGrid from '../classes/AlignGrid';

class DailyScenes extends Phaser.Scene {
    constructor() {
        super({
            key: 'DailyScene', active: true
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

        this.popup = this.add.image(0, 0, 'Daily:popup');
        this.grid.placeAtIndex(100, this.popup);

        this.overlay = this.add.image(0, 0, 'Daily:bg');
        this.grid.placeAtIndex(77, this.overlay);

        
        //  this.grid.showNumbers();
    }
}

export default DailyScenes;