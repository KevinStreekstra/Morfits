import AlignGrid from '../classes/AlignGrid'
import Player from '../classes/Player'
import { addImage } from '../helpers'

class TopNavBar extends Phaser.Scene {
    constructor() {
        super({
            key: 'TopNavBar'
        })

        this._player = new Player()
        this.player = {}
        this.addImage = addImage.bind(this)
    }

    preload() {
        this.player = this._player.get()
    }

    create() {
        this.grid = new AlignGrid({
            scene: this,
            rows: 15,
            cols: 15,
            width: this.sys.game.config.width,
            height: this.sys.game.config.height
        })
        // Top Navbar
        this.TopNavbar = this.addImage(0, 0, 'overview:BottomNavbar')
        this.grid.placeAtIndex(7, this.TopNavbar)
        this.whiteBg = this.addImage(0, 0, 'overview:whiteBG')
            .setOrigin(0.55, 0.45)
            .setInteractive()
        this.whiteBg.on('pointerdown', () => {
            this.scene.bringToTop('StatsScene')
            this.scene.launch('StatsScene')
            this.scene.stop('InventoryScene')
            this.scene.stop('ShopScene')
        })

        this.grid.placeAtIndex(3, this.whiteBg)
        this.Mylevel = this.add
            .text(
                28 * window.devicePixelRatio,
                24 * window.devicePixelRatio,
                this._player.getLevel(),
                {
                    fontFamily: 'Bubblegum Sans',
                    fontSize: `${Math.round(16 * window.devicePixelRatio)}px`,
                    fill: 'black',
                    align: 'center'
                }
            )
            .setOrigin(0.5, 0.2)
        this.Myname = this.add
            .text(
                90 * window.devicePixelRatio,
                25 * window.devicePixelRatio,
                this.player.username,
                {
                    fontFamily: 'Bubblegum Sans',
                    fontSize: `${Math.round(16 * window.devicePixelRatio)}px`,
                    fill: 'black',
                    align: 'center'
                }
            )
            .setOrigin(0.6, 0.25)
        this.navPP = this.addImage(0, 0, 'overview:navPP').setOrigin(0.8, 0.43)
        this.grid.placeAtIndex(9, this.navPP)
        this.MyPP = this.add
            .text(
                225 * window.devicePixelRatio,
                26 * window.devicePixelRatio,
                this.player.powerpoints,
                {
                    fontFamily: 'Bubblegum Sans',
                    fontSize: `${Math.round(16 * window.devicePixelRatio)}px`,
                    fill: 'black'
                }
            )
            .setOrigin(0.5, 0.25)

        this.navM_Dollars = this.addImage(0, 0, 'overview:navM_Dollars').setOrigin(
            0.7,
            0.4
        )
        this.grid.placeAtIndex(13, this.navM_Dollars)
        this.MyM_dollars = this.add
            .text(
                315 * window.devicePixelRatio,
                26 * window.devicePixelRatio,
                this.player.morfos,
                {
                    fontFamily: 'Bubblegum Sans',
                    fontSize: `${Math.round(16 * window.devicePixelRatio)}px`,
                    fill: 'black'
                }
            )
            .setOrigin(0.5, 0.25)
    }
    update() {
        this.Mylevel.text = this._player.getLevel()
        this.MyPP.text = this._player.getPowerPoints()
        this.MyM_dollars.text = this._player.getMorfos()
    }
}

export default TopNavBar
