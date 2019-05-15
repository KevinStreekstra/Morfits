import AlignGrid from '../classes/AlignGrid';
import { addImage } from '../helpers';

class LoadingScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'LoadingScene'
        });
        this.addImage = addImage.bind(this);
    }

    preload() {
        this.grid = new AlignGrid({
            scene: this, 
            rows: 13, 
            cols: 11,
            width: this.sys.game.config.width,         
            height: this.sys.game.config.height
        });

        window.setInterval(()=>{
            if ((this.loadingText.text += '.').length == 25) 
                this.loadingText.text = 'Je Morfit is onderweg';
        }, 750);

        this.load.spritesheet('bird1', 'src/assets/boot/bird-1.png', {frameWidth: 400, frameHeight: 400});
        this.load.spritesheet('bird2', 'src/assets/boot/bird-2.png', {frameWidth: 400, frameHeight: 400});
        this.load.image('ground', 'src/assets/boot/ground.png');
        this.load.image('loadingText', 'src/assets/boot/loading-text.png');
        this.load.image('morfitWalking', 'src/assets/boot/Morfit walking.png');
        this.load.image('morfitLogo', 'src/assets/boot/morfit-logo.png');
        this.load.image('plant1', 'src/assets/boot/Plant_2.png');
        this.load.image('plant2', 'src/assets/boot/Plant_6.png');

        this.load.image('bg', 'src/assets/boot/bg/background.png');
        this.load.image('bg_mntn1', 'src/assets/boot/bg/mountain-depth-5.png');
        this.load.image('bg_mntn2', 'src/assets/boot/bg/mountain-depth-4.png');
        this.load.image('bg_mntn3', 'src/assets/bg/mountain-depth-3.png');
        this.load.image('bg_terrain_front', 'src/assets/boot/bg/terrain-front.png');
        this.load.image('bg_trees_front', 'src/assets/boot/bg/trees-front.png');
        this.load.image('bg_trees1', 'src/assets/boot/bg/trees-depth-4.png');
        this.load.image('bg_cloud6', 'src/assets/boot/bg/clouds-depth-6.png');
        this.load.image('bg_cloud5', 'src/assets/boot/bg/clouds-depth-5.png');
        this.load.image('sun', 'src/assets/bg/Sun.png');
        this.load.image('bg_sky', 'src/assets/bg/Sky cloud.png');

        this.load.on('complete', () => {
            this.scene.launch('BootScene');
            this.scene.sendToBack('BootScene');
        });
    }

    create() {        
        this.anims.create({
            key: 'fly',
            repeat: -1,
            frameRate: 5,
            smoothed: false,
            frames: this.anims.generateFrameNames('bird1', {start: 1, end: 4})
       
        });

        this.anims.create({
            key: 'fly2',
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNames('bird2', {start: 1, end: 4})
       
        });

        // De achtergrond van het scherm
        
        this.bg = this.addImage(0, 0, 'bg');
        this.grid.placeAtIndex(60, this.bg); 
        this.bg_cloud6 = this.addImage(0, 0, 'bg_cloud6').setOrigin(0, 0.19);
        this.mntn1 = this.addImage(0, 0, 'bg_mntn1').setOrigin(0, 0);
        this.grid.scaleX(this.mntn1, 2.5);
       
        this.mntn2 = this.addImage(0, 0, 'bg_mntn2').setOrigin(0.13, 0);
       
        this.bg_trees1 = this.addImage(0, 0, 'bg_trees1').setOrigin(0.134, 0);
        this.bg_terrain_front = this.addImage(0, 0, 'bg_terrain_front').setOrigin(0, 0.17);
        this.bg_trees_front = this.addImage(0, 0, 'bg_trees_front').setOrigin(0, 0.17);
        this.bg_cloud5 = this.addImage(0, 0, 'bg_cloud5').setOrigin(0.05, 0.1);
       
        // Het morfit logo aan de bovenkant
        this.morfitLogo = this.addImage(0, 0, 'morfitLogo').setOrigin(0, 0);
        this.grid.placeAtIndex(2, this.morfitLogo); 
        this.grid.scaleTo(this.morfitLogo, 0.5, 500);
        // Beide vogels die in de lucht zweven
        this.bird1 = this.add.sprite(0, 0, 'bird1', 0);
        this.bird1.play('fly');
        this.grid.placeAtIndex(35, this.bird1);
        this.grid.scaleTo(this.bird1, 0.3, 500);
        this.bird2 = this.add.sprite(0, 0, 'bird2');
        this.bird2.play('fly2');
        this.grid.placeAtIndex(63, this.bird2);
        this.grid.scaleTo(this.bird2, 0.3, 500);
        // Plant aan de rechter van het scherm
        this.plant2 = this.addImage(0, 0, 'plant2');
        this.grid.placeAtIndex(108, this.plant2);
        this.grid.scaleTo(this.plant2, 0.17, 500);
        // De grond
        this.ground = this.addImage(0, this.sys.game.config.height, 'ground').setOrigin(0, 1);
        this.grid.scaleY(this.ground, .22);
        // Boom aan de linkerkant van het scherm
        this.plant1 = this.addImage(0, 0, 'plant1');
        this.grid.placeAtIndex(89, this.plant1);
        this.grid.scaleTo(this.plant1, 0.28, 500);
        // De morfit in het midden van het scherm
        this.morfitWalking = this.addImage(0, 0, 'morfitWalking');
        this.grid.placeAtIndex(82, this.morfitWalking);
        this.grid.scaleTo(this.morfitWalking, .5);
        // De laad tekst onderaan het scherm
        this.loadingText = this.add.text(0, 0, 'Je Morfit is onderweg', { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(35 * window.devicePixelRatio)}px`, fill: 'white'}).setOrigin(0.5, 0.5);
        this.grid.placeAtIndex(137, this.loadingText);
    }
}

export default LoadingScene;