import AlignGrid from '../classes/AlignGrid';
import Player from '../classes/Player';

import { _ITEMS } from '../_ITEMS';

import { addImage, addElement, addRectangle } from '../helpers';

class DetailedItemView extends Phaser.Scene {
    constructor() {
        super({
            key: 'DetailedItemView'
        });

        this.addImage = addImage.bind(this);
        this.addElement = addElement.bind(this);
        this.addRectangle = addRectangle.bind(this);

        this._player = new Player();
    }

    preload() {
        this.player = this._player.get();
    }

    create() {
        this.grid = new AlignGrid({
            scene: this,
            rows: 15,
            cols: 15,
            width: this.sys.game.config.width,
            height: this.sys.game.config.height
        });

        this.bg = this.addRectangle(0, 0, 375, 675, 0xffffff).setOrigin(0, 0);

        this.TopNavbar = this.addImage(0, 0, 'overview:BottomNavbar');
        this.grid.placeAtIndex(7, this.TopNavbar);
        this.whiteBg = this.addImage(0, 0, 'overview:whiteBG').setOrigin(0.55, 0.45);
        this.grid.placeAtIndex(3, this.whiteBg);
        this.Mylevel = this.add.text(0, 0, this._player.getLevel(), { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(16 * window.devicePixelRatio)}px`, fill: 'black'}).setOrigin(1, 0.25);
        this.grid.placeAtIndex(1, this.Mylevel);
        this.Myname = this.add.text(0, 0, this.player.username, { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(16 * window.devicePixelRatio)}px`, fill: 'black'}).setOrigin(0.6, 0.25);
        this.grid.placeAtIndex(3, this.Myname);
        this.navPP = this.addImage(0, 0, 'overview:navPP').setOrigin(0.8, 0.43);
        this.grid.placeAtIndex(9, this.navPP);
        this.MyPP = this.add.text(0, 0, this.player.powerpoints, { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(16 * window.devicePixelRatio)}px`, fill: 'black'}).setOrigin(1.4, 0.25);
        this.grid.placeAtIndex(9, this.MyPP);
        this.navM_Dollars = this.addImage(0, 0, 'overview:navM_Dollars').setOrigin(0.7, 0.4);
        this.grid.placeAtIndex(13, this.navM_Dollars);
        this.MyM_dollars = this.add.text(0, 0, this.player.morfos, { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(16 * window.devicePixelRatio)}px`, fill: 'black'}).setOrigin(0.5, 0.25);
        this.grid.placeAtIndex(12, this.MyM_dollars);

        this.bgOverlay = this.addImage(0, 0, 'shop:bg').setOrigin(0.5, 0);
        this.grid.placeAtIndex(22, this.bgOverlay);
        this.grid.scaleTo(this.bgOverlay, 1);

        this.nav = this.addImage(0, 0, 'shop:nav').setOrigin(0.5, .205);
        this.grid.placeAtIndex(22, this.nav);
        this.grid.scaleTo(this.nav, 1);

        this.title = this.add.text(0, 0, 'Rugzak', { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(38 * window.devicePixelRatio)}px`, fill: '#2E3A4B', stroke: '#fff', strokeThickness: 8,}).setOrigin(0.5, 0.4);
        this.grid.placeAtIndex(52, this.title);

        this.invContainer = this.addElement(0, 0, 'div').setClassName('invContainer').setOrigin(.5, 1.05);
        this.grid.placeAtIndex(202, this.invContainer);

        this.home = this.addImage(0, 0, 'shop:home').setOrigin(.5, 0.1).setInteractive();
        this.home.on('pointerdown', () => {
            this.scene.stop('InventoryScene');
        });
        this.grid.placeAtIndex(202, this.home);
        this.grid.scaleTo(this.home, .13);

        this._invContainer = this.invContainer.node;
        for(let i = 0; i < _ITEMS.length; i++) {
            this.invItem = document.createElement('div');
            this.invItem.className = 'invItem';
            this.invItem.setAttribute('data-name', _ITEMS[i].name);
            this.invItemImage = document.createElement('div');
            this.invItemImage.style.backgroundImage = "url('" + _ITEMS[i].asset + "')";
            this.invItem.appendChild(this.invItemImage);
            this._invContainer.appendChild(this.invItem);
        }

        this.invContainer.setScale(0);
        this.tweens.add({
            targets: [
                this.invContainer,
             ],
            scaleX: 1 * window.devicePixelRatio,
            scaleY: 1 * window.devicePixelRatio,
            ease: 'Circ',
            duration: 300,
            repeat: 0,
            yoyo: false
        });


        //this.grid.showNumbers();
    }
}

export default DetailedItemView;