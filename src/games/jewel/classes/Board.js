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
    }
  
    init(){
        console.log('Init Board Class');
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
        const temp = this.grid[target.row][target.col];
        this.grid[target.row][target.col] = this.grid[source.row][source.col];
        this.grid[source.row][source.col] = temp;
    }

    /*
        check if two blocks are adjacent
    */
    checkAdjacent(source, target) {
        const diffRow = Math.abs(source.row - target.row);
        const diffCol = Math.abs(source.col - target.col);
        
        // Return adjacent blocks
        return (diffRow == 1 && diffCol === 0) || (diffRow == 0 && diffCol === 1);;
    };
  
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
      
    };

    findAllChains() {
        const chained = [];
      
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                if(this.isChained({row: i, col: j})) {
                    chained.push({row: i, col: j});
                }
            }
        }
      
        console.log(chained);
        return chained;
    };
};

export default Board;