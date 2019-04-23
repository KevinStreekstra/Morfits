import Player from '../classes/Player';

class BootScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'BootScene'
        });
    }

    preload() {
        const progress = this.add.graphics();
        const progressValue = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, '0%', { fontSize: '32px', fill: '#000' });

        this.load.on('progress', (value) => {
            progress.clear();
            progress.fillStyle(0xffffff);
            progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 30);
            progressValue.text = `${value * 100}%`;
        });

        this.load.on('complete', () => {
            progress.destroy();
            this.scene.start('OverviewScene');
        });

        this.load.image('bg', 'src/assets/bg/background.png');
        this.load.image('bg_cloud', 'src/assets/bg/Background-cloud.png');
        this.load.image('bg_mntn4', 'src/assets/bg/Background-mountain-depth-4.png');
        this.load.image('bg_mntn3', 'src/assets/bg/mountain-depth-3.png');
        this.load.image('bg_mntn2', 'src/assets/bg/Mountain-depth-2.png');
        this.load.image('bg_mntn1', 'src/assets/bg/mountain-depth-1.png');
        this.load.image('bg_mntn0', 'src/assets/bg/Mountain-depth-0.png');
        this.load.image('sun', 'src/assets/bg/Sun.png');
        this.load.image('bg_sky', 'src/assets/bg/Sky cloud.png');

        new Player().init();
    }
}

export default BootScene;