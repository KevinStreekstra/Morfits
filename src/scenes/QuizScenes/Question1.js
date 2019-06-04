import AlignGrid from '../../classes/AlignGrid'

import { addImage, withDPI } from '../../helpers'

class Question1 extends Phaser.Scene {
    constructor() {
        super({
            key: 'Question1'
        })

        this.bg
        this.vines
        this.vines2
        this.popupPlank
        this.smallPlank
        this.answer
        this.back
        this.substraction

        this.txt1

        this.addImage = addImage.bind(this)
        this.withDPI = withDPI.bind(this)
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

        this.bg = this.addImage(0, 0, 'Stats:bg').setOrigin(0, 0)
        this.grid.scaleX(this.bg, 1)
        this.grid.scaleY(this.bg, 1)

        this.vines2 = this.addImage(0, 0, 'Question1:Vines')
        this.grid.placeAtIndex(77, this.vines2)

        this.vines = this.addImage(0, 0, 'Question1:Vines')
        this.grid.placeAtIndex(87, this.vines)

        this.popupPlank = this.addImage(0, 0, 'StopQuiz:popupPlank')
        this.grid.placeAtIndex(37, this.popupPlank)

        this.question = this.add
            .text(0, 0, 'Vraag', {
                fontFamily: 'Bubblegum Sans',
                fontSize: `${Math.round(30 * window.devicePixelRatio)}px`
            })
            .setOrigin(0.5, 0.6)
        this.grid.placeAtIndex(21, this.question)

        this.substraction = this.addImage(0, 0, 'Question1:substraction')
        this.grid.placeAtIndex(24, this.substraction)

        this.txt1 = this.add
            .text(0, 0, '1/5', {
                fontFamily: 'Bubblegum Sans',
                fontSize: `${Math.round(24 * window.devicePixelRatio)}px`
            })
            .setOrigin(0.5, 0.5)
        this.grid.placeAtIndex(24, this.txt1)
        // Wat kan je beter niet teveel eten volgens de schijf van 5
        this.vraag = this.add
            .text(
                0,
                0,
                'Wat kan je beter niet teveel eten volgens de schijf van 5?',
                {
                    fontFamily: 'Bubblegum Sans',
                    fontSize: `${Math.round(28 * window.devicePixelRatio)}px`,
                    align: 'center',
                    wordWrap: {
                        width: 250 * window.devicePixelRatio,
                        useAdvancedWrap: true
                    }
                }
            )
            .setOrigin(0.5, 0.7)
        this.grid.placeAtIndex(52, this.vraag)

        this.smallPlank = this.addImage(0, 0, 'Question1:smallPlank').setOrigin(
            0.5,
            0.7
        )
        this.grid.placeAtIndex(187, this.smallPlank)

        this.answer = this.addImage(0, 0, 'Question1:answer')
            .setOrigin(0.5, 0.8)
            .setInteractive()
        this.answer.on('pointerdown', () => {
            this.scene.stop('Question1')
            this.scene.launch('Question2')
        })
        this.grid.placeAtIndex(112, this.answer)

        this.txt1 = this.add
            .text(0, 0, 'Broccoli', {
                fontFamily: 'Bubblegum Sans',
                fontSize: `${Math.round(28 * window.devicePixelRatio)}px`
            })
            .setOrigin(0.5, 1.25)
            .setInteractive()
        this.txt1.on('pointerdown', () => {
            this.scene.stop('Question1')
            this.scene.launch('Question2')
        })
        this.grid.placeAtIndex(112, this.txt1)

        this.answer = this.addImage(0, 0, 'Question1:answer').setInteractive()
        this.answer.on('pointerdown', () => {
            this.scene.stop('Question1')
            this.scene.launch('Question2')
        })
        this.grid.placeAtIndex(82, this.answer)

        this.txt1 = this.add
            .text(0, 0, 'Zalm', {
                fontFamily: 'Bubblegum Sans',
                fontSize: `${Math.round(28 * window.devicePixelRatio)}px`
            })
            .setOrigin(0.5, 0.5)
            .setInteractive()
        this.txt1.on('pointerdown', () => {
            this.scene.stop('Question1')
            this.scene.launch('Question2')
        })
        this.grid.placeAtIndex(82, this.txt1)

        this.answer = this.addImage(0, 0, 'Question1:answer')
            .setOrigin(0.5, 0.5)
            .setInteractive()
        this.answer.on('pointerdown', () => {
            this.scene.stop('Question1')
            this.scene.launch('Question2')
        })
        this.grid.placeAtIndex(127, this.answer)

        this.txt1 = this.add
            .text(0, 0, 'Banaan', {
                fontFamily: 'Bubblegum Sans',
                fontSize: `${Math.round(28 * window.devicePixelRatio)}px`
            })
            .setOrigin(0.5, 0.5)
            .setInteractive()
        this.txt1.on('pointerdown', () => {
            this.scene.stop('Question1')
            this.scene.launch('Question2')
        })
        this.grid.placeAtIndex(127, this.txt1)

        this.answer = this.addImage(0, 0, 'Question1:answer')
            .setOrigin(0.5, 0.8)
            .setInteractive()
        this.answer.on('pointerdown', () => {
            this.scene.stop('Question1')
            this.scene.launch('Question2')
        })
        this.grid.placeAtIndex(157, this.answer)

        this.txt1 = this.add
            .text(0, 0, 'Worstenbroodje', {
                fontFamily: 'Bubblegum Sans',
                fontSize: `${Math.round(28 * window.devicePixelRatio)}px`
            })
            .setOrigin(0.5, 1.25)
            .setInteractive()
        this.txt1.on('pointerdown', () => {
            this.scene.stop('Question1')
            this.scene.launch('Question2')
        })
        this.grid.placeAtIndex(157, this.txt1)

        this.back = this.addImage(0, 0, 'Question1:back')
            .setOrigin(0.6, 0.8)
            .setInteractive()
        this.back.on('pointerdown', () => {
            this.scene.stop('Question1')
            this.scene.launch('StartQuiz')
        })
        this.grid.placeAtIndex(184, this.back)

        this.back = this.addImage(0, 0, 'Question1:back')
            .setOrigin(0.5, 0.8)
            .setInteractive()
        this.back.on('pointerdown', () => {
            this.scene.stop('Question1')
            this.scene.launch('Question2')
        })
        this.back.flipX = true
        this.grid.placeAtIndex(190, this.back)

        this.quit = this.addImage(0, 0, 'Daily:quit')
            .setOrigin(0.5, 0.675)
            .setInteractive()
        this.quit.on('pointerdown', () => {
            this.scene.sleep('Question1')
            this.scene.launch('StopQuiz')
        })
        this.grid.placeAtIndex(217, this.quit)

        //this.grid.showNumbers();
    }
}

export default Question1
