import AlignGrid from '../classes/AlignGrid'
import Player from '../classes/Player'
import _Shop from '../classes/Shop'

import { _ITEMS } from '../_ITEMS'

import { addImage, addElement, addRectangle, withDPI } from '../helpers'

class Shop extends Phaser.Scene {
    constructor() {
        super({
            key: 'ShopScene'
        })

        this.addImage = addImage.bind(this)
        this.addElement = addElement.bind(this)
        this.addRectangle = addRectangle.bind(this)

        this._player = new Player()
        this._shop = new _Shop()
    }

    preload() {
        this.player = this._player.get()
        this.shopPage = 'shirt'
    }

    create() {
        this.grid = new AlignGrid({
            scene: this,
            rows: 15,
            cols: 15,
            width: this.sys.game.config.width,
            height: this.sys.game.config.height
        })

        this.bg = this.addRectangle(
            0,
            0,
            375,
            this.sys.game.config.height,
            0xffffff
        ).setOrigin(0, 0)

        this.scene.launch('TopNavBar')

        this.bgOverlay = this.addImage(0, 0, 'shop:bg').setOrigin(0.5, 0)
        this.grid.placeAtIndex(22, this.bgOverlay)
        this.grid.scaleY(this.bgOverlay, 1)
        this.grid.scaleX(this.bgOverlay, 1)

        this.nav = this.addImage(0, 0, 'shop:nav').setOrigin(0.5, 0.205)
        this.grid.placeAtIndex(22, this.nav)
        this.grid.scaleTo(this.nav, 1)

        this.navHair = this.add
            .image(0, 0, 'shop:hair')
            .setScale(withDPI(0.2), withDPI(0.2))
            .setOrigin(0.8, 0)
        this.grid.placeAtIndex(18, this.navHair)
        this.navHair.on('pointerdown', () => {
            this.shopPage = 'hair'
        })

        this.navShirt = this.add
            .image(0, 0, 'shop:shirt')
            .setScale(withDPI(0.2), withDPI(0.2))
            .setOrigin(0.65, 0)
        this.grid.placeAtIndex(20, this.navShirt)
        this.shirtHitbox = this.addRectangle(
            0,
            0,
            this.navShirt.displayWidth + 5,
            this.navShirt.displayHeight + 5,
            0xffffff,
            0
        ).setOrigin(0.62, 0.15)
        .setInteractive()
        this.grid.placeAtIndex(20, this.shirtHitbox)
        this.shirtHitbox.on('pointerdown', () => {
            this.shopPage = 'shirt'
        })

        this.navPants = this.add
            .image(0, 0, 'shop:pants')
            .setScale(withDPI(0.2), withDPI(0.2))
            .setOrigin(0.5, 0)
            .setInteractive()
        this.grid.placeAtIndex(22, this.navPants)
        this.pantsHitbox = this.addRectangle(
            0,
            0,
            this.navPants.displayWidth + 5,
            this.navPants.displayHeight + 5,
            0xffffff,
            0
        ).setOrigin(0.5, 0.15)
        .setInteractive()
        this.grid.placeAtIndex(22, this.pantsHitbox)
        this.pantsHitbox.on('pointerdown', () => {
            this.shopPage = 'pants'
        })

        this.navShoes = this.add
            .image(0, 0, 'shop:shoes')
            .setScale(withDPI(0.2), withDPI(0.2))
            .setOrigin(0.3, 0)
        this.grid.placeAtIndex(24, this.navShoes)
        this.navShoes.on('pointerdown', () => {
            this.shopPage = 'shoes'
        })

        this.navFood = this.add
            .image(0, 0, 'shop:food')
            .setScale(withDPI(0.2), withDPI(0.2))
            .setOrigin(0.1, 0)
        this.grid.placeAtIndex(26, this.navFood)
        this.foodHitbox = this.addRectangle(
            0,
            0,
            this.navFood.displayWidth + 5,
            this.navFood.displayHeight + 5,
            0xffffff,
            0
        ).setOrigin(0.2, 0.15)
        .setInteractive()
        this.grid.placeAtIndex(26, this.foodHitbox)
        this.foodHitbox.on('pointerdown', () => {
            this.shopPage = 'food'
        })

        this.title = this.add
            .text(0, 0, 'Markt', {
                fontFamily: 'Bubblegum Sans',
                fontSize: `${Math.round(38 * window.devicePixelRatio)}px`,
                fill: '#2E3A4B',
                stroke: '#fff',
                strokeThickness: 8
            })
            .setOrigin(0.5, 0.4)
        this.grid.placeAtIndex(52, this.title)

        this.shopContainer = this.addElement(0, 0, 'div')
            .setClassName('shopContainer')
            .setOrigin(0.5, 1.05)
        this.grid.placeAtIndex(202, this.shopContainer)

        this._shopContainer = this.shopContainer.node
        for (let i = 0; i < _ITEMS.length; i++) {
            this.shopItem = document.createElement('div')
            this.shopItem.className = 'shopItem'
            this.shopItem.setAttribute('data-name', _ITEMS[i].name)
            this.shopItem.setAttribute('data-category', _ITEMS[i].category)
            this.shopItem.setAttribute('data-price', _ITEMS[i].price)
            this.shopItemImage = document.createElement('div')
            this.shopItemImage.setAttribute(
                'data-level',
                _ITEMS[i].requiredLevel
            )
            this.shopItem.appendChild(this.shopItemImage)

            if (this._player.getLevel() >= _ITEMS[i].requiredLevel) {
                this.shopItemImage.style.backgroundImage =
                    "url('" + _ITEMS[i].asset + "')"
                this.shopItemButton = document.createElement('button')
                this.shopItemButton.setAttribute('data-id', _ITEMS[i].id)
                this.shopItemButton.setAttribute(
                    'data-level',
                    _ITEMS[i].requiredLevel
                )
                this.shopItemButton.addEventListener(
                    'click',
                    () => {
                        if (this._shop.buyItem(_ITEMS[i].id, _ITEMS[i].price)) {
                            alert('Gelukt, het is nu van jou!')
                        } else {
                            alert('Oeps, je hebt niet genoeg geld')
                        }
                    },
                    false
                )
                this.shopItem.appendChild(this.shopItemButton)
            } else {
                this.shopItemImage.className = 'locked'
                this.shopItemImage.style.backgroundImage =
                    `url(${require('../assets/item-states/locked-overlay.png')}), url('` +
                    _ITEMS[i].asset +
                    "')"
                this.shopItemImage.style.backgroundSize = 'cover, auto 70px'
            }

            this._shopContainer.appendChild(this.shopItem)
        }

        this.home = this.addImage(0, 0, 'shop:home')
            .setOrigin(0.5, 0.1)
            .setInteractive()
        this.home.on('pointerdown', () => {
            this.scene.stop('ShopScene')
            this.scene.resume('OverviewScene')
        })
        this.grid.placeAtIndex(202, this.home)
        this.grid.scaleTo(this.home, 0.13)

        this.shopContainer.setScale(0)
        this.tweens.add({
            targets: [this.shopContainer],
            scaleX: 1 * window.devicePixelRatio,
            scaleY: 1 * window.devicePixelRatio,
            ease: 'Circ',
            duration: 300,
            repeat: 0,
            yoyo: false
        })

        //this.grid.showNumbers();
    }

