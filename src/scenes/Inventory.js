import AlignGrid from '../classes/AlignGrid';
import Player from '../classes/Player';

import { _ITEMS } from '../_ITEMS';

import { addImage, addElement, addRectangle, withDPI } from '../helpers';

class Inventory extends Phaser.Scene {
    constructor() {
        super({
            key: 'InventoryScene'
        });

        this.addImage = addImage.bind(this);
        this.addElement = addElement.bind(this);
        this.addRectangle = addRectangle.bind(this);

        this._player = new Player();
    }

    preload() {
        this.player = this._player.get();
        this.items = [];
        this.invPage = 'shirt';
    }

    create() {
        this.grid = new AlignGrid({
            scene: this,
            rows: 15,
            cols: 15,
            width: this.sys.game.config.width,
            height: this.sys.game.config.height
        });

        Object.entries(_ITEMS).forEach(entry => {
            let item_id = entry[0];
            for(let i = 0; i < this.player.inventory.length; i++) {
                if (this.player.inventory[i].id == item_id) {
                    this.items.push(entry[1]);
                }
            }
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
            this.invPage = 'hair';
        });

        this.navShirt = this.add.image(0, 0, 'shop:shirt').setScale(withDPI(0.2), withDPI(0.2)).setOrigin(.65, 0).setInteractive();
        this.grid.placeAtIndex(20, this.navShirt);
        this.navShirt.on('pointerdown', () => {
            this.invPage = 'shirt';
        });

        this.navPants = this.add.image(0, 0, 'shop:pants').setScale(withDPI(0.2), withDPI(0.2)).setOrigin(.5, 0).setInteractive();
        this.grid.placeAtIndex(22, this.navPants);
        this.navPants.on('pointerdown', () => {
            this.invPage = 'pants';
        });

        this.navShoes = this.add.image(0, 0, 'shop:shoes').setScale(withDPI(0.2), withDPI(0.2)).setOrigin(.30, 0).setInteractive();
        this.grid.placeAtIndex(24, this.navShoes);
        this.navShoes.on('pointerdown', () => {
            this.invPage = 'shoes';
        });

        this.navFood = this.add.image(0, 0, 'shop:food').setScale(withDPI(0.2), withDPI(0.2)).setOrigin(.1, 0).setInteractive();
        this.grid.placeAtIndex(26, this.navFood);
        this.navFood.on('pointerdown', () => {
            this.invPage = 'food';
        });

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
        if(this.items.length > 0) {
            for(let i = 0; i < this.items.length; i++) {
                this.invItem = document.createElement('div');
                this.invItem.className = 'invItem';
                this.invItem.setAttribute('data-name', this.items[i].name);
                this.invItem.setAttribute('data-category', this.items[i].category);
                this.invItemImage = document.createElement('div');
                this.invItemImage.style.backgroundImage = "url('" + this.items[i].asset + "')";
                this.invItem.appendChild(this.invItemImage);
                this._invContainer.appendChild(this.invItem);
            }
        }

        this.noItems = document.createElement('h2');
        this.noItems.className = 'no-items';
        this.noItems.innerHTML = 'Je hebt dit niet in je rugzak &#9785';
        this._invContainer.appendChild(this.noItems);

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

    update() {
        switch(this.invPage) {
            case 'hair':
                this.resetPage();
                this.navHair.setTexture('shop:hairActive');
                this.isEmpty('hair');
                this.displayItemsByQuery("[data-category='hair']");
                break;
            case 'shirt':
                this.resetPage();
                this.navShirt.setTexture('shop:shirtActive');
                this.isEmpty('shirt');
                this.displayItemsByQuery("[data-category='shirt']");
                break;
            case 'pants':
                this.resetPage();
                this.navPants.setTexture('shop:pantsActive');
                this.isEmpty('pants');
                this.displayItemsByQuery("[data-category='pants']");
                break;
            case 'shoes':
                this.resetPage();
                this.navShoes.setTexture('shop:shoesActive');
                this.isEmpty('shoes');
                this.displayItemsByQuery("[data-category='shoes']");
                break;
            case 'food':
                this.resetPage();
                this.navFood.setTexture('shop:foodActive');
                this.isEmpty('food');
                this.displayItemsByQuery("[data-category='food']");
                break;
        }
    }

    resetPage() {
        this.navHair.setTexture('shop:hair');
        this.navShirt.setTexture('shop:shirt');
        this.navPants.setTexture('shop:pants');
        this.navShoes.setTexture('shop:shoes');
        this.navFood.setTexture('shop:food');
        this.hideItemsByQuery('.invItem');
        this.noItems.style.display = 'none';
    }

    isEmpty(page) {
        if(this.items.filter(key => Object.values(key).includes(page)).length < 1) {
            this.noItems.style.display = 'block';
        }
    }

    displayItemsByQuery(query) {
        Array.from(document.querySelectorAll(query))
            .forEach(function(el) {
                el.style.display = 'inline-block';
        });
    }

    hideItemsByQuery(query) {
        Array.from(document.querySelectorAll(query))
            .forEach(function(el) {
                el.style.display = 'none';
        });
    }
}

export default Inventory;