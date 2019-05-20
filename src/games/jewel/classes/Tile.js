import Phaser from 'phaser';

class JewelTile extends Phaser.GameObjects.Sprite {
    constructor(state, x, y, data){
        super(state, x, y);
        this.data = data;
        this.state = state;

        this.init();
    }

    init(){
        this.state.add.image(this.x, this.y, this.defineSprite(this.data.value))
            .setScale(window.devicePixelRatio/20, window.devicePixelRatio/20)
            .setInteractive()
            .on('pointerdown', () => {
                this.state.pickBlock(this);
            });
    }

    killTile(){
        this.data.col = null;
        this.data.row = null;
        this.destroy();
    }

    defineSprite(value){
        switch (value) {
            case 1: return 'apple';
            case 2: return 'cherry';
            case 3: return 'lemon';
            case 4: return 'cauliflower';
            case 5: return 'pineapple';
            case 6: return 'aubergine';
        
            default: return 'apple';
        }
    }
};

export default JewelTile;