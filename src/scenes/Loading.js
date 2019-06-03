import AlignGrid from '../classes/AlignGrid'
import { addImage, withDPI } from '../helpers'

class LoadingScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'LoadingScene'
        })
        this.addImage = addImage.bind(this)
    }

    preload() {
        this.grid = new AlignGrid({
            scene: this,
            rows: 13,
            cols: 11,
            width: this.sys.game.config.width,
            height: this.sys.game.config.height
        })

        this.load.spritesheet(
            'bird1',
            require('../assets/loading/spritesheets/bird_rotated_left.png'),
            { frameWidth: 400, frameHeight: 400 }
        )

        this.load.spritesheet(
            'bird2',
            require('../assets/loading/spritesheets/bird_rotated_right.png'),
            { frameWidth: 400, frameHeight: 400 }
        )

        this.load.image('ground', require('../assets/loading/assets/ground.png'))

        this.load.image(
            'loadingText',
            require('../assets/loading/text/txt_loading.png')
        )

        this.load.image(
            'morfitWalking',
            require('../assets/character/character.png')
        )

        this.load.image('morfitLogo', require('../assets/loading/assets/logo.png'))
        this.load.image('plant1', require('../assets/loading/plants/plant_aabranium.png'))
        this.load.image('plant2', require('../assets/loading/plants/plant_eostraboom.png'))

        this.load.image('bg', require('../assets/loading/backgrounds/background.png'))
        this.load.image(
            'bg_mntn1',
            require('../assets/loading/backgrounds/mountain-depth-5.png')
        )
        this.load.image(
            'bg_mntn2',
            require('../assets/loading/backgrounds/mountain-depth-4.png')
        )
        this.load.image(
            'bg_mntn3',
            require('../assets/loading/backgrounds/mountain-depth-3.png')
        )
        this.load.image(
            'bg_terrain_front',
            require('../assets/loading/backgrounds/terrain-front.png')
        )
        this.load.image(
            'bg_trees_front',
            require('../assets/loading/backgrounds/trees-front.png')
        )
        this.load.image(
            'bg_trees1',
            require('../assets/loading/backgrounds/trees-depth-4.png')
        )
        this.load.image(
            'bg_cloud6',
            require('../assets/loading/backgrounds/clouds-depth-6.png')
        )
        this.load.image(
            'bg_cloud5',
            require('../assets/loading/backgrounds/clouds-depth-5.png')
        )
        this.load.image('sun', require('../assets/loading/backgrounds/sun.png'))
        this.load.image('bg_sky', require('../assets/loading/backgrounds/sky_cloud.png'))

        this.load.on('complete', () => {
            this.scene.launch('BootScene')
            this.scene.sendToBack('BootScene')
        })
    }

    create() {
        this.anims.create({
            key: 'fly',
            repeat: -1,
            frameRate: 5,
            smoothed: false,
            frames: this.anims.generateFrameNames('bird1', { start: 1, end: 4 })
        })

        this.anims.create({
            key: 'fly2',
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNames('bird2', { start: 1, end: 4 })
        })

        // De achtergrond van het scherm

        this.bg = this.addImage(0, 0, 'bg')
        this.grid.placeAtIndex(60, this.bg)
        this.bg_cloud6 = this.addImage(0, 0, 'bg_cloud6').setOrigin(0, 0.19)
        this.mntn1 = this.addImage(0, 0, 'bg_mntn1').setOrigin(0, 0)
        this.grid.scaleX(this.mntn1, 2.5)

        this.mntn2 = this.addImage(0, 0, 'bg_mntn2').setOrigin(0.13, 0)

        this.bg_trees1 = this.addImage(0, 0, 'bg_trees1').setOrigin(0.134, 0)
        this.bg_terrain_front = this.addImage(
            0,
            0,
            'bg_terrain_front'
        ).setOrigin(0, 0.17)
        this.bg_trees_front = this.addImage(0, 0, 'bg_trees_front').setOrigin(
            0,
            0.17
        )
        this.bg_cloud5 = this.addImage(0, 0, 'bg_cloud5').setOrigin(0.05, 0.1)

        // Het morfit logo aan de bovenkant
        this.morfitLogo = this.addImage(0, 0, 'morfitLogo').setOrigin(0, 0)
        this.grid.placeAtIndex(2, this.morfitLogo)
        this.grid.scaleTo(this.morfitLogo, 0.5, 500)
        // Beide vogels die in de lucht zweven
        this.bird1 = this.add.sprite(0, 0, 'bird1', 0)
        this.bird1.play('fly')
        this.grid.placeAtIndex(35, this.bird1)
        this.grid.scaleTo(this.bird1, 0.3, 500)
        this.bird2 = this.add.sprite(0, 0, 'bird2')
        this.bird2.play('fly2')
        this.grid.placeAtIndex(63, this.bird2)
        this.grid.scaleTo(this.bird2, 0.3, 500)
        // Plant aan de rechter van het scherm
        this.plant2 = this.addImage(0, 0, 'plant2')
        this.grid.placeAtIndex(108, this.plant2)
        this.grid.scaleTo(this.plant2, 0.17, 500)
        // De grond
        this.ground = this.addImage(
            0,
            this.sys.game.config.height,
            'ground'
        ).setOrigin(0, 1)
        this.grid.scaleY(this.ground, 0.22)
        // Boom aan de linkerkant van het scherm
        this.plant1 = this.addImage(0, 0, 'plant1')
        this.grid.placeAtIndex(89, this.plant1)
        this.grid.scaleTo(this.plant1, 0.28, 500)
        // De morfit in het midden van het scherm
        this.morfitWalking = this.add.image(0, 0, 'morfitWalking').setScale(withDPI(0.2), withDPI(0.2))
        this.morfitWalking.flipX = true
        this.grid.placeAtIndex(93, this.morfitWalking)

        // De laad tekst onderaan het scherm
        this.loadingText = this.add
            .text(0, 0, 'Je Morfit is onderweg', {
                fontFamily: 'Bubblegum Sans',
                fontSize: `${Math.round(35 * window.devicePixelRatio)}px`,
                fill: 'white'
            })
            .setOrigin(0.5, 0.5)
        this.grid.placeAtIndex(137, this.loadingText)

        this.time.addEvent({
            delay: 300,
            callback: () => {
                if ((this.loadingText.text += '.').length == 25)
                    this.loadingText.text = 'Je Morfit is onderweg'
            },
            callbackScope: this,
            loop: true
        })
    }
}

export default LoadingScene
