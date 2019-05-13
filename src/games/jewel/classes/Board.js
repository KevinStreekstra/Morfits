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
                grid[i].push(0);
            }
        }
      
    }
  
};

export default Board;