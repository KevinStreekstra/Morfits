import Player from '../classes/Player';
import AlignGrid from '../classes/AlignGrid';

import { addImage, addElement, addRectangle } from '../helpers';

class CreatePlayerScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'CreatePlayerScene'
        });

        this.addElement = addElement.bind(this);
    }
    
    preload() {}

    create() {
        this.grid = new AlignGrid({
            scene: this,
            rows: 11,
            cols: 11,
            width: this.sys.game.config.width,
            height: this.sys.game.config.height,
        });

        this.input_username = this.addElement(0, 0, "input");
        this.grid.placeAtIndex(38, this.input_username);

        this.submit = this.addElement(0, 0, "button").setText('Klaar');
        this.submit.addListener('click');
        this.submit.on('click', function(e) {
            let txt = this.input_username.node.value;
            if(txt.length > 0) {
                new Player().init(txt)
                this.scene.start('OverviewScene');
                this.scene.stop('CreatePlayerScene');
            }
        }, this)
        this.grid.placeAtIndex(49, this.submit);

        //this.grid.showNumbers();
    }
}

export default CreatePlayerScene;