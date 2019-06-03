import AlignGrid from '../classes/AlignGrid';
import Player from '../classes/Player';
import _Shop from '../classes/Shop';

import { _ITEMS } from '../_ITEMS';

import { addImage, addElement, addRectangle, withDPI } from '../helpers';

class Shop extends Phaser.Scene {
    constructor() {
        super({
            key: 'ShopScene'
        });

        this.addImage = addImage.bind(this);
        this.addElement = addElement.bind(this);
        this.addRectangle = addRectangle.bind(this);

        this._player = new Player();
        this._shop = new _Shop();
    }

    preload() {
        this.player = this._player.get();
        this.shopPage = 'shirt';
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

        this.navHair = this.add.image(0, 0, 'shop:hair').setScale(withDPI(0.2), withDPI(0.2)).setOrigin(.8, 0).setInteractive();
        this.grid.placeAtIndex(18, this.navHair);
        this.navHair.on('pointerdown', () => {
            this.shopPage = 'hair';
        });

        this.navShirt = this.add.image(0, 0, 'shop:shirt').setScale(withDPI(0.2), withDPI(0.2)).setOrigin(.65, 0).setInteractive();
        this.grid.placeAtIndex(20, this.navShirt);
        this.navShirt.on('pointerdown', () => {
            this.shopPage = 'shirt';
        });

        this.navPants = this.add.image(0, 0, 'shop:pants').setScale(withDPI(0.2), withDPI(0.2)).setOrigin(.5, 0).setInteractive();
        this.grid.placeAtIndex(22, this.navPants);
        this.navPants.on('pointerdown', () => {
            this.shopPage = 'pants';
        });

        this.navShoes = this.add.image(0, 0, 'shop:shoes').setScale(withDPI(0.2), withDPI(0.2)).setOrigin(.30, 0).setInteractive();
        this.grid.placeAtIndex(24, this.navShoes);
        this.navShoes.on('pointerdown', () => {
            this.shopPage = 'shoes';
        });

        this.navFood = this.add.image(0, 0, 'shop:food').setScale(withDPI(0.2), withDPI(0.2)).setOrigin(.1, 0).setInteractive();
        this.grid.placeAtIndex(26, this.navFood);
        this.navFood.on('pointerdown', () => {
            this.shopPage = 'food';
        });

        this.title = this.add.text(0, 0, 'Markt', { fontFamily: 'Bubblegum Sans', fontSize: `${Math.round(38 * window.devicePixelRatio)}px`, fill: '#2E3A4B', stroke: '#fff', strokeThickness: 8,}).setOrigin(0.5, 0.4);
        this.grid.placeAtIndex(52, this.title);

        this.shopContainer = this.addElement(0, 0, 'div').setClassName('shopContainer').setOrigin(.5, 1.05);
        this.grid.placeAtIndex(202, this.shopContainer);

        this.home = this.addImage(0, 0, 'shop:home').setOrigin(.5, 0.1).setInteractive();
        this.home.on('pointerdown', () => {
            this.scene.stop('ShopScene');
        });
        this.grid.placeAtIndex(202, this.home);
        this.grid.scaleTo(this.home, .13);

        this._shopContainer = this.shopContainer.node;
        for(let i = 0; i < _ITEMS.length; i++) {
            this.shopItem = document.createElement('div');
            this.shopItem.className = 'shopItem';
            this.shopItem.setAttribute('data-name', _ITEMS[i].name);
            this.shopItem.setAttribute('data-price', _ITEMS[i].price);
            this.shopItemImage = document.createElement('div');
            this.shopItemImage.setAttribute('data-level', _ITEMS[i].requiredLevel);
            this.shopItem.appendChild(this.shopItemImage);

            if (this._player.getLevel() >= _ITEMS[i].requiredLevel) {
                this.shopItemImage.style.backgroundImage = "url('" + _ITEMS[i].asset + "')";
                this.shopItemButton = document.createElement('button');
                this.shopItemButton.setAttribute('data-id', _ITEMS[i].id);
                this.shopItemButton.setAttribute('data-level', _ITEMS[i].requiredLevel);
                this.shopItemButton.addEventListener('click', () => {
                    if(this._shop.buyItem(_ITEMS[i].id, _ITEMS[i].price)) {
                        alert('Gelukt, het is nu van jou!');
                    } else {
                        alert('Oeps, je hebt niet genoeg geld');
                    }
                }, false);
                this.shopItem.appendChild(this.shopItemButton);
            } else {
                this.shopItemImage.className = "locked";
                this.shopItemImage.style.backgroundImage = `url(${require('../assets/item-states/locked-overlay.png')
            }), url('` + _ITEMS[i].asset + "')";
            }

            this._shopContainer.appendChild(this.shopItem);
        }

        this.shopContainer.setScale(0);
        this.tweens.add({
            targets: [
                this.shopContainer,
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

    update() {
        switch(this.shopPage) {
            case 'hair':
                this.resetPage();
                this.navHair.setTexture('shop:hairActive');
                break;
            case 'shirt':
                this.resetPage();
                this.navShirt.setTexture('shop:shirtActive');
                break;
            case 'pants':
                this.resetPage();
                this.navPants.setTexture('shop:pantsActive');
                break;
            case 'shoes':
                this.resetPage();
                this.navShoes.setTexture('shop:shoesActive');
                break;
            case 'food':
                this.resetPage();
                this.navFood.setTexture('shop:foodActive');
                break;
        }
    }

    resetPage() {
        this.navHair.setTexture('shop:hair');
        this.navShirt.setTexture('shop:shirt');
        this.navPants.setTexture('shop:pants');
        this.navShoes.setTexture('shop:shoes');
        this.navFood.setTexture('shop:food');
    }
}

export default Shop;
