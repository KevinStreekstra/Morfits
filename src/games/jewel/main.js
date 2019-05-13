import AlignGrid from '../../classes/AlignGrid';

class JewelGame extends Phaser.Scene {
    constructor() {
          super({
              key: 'JewelGame',
              active: true,
          });
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

        const apple = this.add.image(20, 20, 'apple');
        this.grid.placeAtIndex(100, apple);

      }
}

export default JewelGame;