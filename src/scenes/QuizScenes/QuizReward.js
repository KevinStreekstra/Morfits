import AlignGrid from '../../classes/AlignGrid'

import { addImage } from '../../helpers'

class QuizReward extends Phaser.Scene {
    constructor() {
        super({
            key: 'QuizReward'
        })

        this.bg
        this.confetti1
        this.popup
        this.Mask
        this.ribbonCoins
        this.innen

        this.txt1

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

        this.Mask = this.addImage(0, 0, 'Daily:BgMask')
        this.grid.placeAtIndex(112, this.Mask)

        this.ribbonCoins = this.addImage(0, 0, 'Daily:ribbonCoins').setOrigin(
            0.5,
            0.6
        )
        this.grid.placeAtIndex(97, this.ribbonCoins)

        this.txt1 = this.add
            .text(0, 0, 'Goed gedaan!', {
                fontFamily: 'Bubblegum Sans',
                fontSize: `${Math.round(48 * window.devicePixelRatio)}px`
            })
            .setOrigin(0.5, 0.2)
        this.grid.placeAtIndex(52, this.txt1)

        this.txt1 = this.add
            .text(0, 0, 'Je hebt 5 M-Dollars gewonnen!', {
                fontFamily: 'Bubblegum Sans',
                fontSize: `${Math.round(32 * window.devicePixelRatio)}px`,
                wordWrap: {
                    width: 300 * window.devicePixelRatio,
                    useAdvancedWrap: true
                }
            })
            .setOrigin(0.5, 0.5)
        this.grid.placeAtIndex(127, this.txt1)

        this.innen = this.addImage(0, 0, 'QuizReward:Innen')
            .setOrigin(0.5, 0.8)
            .setInteractive()
        this.innen.on('pointerdown', () => {
            this.scene.stop('QuizReward')
        })
        this.grid.placeAtIndex(172, this.innen)

        this.confetti1 = this.addImage(0, 0, 'QuizReward:Confetti1')
        this.grid.placeAtIndex(52, this.confetti1)

        this.confetti1 = this.addImage(0, 0, 'QuizReward:Confetti2')
        this.grid.placeAtIndex(122, this.confetti1)

        this.confetti1 = this.addImage(0, 0, 'QuizReward:Confetti3')
        this.grid.placeAtIndex(132, this.confetti1)

        this.confetti1 = this.addImage(0, 0, 'QuizReward:Confetti4')
        this.grid.placeAtIndex(88, this.confetti1)

        //this.grid.showNumbers();
    }
}

export default QuizReward
