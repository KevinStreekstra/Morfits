import Player from '../classes/Player';
import AlignGrid from '../classes/AlignGrid';

class BootScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'BootScene'
        });
        this.morfitLogo;
    }

    preload() {

        this.grid = new AlignGrid({
            scene: this, 
            rows: 11, 
            cols: 11, 
            width: this.sys.game.config.width,         
            height: this.sys.game.config.height
        });
      

        const progress = this.add.graphics();
        const progressValue = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, '0%', { fontSize: '32px', fill: '#000' });
        this.load.image('bird1', 'src/assets/boot/bird-1.png');
        this.load.image('bird2', 'src/assets/boot/bird-2.png');
        this.load.image('ground', 'src/assets/boot/ground.png');
        this.load.image('loadingText', 'src/assets/boot/loading-text.png');
        this.load.image('morfitWalking', 'src/assets/boot/Morfit walking.png');
        this.load.image('morfitLogo', 'src/assets/boot/morfit-logo.png');
        
  

        this.load.on('progress', (value) => {
            progress.clear();
     
        });

        this.load.on('complete', () => {
            progress.destroy();
            //this.scene.start('OverviewScene');

            
           

        });

        

        
        this.overview_assets();

        new Player().init();
    }

    create() {
        this.morfitLogo = this.add.image(0, 0, 'morfitLogo').setOrigin(0, 0);
        this.morfitLogo.setScale(0.5);

       
   
        
        //this.add.image(0, 0, 'bird1').setOrigin(0,0);
        //this.add.image(0, 0, 'bird2').setOrigin(0,0);
        this.ground = this.add.image(0, 0, 'ground').setScale(0.3).setOrigin(0.5, 0.35);
        this.ground.setScale(0.5);
        this.grid.placeAtIndex(104, this.ground);
        this.morfitWalking = this.add.image(0, 0, 'morfitWalking').setScale(0.35);
        this.grid.placeAtIndex(71, this.morfitWalking);
        this.loadingText = this.add.image(0, 0, 'loadingText');
        this.loadingText.displayWidth = 375 * 0.9;
        this.loadingText.scaleY = this.loadingText.scaleX;
        this.grid.placeAtIndex(115, this.loadingText);
        // this.grid.showNumbers();
    }
    

    overview_assets() {
        this.load.image('bg', 'src/assets/bg/background.png');
        this.load.image('bg_cloud', 'src/assets/bg/Background-cloud.png');
        this.load.image('bg_mntn4', 'src/assets/bg/Background-mountain-depth-4.png');
        this.load.image('bg_mntn3', 'src/assets/bg/mountain-depth-3.png');
        this.load.image('bg_mntn2', 'src/assets/bg/Mountain-depth-2.png');
        this.load.image('bg_mntn1', 'src/assets/bg/mountain-depth-1.png');
        this.load.image('bg_mntn0', 'src/assets/bg/Mountain-depth-0.png');
        this.load.image('sun', 'src/assets/bg/Sun.png');
        this.load.image('bg_sky', 'src/assets/bg/Sky cloud.png');
    }
}

export default BootScene;