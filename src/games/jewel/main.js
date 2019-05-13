import AlignGrid from '../../classes/AlignGrid';
import Board from './classes/Board';

class JewelGame extends Phaser.Scene {
    constructor() {
        super({
            key: 'JewelGame',
            active: true,
        }),
        this.board_rows = 8;
        this.board_cols = 8;
        this.variations = 7;
    }
  
    preload() {
        console.log('Jewel game preloaded');
    }

    create(){
        this.grid = new AlignGrid({
            scene: this, 
            rows: 15, 
            cols: 15, 
            width: this.sys.game.config.width, 
            height: this.sys.game.config.height
        });

        this.board = new Board(this, this.board_rows, this.board_cols, this.variations).init();
        console.log(this.board)
        const apple = this.add.image(20, 20, 'apple');
        this.grid.placeAtIndex(100, apple);

      }
}

export default JewelGame;