import Player from '../classes/Player';
import FormUtil from '../classes/FormUtil';

class CreatePlayerScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'CreatePlayerScene'
        });
    }
    
    preload() {}

    create() {
        this.formUtil = new FormUtil({
            scene: this,
            rows: 11,
            cols: 11,
            width: this.sys.game.config.width,
            height: this.sys.game.config.height,
        });

        this.formUtil.show('formUtil');

        this.formUtil.scaleToGameW('player:username', 0.5);
        this.formUtil.placeElementAt(37, 'player:username', true);

        this.formUtil.scaleToGameW('player:submit', 0.5);
        this.formUtil.placeElementAt(48, 'player:submit', true);
        this.formUtil.addClickCallback('player:submit', ()=>{
            let txt = this.formUtil.getTextValue('player:username');
            if(txt.length > 0) {
                new Player().init(txt);
                this.formUtil.hide('formUtil');
                this.scene.start('OverviewScene');
            }
        }, this);

        //this.formUtil.showNumbers();
    }
}

export default CreatePlayerScene;