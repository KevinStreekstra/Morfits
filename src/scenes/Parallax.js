class ParallaxScene extends Phaser.Scene {
    constructor(props) {
        super({
            key: 'ParallaxScene'
        });

        this.background_cloud;
        this.player = {};
        this.energyTxt;
    }

    preload() {
        this.player.energy = JSON.parse(localStorage.getItem('energy'));
    }
      
    create() {
        this.add.image(0, 0, 'bg').setOrigin(0, 0);
        this.background_cloud = this.add.tileSprite(0, 0, this.width, this.height, 'bg_cloud').setOrigin(0, 0);
        this.add.image(0, 0, 'bg_d4').setOrigin(0, 0).setScrollFactor(.75);
        this.add.image(0, 0, 'bg_d3').setOrigin(0, 0).setScrollFactor(.60);
        this.energyTxt = this.add.text(20, 20, `Energy: ${this.player.energy}`);
    }
      
    update() {
        this.background_cloud.tilePositionX -= .5;
        this.getPlayerStats();
    }

    getPlayerStats() {
        this.player.energy = JSON.parse(localStorage.getItem('energy'));
        this.energyTxt.text = `Energy: ${this.player.energy}`;
    }
}

export default ParallaxScene;