// Create board for jewel game tiles
class Board {
    constructor(
        state,
        rows,
        cols,
        blockVariations,
    ){
        this.state = state;
        this.rows = rows;
        this.cols = cols;
        this.blockVariations = blockVariations;
        // main grid
        this.jewel_grid = [];
        //back up grid on the top, for when new blocks are needed
        this.jewel_backup_grid = [];
        this.backupRow = 5;
        this.init();
    }
  
    init(){
        this.createGrid(this.rows, this.cols, this.jewel_grid);
        this.createGrid(this.backupRow, this.cols, this.jewel_backup_grid);

        return {
            main: this.jewel_grid,
            backup: this.jewel_backup_grid,
        };
    }

    createGrid(row, cols, grid){
        for(let i = 0; i < row; i++) {
            grid.push([]);
      
            for(let j = 0; j < cols; j++) {
                const randomizedNumber = Math.floor(Math.random() * this.blockVariations) + 1;
                grid[i].push(randomizedNumber);
            }
        }
    }

    swap(source, target){
        const temp = this.jewel_grid[target.data.row][target.data.col];
        this.jewel_grid[target.data.row][target.data.col] = this.jewel_grid[source.data.row][source.data.col];
        this.jewel_grid[source.data.row][source.data.col] = temp;
    }

    /*
        check if two blocks are adjacent
    */
    checkAdjacent(source, target) {
        const diffRow = Math.abs(source.data.row - target.data.row);
        const diffCol = Math.abs(source.data.col - target.data.col);
        
        // Return adjacent blocks
        return (diffRow == 1 && diffCol === 0) || (diffRow == 0 && diffCol === 1);
    }
  
    isChained(block) {
        let isChained = false;
        const variation = this.jewel_grid[block.row][block.col],
        row = block.row,
        col = block.col;
      
        // left
        if(variation == this.jewel_grid[row][col - 1] && variation == this.jewel_grid[row][col - 2]) {
          isChained = true;
        }
      
        // right
        if(variation == this.jewel_grid[row][col + 1] && variation == this.jewel_grid[row][col + 2]) {
          isChained = true;
        }
      
        // up
        if(this.jewel_grid[row-2]) {
          if(variation == this.jewel_grid[row-1][col] && variation == this.jewel_grid[row-2][col]) {
            isChained = true;
          }
        }
      
        // down
        if(this.jewel_grid[row+2]) {
          if(variation == this.jewel_grid[row+1][col] && variation == this.jewel_grid[row+2][col]) {
            isChained = true;
          }
        }
      
        // horizontal
        if(variation == this.jewel_grid[row][col - 1] && variation == this.jewel_grid[row][col + 1]) {
          isChained = true;
        }
      
        // vertical
        if(this.jewel_grid[row+1] && this.jewel_grid[row-1]) {
          if(variation == this.jewel_grid[row+1][col] && variation == this.jewel_grid[row-1][col]) {
            isChained = true;
          }
        }
      
        return isChained;
      
    }

    findAllChains() {
        const chained = [];
      
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                if(this.isChained({row: i, col: j})) {
                    console.log('ichained')
                    chained.push({row: i, col: j});
                }
            }
        }
      
        console.log(chained);
        return chained;
    }

    /*
    clear all the chains*/
    clearChains(){
        //gets all blocks that need to be cleared
        var chainedBlocks = this.findAllChains();
        //set them to zero
        chainedBlocks.forEach((block) => {
            console.log('clear chains', this.jewel_grid[block.row][block.col]);
            this.jewel_grid[block.row][block.col] = 0;
            const foundBlocks = this.state.getBlockFromColRow(block);
            foundBlocks.destroy();
        });

        return chainedBlocks;
    }

    /*
    drop a block in the main grid from a position to another. the source is set to zero
    */
    dropBlock(sourceRow, targetRow, col){
        this.jewel_grid[targetRow][col] = this.jewel_grid[sourceRow][col];
        this.jewel_grid[sourceRow][col] = 0;
        console.log(this.jewel_grid);
    }

    /*
    drop a block in the reserve grid from a position to another. the source is set to zero
    */
    dropReserveBlock(sourceRow, targetRow, col){
        this.jewel_grid[targetRow][col] = this.jewel_backup_grid[sourceRow][col];
        this.jewel_backup_grid[sourceRow][col] = 0;
    }

    populateReserveGrid(){
        var i,j,variation;
        for(i = 0; i < this.backupRow; i++) {
          for(j = 0; j < this.cols; j++) {
            variation = Math.floor(Math.random() * this.blockVariations) + 1;
            this.jewel_backup_grid[i][j] = variation;
          }
        }
      };
    /*
    move down blocks to fill in empty slots
    */
    updateGrid() {
        let i, j, k, foundBlock;

        //go through all the rows, from the bottom up
        for(i = this.rows - 1; i >= 0; i--){
            for(j = 0; j < this.cols; j++) {
                //if the block if zero, then get climb up to get a non-zero one
                if(this.jewel_grid[i][j] === 0) {
                    foundBlock = false;

                    //climb up in the main grid
                    for(k = i - 1; k >= 0; k--) {
                        if(this.jewel_grid[k][j] > 0) {
                            this.dropBlock(k, i, j);
                            foundBlock = true;
                            break;
                        }
                    }
                    if(!foundBlock) {
                        //climb up in the reserve grid
                        for(k = this.backupRow - 1; k >= 0; k--) {
                            if(this.jewel_backup_grid[k][j] > 0) {
                                this.dropReserveBlock(k, i, j);
                                break;
                            }
                        }
                    }
                }
            }
        }

        //repopulate the reserve
        this.populateReserveGrid(this.backupRow, this.cols, this.jewel_backup_grid);
    }
};

export default Board;