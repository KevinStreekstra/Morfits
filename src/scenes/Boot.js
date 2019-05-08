import Player from '../classes/Player';
import AlignGrid from '../classes/AlignGrid';

class BootScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'BootScene'
        });
        this.morfitWalking;
        this.morfitLogo;
        this.ground;
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
        this.load.image('loadingText', 'src/assets/boot/loading-text.png');

        this.load.image('overview:morfitWalking', 'src/assets/caracter_page/morfit_character@2x.png');
        this.load.image('morfitLogo', 'src/assets/boot/morfit-logo.png');

        this.load.image('overview:HomePlant', 'src/assets/caracter_page/plant-vase@2x.png');
        this.load.image('overview:HomePlant2', 'src/assets/caracter_page/plant-pot@2x.png');

        this.load.image('overview:MentalBar', 'src/assets/caracter_page/mental_bar@2x.png');
        this.load.image('overview:EnergyBar', 'src/assets/caracter_page/energie_bar@2x.png');
        this.load.image('overview:PowerBar', 'src/assets/caracter_page/kracht_bar@2x.png');
        this.load.image('overview:TopNavbar', 'src/assets/caracter_page/nav@2x.png');

        this.load.image('overview:BottomNavbar', 'src/assets/caracter_page/nav-bottom_background@2x.png');
        this.load.image('overview:ground2', 'src/assets/caracter_page/ground-bottom@2x.png');
        this.load.image('overview:ground3', 'src/assets/caracter_page/ground-top@2x.png');
        
        this.load.image('plant1', 'src/assets/boot/Plant_2.png');
        this.load.image('plant2', 'src/assets/boot/Plant_6.png');
        this.load.image('HomePlant', 'src/assets/bg/home/Plant_7.png');
        this.load.image('HomePlant2', 'src/assets/bg/home/Plant_9.png');
        this.load.image('SkyPlant', 'src/assets/bg/home/skyPlant.png');
  

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
        this.morfitLogo = this.add.image(0, 0, 'morfitLogo').setOrigin(0, 0);
        this.grid.placeAtIndex(2, this.morfitLogo); 
        this.grid.scaleTo(this.morfitLogo, 0.5, 500);
        // Beide vogels die in de lucht zweven
        this.bird1 = this.add.image(0, 0, 'bird1');
        this.grid.placeAtIndex(24, this.bird1);
        this.grid.scaleTo(this.bird1, 0.3, 500);
        this.bird2 = this.add.image(0, 0, 'bird2');
        this.grid.placeAtIndex(41, this.bird2);
        this.grid.scaleTo(this.bird2, 0.3, 500);
        // Boom aan de linkerkant van het scherm
        this.plant2 = this.add.image(0, 0, 'plant2');
        this.grid.placeAtIndex(86, this.plant2);
        this.grid.scaleTo(this.plant2, 0.2, 500);
        // De grond
        this.ground = this.add.image(0, this.sys.game.config.height, 'ground').setOrigin(0, 1);
        this.grid.scaleY(this.ground, .22);
        // Plant aan de rechterkant van het scherm
        this.plant1 = this.add.image(0, 0, 'plant1');
        this.grid.placeAtIndex(67, this.plant1);
        this.grid.scaleTo(this.plant1, 0.35, 500);
        // De morfit in het midden van het scherm
        this.morfitWalking = this.add.image(0, 0, 'morfitWalking').setScale(0.35);
        this.grid.placeAtIndex(71, this.morfitWalking);
        // De laad tekst onderaan het scherm
        this.loadingText = this.add.image(0, 0, 'loadingText');
        this.grid.placeAtIndex(115, this.loadingText);
        this.grid.scaleTo(this.loadingText, .9, 500);
        // this.grid.showNumbers();

    
        
    }
    

    overview_assets() {
        // this.load.image('bg_cloud', 'src/assets/boot/bg/terrain-front.png');
        this.load.image('overview:bg', 'src/assets/caracter_page/background@2x.png');
        // this.load.image('bg_mntn4', 'src/assets/boot/bg/Background-mountain-depth-4.png');
        // this.load.image('bg_mntn3', 'src/assets/boot/bg/mountain-depth-3.png');
        // this.load.image('bg_mntn2', 'src/assets/boot/bg/Mountain-depth-2.png');

        // this.load.image('sun', 'src/assets/bg/Sun.png');
        // this.load.image('bg_sky', 'src/assets/bg/Sky cloud.png');
        this.load.image('bg', 'src/assets/boot/bg/background.png');
        this.load.image('bg_mntn1', 'src/assets/boot/bg/mountain-depth-5.png');
        this.load.image('bg_mntn2', 'src/assets/boot/bg/mountain-depth-4.png');
        this.load.image('bg_mntn3', 'src/assets/bg/mountain-depth-3.png');
        this.load.image('bg_mntn2', 'src/assets/bg/Mountain-depth-2.png');
        this.load.image('bg_trees1', 'src/assets/boot/bg/trees-depth-4.png');
        this.load.image('sun', 'src/assets/bg/Sun.png');
        this.load.image('bg_sky', 'src/assets/bg/Sky cloud.png');
    //     this.load.image('bg_mntn1', 'src/assets/bg/home/morfit walking.png');
    //     this.load.image('bg_mntn0', 'src/assets/bg/home/ground.png');
     }

}

export default BootScene;