    update() {
        switch (this.shopPage) {
            case 'hair':
                this.resetPage()
                this.navHair.setTexture('shop:hairActive')
                this.displayItemsByQuery("[data-category='hair']")
                break
            case 'shirt':
                this.resetPage()
                this.navShirt.setTexture('shop:shirtActive')
                this.displayItemsByQuery("[data-category='shirt']")
                break
            case 'pants':
                this.resetPage()
                this.navPants.setTexture('shop:pantsActive')
                this.displayItemsByQuery("[data-category='pants']")
                break
            case 'shoes':
                this.resetPage()
                this.navShoes.setTexture('shop:shoesActive')
                this.displayItemsByQuery("[data-category='shoes']")
                break
            case 'food':
                this.resetPage()
                this.navFood.setTexture('shop:foodActive')
                this.displayItemsByQuery("[data-category='food']")
                break
        }
    }

    resetPage() {
        this.navHair.setTexture('shop:hair')
        this.navShirt.setTexture('shop:shirt')
        this.navPants.setTexture('shop:pants')
        this.navShoes.setTexture('shop:shoes')
        this.navFood.setTexture('shop:food')
        this.hideItemsByQuery('.shopItem')
    }

    displayItemsByQuery(query) {
        Array.from(document.querySelectorAll(query)).forEach(function(el) {
            el.style.display = 'inline-block'
        })
    }

    hideItemsByQuery(query) {
        Array.from(document.querySelectorAll(query)).forEach(function(el) {
            el.style.display = 'none'
        })
    }
}

export default Shop
