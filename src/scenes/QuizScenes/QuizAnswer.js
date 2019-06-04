import AlignGrid from '../../classes/AlignGrid'

import { addImage } from '../../helpers'

class QuizAnswer extends Phaser.Scene {
    constructor() {
        super({
            key: 'QuizAnswer'
        })

        this.bg
        this.plank1
        this.vines2
        this.vines
        this.correct
        this.btnDown
        this.plank

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

        this.bg = this.addImage(0, 0, 'Stats:bg')
            .setOrigin(0, 0)
            .setScale(2.4)

        this.vines2 = this.addImage(0, 0, 'Question1:Vines')
        this.grid.placeAtIndex(77, this.vines2)

        this.vines = this.addImage(0, 0, 'Question1:Vines')
        this.grid.placeAtIndex(87, this.vines)

        this.quiz = this.addImage(0, 0, 'Quiz:Start').setScale(1.6)
        this.grid.placeAtIndex(22, this.quiz)

        this.plank = this.addImage(0, 0, 'Info:plank').setOrigin(0.5, 0.52)
        this.grid.placeAtIndex(52, this.plank)
        this.grid.scaleTo(this.plank, 0)

        this.plank1 = this.addImage(0, 0, 'QuizAnswer:plank')
        this.grid.placeAtIndex(52, this.plank1)

        this.txt1 = this.add
            .text(0, 0, 'Vraag 1', {
                fontFamily: 'Bubblegum Sans',
                fontSize: `${Math.round(20 * window.devicePixelRatio)}px`,
                wordWrap: {
                    width: 300 * window.devicePixelRatio,
                    useAdvancedWrap: true
                }
            })
            .setOrigin(0.7, 1.4)
        this.grid.placeAtIndex(48, this.txt1)

        this.txt1 = this.add
            .text(0, 0, 'Wat kan je beter niet teveel eten van de schijf van 5?', {
                fontFamily: 'Bubblegum Sans',
                fontSize: `${Math.round(16 * window.devicePixelRatio)}px`,
                wordWrap: {
                    width: 200 * window.devicePixelRatio,
                    useAdvancedWrap: true
                }
            })
            .setOrigin(0.07, 0.2)
        this.grid.placeAtIndex(47, this.txt1)

        this.correct = this.addImage(0, 0, 'QuizAnswer:correct')
        this.grid.placeAtIndex(55, this.correct)

        this.btnDown = this.addImage(0, 0, 'QuizAnswer:btnDown').setInteractive()
        this.btnDown.on('pointerdown', () => {
            this.slidedown.play()
        })
        this.grid.placeAtIndex(57, this.btnDown)

        this.plank1 = this.addImage(0, 0, 'QuizAnswer:plank2')
        this.grid.placeAtIndex(82, this.plank1)

        this.txt1 = this.add
            .text(0, 0, 'Vraag 2', {
                fontFamily: 'Bubblegum Sans',
                fontSize: `${Math.round(20 * window.devicePixelRatio)}px`,
                wordWrap: {
                    width: 300 * window.devicePixelRatio,
                    useAdvancedWrap: true
                }
            })
            .setOrigin(0.7, 1.4)
        this.grid.placeAtIndex(78, this.txt1)

        this.txt1 = this.add
            .text(0, 0, 'Wat kan de meester/ juffrouw beter niet teveel doen?', {
                fontFamily: 'Bubblegum Sans',
                fontSize: `${Math.round(16 * window.devicePixelRatio)}px`,
                wordWrap: {
                    width: 200 * window.devicePixelRatio,
                    useAdvancedWrap: true
                }
            })
            .setOrigin(0.09, 0.2)
        this.grid.placeAtIndex(77, this.txt1)

        this.correct = this.addImage(0, 0, 'QuizAnswer:correct')
        this.grid.placeAtIndex(85, this.correct)

        this.btnDown = this.addImage(0, 0, 'QuizAnswer:btnDown')
        this.grid.placeAtIndex(87, this.btnDown)

        this.plank1 = this.addImage(0, 0, 'QuizAnswer:plank3')
        this.grid.placeAtIndex(112, this.plank1)

        this.txt1 = this.add
            .text(0, 0, 'Vraag 3', {
                fontFamily: 'Bubblegum Sans',
                fontSize: `${Math.round(20 * window.devicePixelRatio)}px`,
                wordWrap: {
                    width: 300 * window.devicePixelRatio,
                    useAdvancedWrap: true
                }
            })
            .setOrigin(0.7, 1.4)
        this.grid.placeAtIndex(108, this.txt1)

        this.txt1 = this.add
            .text(0, 0, 'Ik kan beter witbrood eten dan volkorenbrood?', {
                fontFamily: 'Bubblegum Sans',
                fontSize: `${Math.round(16 * window.devicePixelRatio)}px`,
                wordWrap: {
                    width: 200 * window.devicePixelRatio,
                    useAdvancedWrap: true
                }
            })
            .setOrigin(0.1, 0.2)
        this.grid.placeAtIndex(107, this.txt1)

        this.correct = this.addImage(0, 0, 'QuizAnswer:correct')
        this.grid.placeAtIndex(115, this.correct)

        this.btnDown = this.addImage(0, 0, 'QuizAnswer:btnDown')
        this.grid.placeAtIndex(117, this.btnDown)

        this.plank1 = this.addImage(0, 0, 'QuizAnswer:plank4')
        this.grid.placeAtIndex(142, this.plank1)

        this.txt1 = this.add
            .text(0, 0, 'Vraag 4', {
                fontFamily: 'Bubblegum Sans',
                fontSize: `${Math.round(20 * window.devicePixelRatio)}px`,
                wordWrap: {
                    width: 300 * window.devicePixelRatio,
                    useAdvancedWrap: true
                }
            })
            .setOrigin(0.7, 1.4)
        this.grid.placeAtIndex(138, this.txt1)

        this.txt1 = this.add
            .text(0, 0, 'Welk toetje kan ik het beste eten?', {
                fontFamily: 'Bubblegum Sans',
                fontSize: `${Math.round(16 * window.devicePixelRatio)}px`,
                wordWrap: {
                    width: 200 * window.devicePixelRatio,
                    useAdvancedWrap: true
                }
            })
            .setOrigin(0.09, 0.2)
        this.grid.placeAtIndex(137, this.txt1)

        this.correct = this.addImage(0, 0, 'QuizAnswer:correct')
        this.grid.placeAtIndex(145, this.correct)

        this.btnDown = this.addImage(0, 0, 'QuizAnswer:btnDown')
        this.grid.placeAtIndex(147, this.btnDown)

        this.plank1 = this.addImage(0, 0, 'QuizAnswer:plank5')
        this.grid.placeAtIndex(172, this.plank1)

        this.txt1 = this.add
            .text(0, 0, 'Vraag 5', {
                fontFamily: 'Bubblegum Sans',
                fontSize: `${Math.round(20 * window.devicePixelRatio)}px`,
                wordWrap: {
                    width: 300 * window.devicePixelRatio,
                    useAdvancedWrap: true
                }
            })
            .setOrigin(0.7, 1.4)
        this.grid.placeAtIndex(168, this.txt1)

        this.txt1 = this.add
            .text(0, 0, 'Wat is waar?', {
                fontFamily: 'Bubblegum Sans',
                fontSize: `${Math.round(16 * window.devicePixelRatio)}px`,
                wordWrap: {
                    width: 200 * window.devicePixelRatio,
                    useAdvancedWrap: true
                }
            })
            .setOrigin(0.2, 0.2)
        this.grid.placeAtIndex(167, this.txt1)

        this.correct = this.addImage(0, 0, 'QuizAnswer:correct')
        this.grid.placeAtIndex(175, this.correct)

        this.btnDown = this.addImage(0, 0, 'QuizAnswer:btnDown')
        this.grid.placeAtIndex(177, this.btnDown)

        this.quit = this.addImage(0, 0, 'Daily:quit')
            .setOrigin(0.5, 0.675)
            .setInteractive()
        this.quit.on('pointerdown', () => {
            this.scene.stop('QuizAnswer')
            this.scene.stop('InfoQuestion')
            this.scene.launch('QuizReward')
            this.scene.launch('OverviewScene')
        })
        this.grid.placeAtIndex(202, this.quit)

        this.slidedown = this.tweens.add({
            targets: [this.plank],

            scaleY: 300,
            ease: 'linear',
            duration: 300,
            repeat: 0,
            yoyo: false,
            repeat: 0
        })

        //this.grid.showNumbers();
    }
}

export default QuizAnswer
