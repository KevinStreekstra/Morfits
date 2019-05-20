import Phaser from 'phaser';

import AlignGrid from '../../classes/AlignGrid';
import Board from './classes/Board';
import JewelTile from './classes/Tile';

import { addImage } from '../../helpers';

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
        this.board = null;
        this.tiles;
        this.apple;
        this.isBoardBlocked = false;
        this.addImage = addImage.bind(this);
        this.swapBlocks = this.swapBlocks.bind(this);
        this.swapAnimations = this.swapAnimations.bind(this);
        this.clearSelection = this.clearSelection.bind(this);
    }

    create(){
        this.grid = new AlignGrid({
            scene: this, 
            rows: 15, 
            cols: 15, 
            width: this.sys.game.config.width, 
            height: this.sys.game.config.height
        });


        this.tiles = this.add.group();

        this.board = new Board(this, this.board_rows, this.board_cols, this.variations);
        // this.grid.placeAtIndex(100, apple);
        this.drawBoard();

        const tile_1 = this.tiles.children.entries[10];
        const tile_2 = this.tiles.children.entries[11];
    
    }

    createTile(x, y, data) {
      var tile = this.tiles;

      if(tile) {
        this.tiles.add(new JewelTile(this, x, y, data));
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

          this.createTile(x, y, {value: this.board.jewel_grid[i][j], row: i, col: j});
        }
      }
  
      // this.game.world.bringToTop(this.tiles);
    }

    getBlockFromColRow(position) {
      var foundBlock;
  
      console.log(this.tiles)
      this.tiles.children.entries.forEach(function(tile){
        if(tile.data.row === position.row && tile.data.col === position.col) {
          foundBlock = tile;
        }
      }, this);

      return foundBlock;
    }

    dropBlock(sourceRow, targetRow, col) {
      var block = this.getBlockFromColRow({row: sourceRow, col: col});
      var targetY = 150 + targetRow * (this.tile_size + 6);
  
      console.log(block)
      block.row = targetRow;
  
      var blockMovement = this.game.add.tween(block);
      blockMovement.to({y: targetY}, 200);
      blockMovement.start();
    };
  
    dropReserveBlock(sourceRow, targetRow, col) {
      var x = 36 + col * (this.tile_size + 6);
      var y = -(this.tile_size + 6) * this.board.backup + sourceRow * (this.tile_size + 6);
  
      var block = this.createBlock(x, y, {asset: 'block' + this.board.grid[targetRow][col], row: targetRow, col: col});
      var targetY = 150 + targetRow * (this.tile_size + 6);
  
      var blockMovement = this.game.add.tween(block);
      blockMovement.to({y: targetY}, this.ANIMATION_TIME);
      blockMovement.start();
    }

    swapBlocks(block1, block2) {
      console.log('animation start', block1, block2);
      var self = this;
      const tweenData = {
        block1: {
          targets: block1,
          x: block2.x,
          y: block2.y,
          duration: 3000,
          onComplete: this.swapAnimations,
          onCompleteParams: [block1, block2, self.board, this.swapBlocks]
        },
        block2: {
          targets: block2,
          x: block1.x,
          y: block1.y,
          duration: 300,
        },
      }
      
      const block_1 = this.tweens.add(tweenData.block1);
  
      const block_2 = this.tweens.add(tweenData.block2);
      block_1.play()
      block_2.play()
    }

    swapAnimations(tween, targets, block1, block2, board, swapBlocks){
      //after the animation we update the model
      board.swap(block1, block2);
      console.log('board', board)
      if(!this.isReversingSwap) {
        const chains = board.findAllChains();

        if(chains.length > 0) {
          console.log('chains exist', this);
          board.clearChains();
          board.updateGrid();
          console.log(board);
        }
        else {
          this.isReversingSwap = true;
          swapBlocks(block1, block2);
        }
      }
      else {
        this.isReversingSwap = false;
      }

    }
    pickBlock(tile) {
      console.log('tile start', tile)
      //only swap if the UI is not blocked
      if(this.isBoardBlocked) {
        console.log('test 1')
        return;
      }
  
      //if there is nothing selected
      if(!this.selectedBlock) {
        console.log('test 2')
        //highlight the first block
        tile.setScale(15);
  
        this.selectedBlock = tile;
      }
      else {
        //second block you are selecting is target block
        this.targetBlock = tile;
  
        //only adjacent blocks can swap
        if(this.board.checkAdjacent(this.selectedBlock, this.targetBlock)) {
          //block the UI
          this.isBoardBlocked = true;
          //swap blocks
          this.swapBlocks(this.selectedBlock, this.targetBlock);
        }
        else {
          console.log('test 5')
          this.clearSelection(tile);
        }
      }
      console.log(this.isBoardBlocked);

    }
    clearSelection(tile) {
      tile.setScale({ x: 1, y: 1});
      this.isBoardBlocked = false;
      this.selectedBlock = null;

    }
}

export default JewelGame;