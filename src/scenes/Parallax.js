class ParallaxScene extends Phaser.Scene {
    constructor(props) {
        super({
            key: 'ParallaxScene'
        });

        this.background_cloud;
    }

    preload() {}
      
    create() {
        this.add.image(0, 0, 'bg').setOrigin(0, 0);
        this.background_cloud = this.add.tileSprite(0, 0, this.width, this.height, 'bg_cloud').setOrigin(0, 0);
        this.add.image(0, 0, 'bg_mntn4').setOrigin(0, 0).setScrollFactor(.75);
        this.add.image(0, 0, 'bg_mntn3').setOrigin(0, 0).setScrollFactor(.60);
    }
      
    update() {
        this.background_cloud.tilePositionX -= .5;
    }
}

export default ParallaxScene;