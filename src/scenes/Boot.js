class BootScene extends Phaser.Scene {
    constructor(props) {
        super({
            key: 'BootScene'
        });
    }

    preload() {
        const progress = this.add.graphics();

        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
        });

        this.load.on('complete', () => {
            progress.destroy();
            this.scene.start('ParallaxScene');
        });

        this.load.image('bg', 'src/assets/bg/background.png');
        this.load.image('bg_cloud', 'src/assets/bg/Background-cloud.png');
        this.load.image('bg_d4', 'src/assets/bg/Background-mountain-depth-4.png');
        this.load.image('bg_d3', 'src/assets/bg/mountain-depth-3.png');

        if(!localStorage.getItem('energy') || localStorage.getItem('energy') === null)
            localStorage.setItem('energy', JSON.stringify(100));
    }
}

export default BootScene;