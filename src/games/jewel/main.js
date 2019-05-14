import Phaser from 'phaser';

import AlignGrid from '../../classes/AlignGrid';
import Board from './classes/Board';
import JewelTile from './classes/Tile';

class JewelGame extends Phaser.Scene {
    constructor() {
        super({
            key: 'JewelGame',
            active: false,
        }),
        this.board_rows = 8;
        this.board_cols = 8;
        this.variations = 7;
        this.tile_size = 35;
        this.board = [];
        this.tiles;
        this.apple;
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

        // this.load.image('baddie', 'src/assets/illustraties/');

        this.tiles = this.add.group();

        this.board = new Board(this, this.board_rows, this.board_cols, this.variations).init();
        console.log(this.board)
        this.apple = this.add.image(20, 20, 'apple');
        // this.grid.placeAtIndex(100, apple);

        this.drawBoard();
        // const rect = this.add.rectangle(200, 20, 148, 148, 0x6666ff);

    }

    createTile(x, y, data) {
      var tile = this.tiles;

      if(tile) {
        this.tiles.create(new JewelTile(this, x, y, data));
      } else {
        tile.reset(x, y, data);
      }
  
      return tile;
    }
    
    drawBoard() {
      for(let i = 0; i < this.board_rows; i++) {
        for(let j = 0; j < this.board_cols; j++) {
          let x = 36 + j * (this.tile_size + 6);
          let y = 150 + i * (this.tile_size + 6);

          this.createTile(x, y, {asset: this.board.main[i][j], row: i, col: j});
        }
      }
  
      // this.game.world.bringToTop(this.tiles);
    }
}

export default JewelGame;