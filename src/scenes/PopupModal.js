class PopupModalScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'PopupModalScene'
        });
    }
    preload(){}
    create(data){
        console.log(data.title)
    }
    update(){}

}

export default PopupModalScene;