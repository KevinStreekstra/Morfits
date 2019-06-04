import Player from '../classes/Player'
import AlignGrid from '../classes/AlignGrid'

import { addImage, addElement, addRectangle } from '../helpers'

class CreatePlayerScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'CreatePlayerScene'
        })

        this.addElement = addElement.bind(this)
        this.addRectangle = addRectangle.bind(this)
    }

    preload() {}

    create() {
        this.grid = new AlignGrid({
            scene: this,
            rows: 11,
            cols: 11,
            width: this.sys.game.config.width,
            height: this.sys.game.config.height
        })

        this.bg = this.addRectangle(
            0,
            0,
            375,
            this.sys.game.config.height,
            0x132b4b
        ).setOrigin(0, 0)

        this.title = this.add
            .text(0, 0, 'Vul hier je naam in!', {
                fontFamily: 'Bubblegum Sans',
                fontSize: `${Math.round(38 * window.devicePixelRatio)}px`,
                fill: '#2E3A4B',
                stroke: '#fff',
                strokeThickness: 8
            })
            .setOrigin(0.5, 0.5)
        this.grid.placeAtIndex(49, this.title)

        this.input_username = this.addElement(0, 0, 'input')
        this.grid.placeAtIndex(60, this.input_username)

        this.submit = this.addElement(0, 0, 'button')
            .setText('Klaar')
            .setOrigin(0.5, 0.5)
        this.submit.node.className = 'submitPlayer'
        this.submit.addListener('click')
        this.submit.on(
            'click',
            function(e) {
                let txt = this.input_username.node.value
                if (txt.length > 0) {
                    new Player().init(txt)
                    this.scene.start('OverviewScene')
                    this.scene.stop('CreatePlayerScene')
                }
            },
            this
        )
        this.grid.placeAtIndex(69, this.submit)

        //this.grid.showNumbers();
    }
}

export default CreatePlayerScene
