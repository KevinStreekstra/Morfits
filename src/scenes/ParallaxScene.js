import bg from '../assets/bg/background.png';
import bg_cloud from '../assets/bg/Background-cloud.png';
import bg_d4 from '../assets/bg/Background-mountain-depth-4.png';
import bg_d3 from '../assets/bg/mountain-depth-3.png';

class ParralaxScene extends Phaser.Scene {
    constructor(props) {
        super({
            key: 'ParralaxScene'
        });
    }

    preload() {
        this.load.image('bg', bg);
        this.load.image('bg_cloud', bg_cloud);
        this.load.image('bg_d4', bg_d4);
        this.load.image('bg_d3', bg_d3);
    }
      
    create() {
        this.add.image(0, 0, 'bg').setOrigin(0, 0);
        background_cloud = this.add.tileSprite(0, 0, this.width, this.height, 'bg_cloud').setOrigin(0, 0);
        this.add.image(0, 0, 'bg_d4').setOrigin(0, 0).setScrollFactor(.75);
        this.add.image(0, 0, 'bg_d3').setOrigin(0, 0).setScrollFactor(.60);
    }
      
    update() {
        background_cloud.tilePositionX -= .5;
    }
}

export default ParralaxScene;