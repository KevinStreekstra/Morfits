import AlignGrid from '../classes/AlignGrid'
import { addImage } from '../helpers'

class DailyScenes extends Phaser.Scene {
    constructor() {
        super({
            key: 'DailyScene'
        })

        this.addImage = addImage.bind(this)
    }

    preload() {}

    create() {
        this.grid = new AlignGrid({
            scene: this,
            rows: 15,
            cols: 15,
            width: this.sys.game.config.width,
            height: this.sys.game.config.height
        })

        this.overlay = this.addImage(0, 0, 'Daily:bg').setOrigin(0, 0)
        this.grid.scaleY(this.overlay, 1)

        this.popup = this.addImage(0, 0, 'Daily:popup')
        this.grid.placeAtIndex(112, this.popup)
        this.grid.scaleTo(this.popup, 0)

        this.Mask = this.addImage(0, 0, 'Daily:BgMask')
        this.grid.placeAtIndex(112, this.Mask)
        this.grid.scaleTo(this.Mask, 0)

        this.quit = this.addImage(0, 0, 'Daily:quit').setInteractive()
        this.quit.on('pointerdown', () => {
            this.scene.stop('DailyScene')
            this.scene.launch('OverviewScene')
        })
        this.grid.placeAtIndex(202, this.quit)
        this.grid.scaleTo(this.quit, 0)

        this.start = this.addImage(0, 0, 'Daily:start')
            .setInteractive()
            .setOrigin(0.5, 0.8)
        this.grid.placeAtIndex(172, this.start)
        this.start.on('pointerdown', () => {
            this.scene.stop('DailyScene')
            this.scene.bringToTop('StartQuiz')
            this.scene.launch('StartQuiz')
        })
        this.grid.scaleTo(this.start, 0)

        this.popupplank = this.addImage(0, 0, 'Daily:popupPlank').setOrigin(
            0.5,
            0.7
        )
        this.grid.placeAtIndex(142, this.popupplank)
        this.grid.scaleTo(this.popupplank, 0)

        this.popuptxt = this.add.text(
            0,
            0,
            'Doe mee met de Quiz van de week en win 5 M-Dollars voor vandaag!',
            {
                fontFamily: 'Bubblegum Sans',
                fontSize: `${Math.round(20 * window.devicePixelRatio)}px`,
                wordWrap: {
                    width: 300 * window.devicePixelRatio,
                    useAdvancedWrap: true
                }
            }
        )
        Phaser.Display.Align.In.Center(
            this.popuptxt,
            this.popupplank
        ).setOrigin(0, 0.3)

        this.ribbonCoins = this.addImage(0, 0, 'Daily:ribbonCoins').setOrigin(
            0.5,
            0.6
        )
        this.grid.placeAtIndex(112, this.ribbonCoins)
        this.grid.scaleTo(this.ribbonCoins, 0)

        this.active = this.addImage(0, 0, 'Daily:active')
        this.grid.placeAtIndex(63, this.active)
        this.grid.scaleTo(this.active, 0)

        this.Quiz = this.add.text(0, 0, 'Quiz van de dag!', {
            fontFamily: 'Bubblegum Sans',
            fontSize: `${Math.round(25 * window.devicePixelRatio)}px`,
            align: 'center',
            wordWrap: {
                width: 100 * window.devicePixelRatio,
                useAdvancedWrap: true
            }
        })
        Phaser.Display.Align.In.Center(this.Quiz, this.active)

        this.seperator = this.addImage(0, 0, 'Daily:seperator')
        this.grid.placeAtIndex(67, this.seperator)
        this.grid.scaleTo(this.seperator, 0)

        this.mission = this.add.text(0, 0, 'Missie van de week!', {
            fontFamily: 'Bubblegum Sans',
            fontSize: `${Math.round(25 * window.devicePixelRatio)}px`,
            align: 'center',
            wordWrap: {
                width: 125 * window.devicePixelRatio,
                useAdvancedWrap: true
            }
        })
        Phaser.Display.Align.In.Center(
            this.mission,
            this.active,
            200 * window.devicePixelRatio
        ).setInteractive()
        this.mission.on('pointerdown', () => {
            this.scene.sleep('DailyScene')
            this.scene.bringToTop('WeeklyScene')
            this.scene.launch('WeeklyScene')
        })

        this.tweens.add({
            targets: [
                this.popup,
                this.Mask,
                this.start,
                this.quit,
                this.popupplank,
                this.ribbonCoins,
                this.active,
                this.seperator
            ],
            scaleX: 1 * window.devicePixelRatio,
            scaleY: 1 * window.devicePixelRatio,
            ease: 'Bounce',
            duration: 300,
            repeat: 0,
            yoyo: false
        })

        // this.grid.showNumbers();
    }
}

export default DailyScenes
