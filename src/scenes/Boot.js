import Player from '../classes/Player';
import AlignGrid from '../classes/AlignGrid';

class BootScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'BootScene'
        });
        this.boot_morfitWalking;
        this.boot_morfitLogo;
        this.boot_ground;
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
       
        this.load.image('boot_bird1', 'src/assets/boot/bird-1.png');
        this.load.image('boot_bird2', 'src/assets/boot/bird-2.png');
        this.load.image('boot_ground', 'src/assets/boot/ground.png');
        this.load.image('boot_loadingText', 'src/assets/boot/loading-text.png');
        this.load.image('boot_morfitWalking', 'src/assets/boot/Morfit walking.png');
        this.load.image('boot_morfitLogo', 'src/assets/boot/morfit-logo.png');
        this.load.image('boot_plant1', 'src/assets/boot/Plant_2.png');
        this.load.image('boot_plant2', 'src/assets/boot/Plant_6.png');
        this.load.image('HomePlant', 'src/assets/bg/home/Plant_7.png');
        this.load.image('Homeboot_plant2', 'src/assets/bg/home/Plant_9.png');
      
  

        this.load.on('progress', (value) => {
            progress.clear();
     
        });

        this.load.on('complete', () => {
            progress.destroy();
            this.scene.start('OverviewScene');

            
           

        })

        

        
        this.overview_assets();

        new Player().init();
    }

    create() {
        // De achtergrond van het scherm
        this.bg = this.add.image(0, 0, 'bg');
        this.grid.placeAtIndex(60, this.bg); 
        this.mntn1 = this.add.image(0, 0, 'bg_mntn1').setOrigin(0, 0);
        this.grid.scaleX(this.mntn1, 2.5);
        this.mntn2 = this.add.image(0, 0, 'bg_mntn2').setOrigin(0.13, 0);
        this.bg_trees1 = this.add.image(0, 0, 'bg_trees1').setOrigin(0.13, 0);
        
       
        
    
        // Het morfit logo aan de bovenkant
        this.boot_morfitLogo = this.add.image(0, 0, 'boot_morfitLogo').setOrigin(0, 0);
        this.grid.placeAtIndex(2, this.boot_morfitLogo); 
        this.grid.scaleTo(this.boot_morfitLogo, 0.5, 500);
        // Beide vogels die in de lucht zweven
        this.boot_bird1 = this.add.image(0, 0, 'boot_bird1');
        this.grid.placeAtIndex(24, this.boot_bird1);
        this.grid.scaleTo(this.boot_bird1, 0.3, 500);
        this.boot_bird2 = this.add.image(0, 0, 'boot_bird2');
        this.grid.placeAtIndex(41, this.boot_bird2);
        this.grid.scaleTo(this.boot_bird2, 0.3, 500);
        // Boom aan de linkerkant van het scherm
        this.boot_plant2 = this.add.image(0, 0, 'boot_plant2');
        this.grid.placeAtIndex(86, this.boot_plant2);
        this.grid.scaleTo(this.boot_plant2, 0.2, 500);
        // De grond
        this.boot_ground = this.add.image(0, this.sys.game.config.height, 'boot_ground').setOrigin(0, 1);
        this.grid.scaleY(this.boot_ground, .22);
        // Plant aan de rechterkant van het scherm
        this.boot_plant1 = this.add.image(0, 0, 'boot_plant1');
        this.grid.placeAtIndex(67, this.boot_plant1);
        this.grid.scaleTo(this.boot_plant1, 0.35, 500);
        // De morfit in het midden van het scherm
        this.boot_morfitWalking = this.add.image(0, 0, 'boot_morfitWalking').setScale(0.35);
        this.grid.placeAtIndex(71, this.boot_morfitWalking);
        // De laad tekst onderaan het scherm
        this.boot_loadingText = this.add.image(0, 0, 'boot_loadingText');
        this.grid.placeAtIndex(115, this.boot_loadingText);
        this.grid.scaleTo(this.boot_loadingText, .9, 500);
        // this.grid.showNumbers();

    
        
    }
    

    overview_assets() {
        this.load.image('bg', 'src/assets/boot/bg/background.png');
        this.load.image('bg_mntn1', 'src/assets/boot/bg/mountain-depth-5.png');
        this.load.image('bg_mntn2', 'src/assets/boot/bg/mountain-depth-4.png');
        this.load.image('bg_mntn3', 'src/assets/bg/mountain-depth-3.png');
        this.load.image('bg_mntn2', 'src/assets/bg/Mountain-depth-2.png');
        this.load.image('bg_trees1', 'src/assets/boot/bg/trees-depth-4.png');
        this.load.image('sun', 'src/assets/bg/Sun.png');
        this.load.image('bg_sky', 'src/assets/bg/Sky cloud.png');
    //     this.load.image('bg_mntn1', 'src/assets/bg/home/morfit walking.png');
    //     this.load.image('bg_mntn0', 'src/assets/bg/home/boot_ground.png');
     }

}

export default BootScene;