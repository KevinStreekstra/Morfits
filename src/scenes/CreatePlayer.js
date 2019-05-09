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

        this.formUtil.scaleToGameW('player:username', 0.5);
        this.formUtil.placeElementAt(60, 'player:username', true);
        this.formUtil.addChangeCallback('player:username', ()=>{
            console.log(this.formUtil.getTextValue('player:username'));
        }, this);

        this.formUtil.scaleToGameW('player:submit', 0.5);
        this.formUtil.placeElementAt(71, 'player:submit', true);
        this.formUtil.addClickCallback('player:submit', ()=>{
            let txt = this.formUtil.getTextValue('player:username');
            if(txt.length > 0) {
                new Player().init(txt);
                this.scene.start('OverviewScene');
            }
        }, this);

        this.formUtil.showNumbers();
    }
}

export default CreatePlayerScene;