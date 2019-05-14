class JewelTile {
    constructor(state, x, y, data){
        this.game = state.game;
        this.state = state,
        this.x = x,
        this.y = y,
        this.data = data;
        this.init();
    }

    init(){
        console.log('jewel tile', this, state.game, x, y, data.asset)
        // Phaser.Sprite.call(this, state.game, x, y, data.asset);

    }

};

export default JewelTile;