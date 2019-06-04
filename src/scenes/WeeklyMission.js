import AlignGrid from '../classes/AlignGrid'

import { addImage } from '../helpers'

class WeeklyScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'WeeklyScene'
        })

        this.addImage = addImage.bind(this)
    }

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

        this.quit = this.addImage(0, 0, 'Daily:quit').setInteractive()
        this.quit.on('pointerdown', () => {
            this.scene.stop('WeeklyScene')
        })
        this.grid.placeAtIndex(202, this.quit)

        this.popupplank = this.addImage(0, 0, 'Daily:popupPlank')
        this.grid.placeAtIndex(97, this.popupplank)

        this.plank1 = this.add.text(0, 0, 'Loop 10km in de week!', {
            fontFamily: 'Bubblegum Sans',
            fontSize: `${Math.round(24 * window.devicePixelRatio)}px`
        })
        Phaser.Display.Align.In.Center(
            this.plank1,
            this.popupplank,
            -35 * window.devicePixelRatio
        )

        this.check = this.addImage(0, 0, 'Weekly:Check')
        this.grid.placeAtIndex(102, this.check)

        this.popupplank = this.addImage(0, 0, 'Daily:popupPlank')
        this.grid.placeAtIndex(127, this.popupplank)

        this.plank2 = this.add.text(0, 0, 'Sprint voor 0.5km!', {
            fontFamily: 'Bubblegum Sans',
            fontSize: `${Math.round(24 * window.devicePixelRatio)}px`
        })
        Phaser.Display.Align.In.Center(
            this.plank2,
            this.popupplank,
            -50 * window.devicePixelRatio
        )

        this.check2 = this.addImage(0, 0, 'Weekly:Check2')
        this.grid.placeAtIndex(132, this.check2)

        this.popupplank = this.addImage(0, 0, 'Daily:popupPlank')
        this.grid.placeAtIndex(157, this.popupplank)

        this.plank3 = this.add.text(0, 0, 'Zet de muis stil voor 20 min!', {
            fontFamily: 'Bubblegum Sans',
            fontSize: `${Math.round(24 * window.devicePixelRatio)}px`,
            wordWrap: { width: 200 * window.devicePixelRatio, useAdvancedWrap: true }
        })
        Phaser.Display.Align.In.Center(
            this.plank3,
            this.popupplank,
            -45 * window.devicePixelRatio
        )

        this.check2 = this.addImage(0, 0, 'Weekly:Check2')
        this.grid.placeAtIndex(162, this.check2)

        this.active = this.addImage(0, 0, 'Daily:active')
        this.grid.placeAtIndex(71, this.active)

        this.Quiz = this.add.text(0, 0, 'Quiz van de dag!', {
            fontFamily: 'Bubblegum Sans',
            fontSize: `${Math.round(25 * window.devicePixelRatio)}px`,
            align: 'center',
            wordWrap: { width: 100 * window.devicePixelRatio, useAdvancedWrap: true }
        })
        Phaser.Display.Align.In.Center(
            this.Quiz,
            this.active,
            -200 * window.devicePixelRatio
        ).setInteractive()
        this.Quiz.on('pointerdown', () => {
            this.scene.stop('WeeklyScene')
            this.scene.wake('DailyScene')
        })

        this.seperator = this.addImage(0, 0, 'Daily:seperator')
        this.grid.placeAtIndex(67, this.seperator)

        this.mission = this.add.text(0, 0, 'Missie van de week!', {
            fontFamily: 'Bubblegum Sans',
            fontSize: `${Math.round(25 * window.devicePixelRatio)}px`,
            align: 'center',
            wordWrap: { width: 125 * window.devicePixelRatio, useAdvancedWrap: true }
        })
        Phaser.Display.Align.In.Center(this.mission, this.active)

        // this.grid.showNumbers();
    }
}

export default WeeklyScene
