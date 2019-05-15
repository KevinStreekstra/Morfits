import Phaser from 'phaser';

class JewelTile extends Phaser.GameObjects.Sprite {
    constructor(state, x, y, data){
        super(state, x, y);
        this.data = data;
        this.state = state;

        this.init();
    }

    init(){
        this.state.add.image(this.x, this.y, this.defineSprite(this.data.value));
    }

    defineSprite(value){
        switch (value) {
            case 1: return 'Apple';
            case 2: return 'Cherry';
            case 3: return 'Lemon';
            case 4: return 'Cauliflower';
            case 5: return 'Pineapple';
            case 6: return 'Aubergine';
        
            default: return 'apple';
        }
    }
};

export default JewelTile;