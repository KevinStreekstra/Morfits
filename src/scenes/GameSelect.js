import Phaser from 'phaser'
import {withDPI} from '../helpers';

class GameSelectScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameSelect'
        });
    }

    create() {

        this.backgroundBackdrop = this.add
            .image(0, withDPI(68), 'Snake:guide_helper_background')
            .setDepth(-1)
            .setScale(withDPI(0.2), withDPI(0.2))
            .setOrigin(0, 0)

        this.add
            .image(withDPI(16), withDPI(84), 'Snake:modal_background')
            .setDepth(40)
            .setDisplaySize(withDPI(343), withDPI(554))
            .setOrigin(0, 0)

        this.modalHeader = this.add
            .text(
                withDPI(187),
                withDPI(116),
                'Minigames',
                {
                    fontFamily: 'Bubblegum Sans',
                    fontSize: '32px',
                    color: '#2E3A4B',
                    align: 'center',
                    stroke: '#ffffff',
                    strokeThickness: 8,
                    resolution: window.devicePixelRatio
                }
            )
            .setDepth(41)
            .setOrigin(0.5, 0)
            .setScale(withDPI(1), withDPI(1))
            .setVisible(true)

        this.snakeGamePrice = this.add
            .image(withDPI(42), withDPI(180), 'GameSelect:snake_cost')
            .setScale(withDPI(0.2), withDPI(0.2))
            .setOrigin(0, 0)
            .setVisible(true)
            .setDepth(42)

        this.snakeThumbnail = this.add
            .image(withDPI(48), withDPI(194), 'GameSelect:snake_thumbnail')
            .setScale(withDPI(0.2), withDPI(0.2))
            .setOrigin(0, 0)
            .setDepth(41)
            .setVisible(true)
            .setInteractive()

        this.snakeThumbnail.on('pointerdown', () => {
            this.scene.stop('GameSelect')
            this.scene.start('SnakeScene')
        })

        this.snakeGameTitle = this.add
            .text(
                withDPI(112),
                withDPI(335),
                'Snake',
                {
                    fontFamily: 'Bubblegum Sans',
                    fontSize: '24px',
                    color: '#ffffff',
                    align: 'center',
                    resolution: window.devicePixelRatio
                }
            )
            .setOrigin(0.5, 0)
            .setScale(withDPI(1), withDPI(1))
            .setDepth(42)
            .setVisible(true)

        this.startSnakeButton = this.add
            .image(withDPI(50), withDPI(370), 'GameSelect:start_button')
            .setScale(withDPI(0.2), withDPI(0.2))
            .setOrigin(0, 0)
            .setDepth(42)
            .setVisible(true)
            .setInteractive()

        this.startSnakeButton.on('pointerdown', () => {
            this.scene.stop('GameSelect')
            this.scene.start('SnakeScene')
        })

        this.homeButton = this.add
            .image(withDPI(168), withDPI(618), 'Snake:home_button')
            .setScale(withDPI(0.2), withDPI(0.2))
            .setOrigin(0, 0)
            .setDepth(43)
            .setVisible(true)
            .setInteractive();

        this.homeButton.on('pointerdown', () => {
            this.scene.stop('GameSelect')
            this.scene.start('OverviewScene')
        })
    }
}

export default GameSelectScene;
