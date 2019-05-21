import AlignGrid from '../classes/AlignGrid';

import { addImage, addElement, addRectangle } from '../helpers';

class Shop extends Phaser.Scene {
    constructor() {
        super({
            key: 'ShopScene'
        });

        this.addImage = addImage.bind(this);
        this.addElement = addElement.bind(this);
        this.addRectangle = addRectangle.bind(this);
    }

    preload() {

    }

    create() {
        this.grid = new AlignGrid({
            scene: this, 
            rows: 15, 
            cols: 15, 
            width: this.sys.game.config.width, 
            height: this.sys.game.config.height
        });

        this.shopContainer = this.addElement(0, 0, 'div').setClassName('shopContainer').setOrigin(.5, .475);
        this.grid.placeAtIndex(112, this.shopContainer);
        this.shopContainer.setScale(0, 0);

        this.bg = this.addRectangle(0, 0, 375, 675, 0xffffff).setOrigin(0, 0);

        this.bgOverlay = this.addImage(0, 0, 'shop:bg').setOrigin(0.5, 0);
        this.grid.placeAtIndex(22, this.bgOverlay);
        this.grid.scaleTo(this.bgOverlay, 1);

        this.nav = this.addImage(0, 0, 'shop:nav').setOrigin(0.5, .225);
        this.grid.placeAtIndex(22, this.nav);
        this.grid.scaleTo(this.nav, 1);

        this.tweens.add({
            targets: [
                this.shopModal,
             ],
            scaleX: 1 * window.devicePixelRatio,
            scaleY: 1 * window.devicePixelRatio,
            ease: 'Bounce',
            duration: 300,
            repeat: 0,
            yoyo: false
        });

        this.grid.showNumbers();
    }
}

export default Shop;