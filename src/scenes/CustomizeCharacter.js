import Phaser from 'phaser'
import SwipeListener from 'swipe-listener'

import Player from '../classes/Player'
import AlignGrid from '../classes/AlignGrid'

import { addImage, addElement, withDPI } from '../helpers'

// Data
import { INVENTORY } from '../data/inventory'

let firstOfPage = 0
let activeIds = {
    SHIRT: 'dfb25653-0196-4458-80f1-dd83a1cfb147',
    PANTS: '155efda5-e3ed-4bcb-b614-5f33c2e17f2b'
}
let activeCategory = 'SHIRT'

const pantsInventory = INVENTORY.filter(inventoryItem => {
    return inventoryItem.category === 'PANTS'
})
const shirtsInventory = INVENTORY.filter(inventoryItem => {
    return inventoryItem.category === 'SHIRT'
})

const inventoryCats = {
    PANTS: pantsInventory,
    SHIRT: shirtsInventory
}

const maxPage = inventoryCats[activeCategory].length

class CustomizeCharacterScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'CustomizeCharacter'
        })

        this.player
        this.itemSlotOne
        this.itemSlotOneImage
        this.itemSlotOneInfo
        this.itemSlotTwo
        this.itemSlotTwoImage
        this.itemSlotTwoInfo
        this.itemSlotThree
        this.itemSlotThreeImage
        this.itemSlotThreeInfo
        this.itemSlotFour
        this.itemSlotFourImage
        this.itemSlotFourInfo
        this.updateAssets = this.updateAssets.bind(this)
        this.addImage = addImage.bind(this)

        this._player = new Player()
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

        this.TopNavbar = this
            .addImage(0, 0, 'overview:BottomNavbar')
            .setDepth(1)
        this.grid.placeAtIndex(7, this.TopNavbar)

        this.whiteBg = this
            .addImage(0, 0, 'overview:whiteBG')
            .setOrigin(
                0.55,
                0.45
            )
            .setDepth(1)

        this.grid.placeAtIndex(3, this.whiteBg)

        this.Mylevel = this.add
            .text(0, 0, this._player.getLevel(), {
                fontFamily: 'Bubblegum Sans',
                fontSize: `${Math.round(16 * window.devicePixelRatio)}px`,
                fill: 'black'
            })
            .setOrigin(1, 0.25)
            .setDepth(1)

        this.grid.placeAtIndex(1, this.Mylevel)

        this.Myname = this.add
            .text(0, 0, this.player.username, {
                fontFamily: 'Bubblegum Sans',
                fontSize: `${Math.round(16 * window.devicePixelRatio)}px`,
                fill: 'black'
            })
            .setOrigin(0.6, 0.25)
            .setDepth(1)

        this.grid.placeAtIndex(3, this.Myname)

        this.navPP = this
            .addImage(0, 0, 'overview:navPP')
            .setOrigin(0.8, 0.43)
            .setDepth(1)

        this.grid.placeAtIndex(9, this.navPP)

        this.MyPP = this.add
            .text(0, 0, this.player.powerpoints, {
                fontFamily: 'Bubblegum Sans',
                fontSize: `${Math.round(16 * window.devicePixelRatio)}px`,
                fill: 'black'
            })
            .setOrigin(1.4, 0.25)
            .setDepth(1)

        this.grid.placeAtIndex(9, this.MyPP)

        this.navM_Dollars = this
            .addImage(0, 0, 'overview:navM_Dollars')
            .setOrigin(0.7, 0.4)
            .setDepth(1)

        this.grid.placeAtIndex(13, this.navM_Dollars)

        this.MyM_dollars = this.add
            .text(0, 0, this.player.morfos, {
                fontFamily: 'Bubblegum Sans',
                fontSize: `${Math.round(16 * window.devicePixelRatio)}px`,
                fill: 'black'
            })
            .setOrigin(0.5, 0.25)
            .setDepth(1)

        this.grid.placeAtIndex(12, this.MyM_dollars)

        this.background = this.add
            .image(withDPI(-102), withDPI(399), 'CharacterCustomize:background')
            .setOrigin(0, 1)
            .setDisplaySize(withDPI(642), withDPI(361))

        this.terrain = this.add
            .image(0, withDPI(425), 'CharacterCustomize:terrain')
            .setOrigin(0, 1)
            .setDisplaySize(withDPI(478), withDPI(135))

        this.morfit = this.add
            .image(withDPI(187), withDPI(334), 'Character:full')
            .setScale(withDPI(0.2), withDPI(0.2))
            .setOrigin(0.5, 1)

        this.inventoryBackground = this.add
            .image(0, withDPI(340), 'CharacterCustomize:inventory_background')
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))

        this.add
            .image(0, withDPI(340), 'CharacterCustomize:navigation_background')
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))

        this.hatsButton = this.add
            .image(withDPI(16), withDPI(361), 'CharacterCustomize:button_hat')
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))
            .setInteractive()

        this.shirtButton = this.add
            .image(
                withDPI(16),
                withDPI(425),
                'CharacterCustomize:button_shirt_active'
            )
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))
            .setInteractive()

        this.pantsButton = this.add
            .image(withDPI(16), withDPI(489), 'CharacterCustomize:button_pants')
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))
            .setInteractive()

        this.shoesButton = this.add
            .image(withDPI(16), withDPI(553), 'CharacterCustomize:button_shoes')
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))
            .setInteractive()

        this.shirtButton.on('pointerdown', () => {
            activeCategory = 'SHIRT'
            firstOfPage = 0
            this.shirtButton.setTexture(
                'CharacterCustomize:button_shirt_active'
            )
            this.pantsButton.setTexture('CharacterCustomize:button_pants')
            this.hatsButton.setTexture('CharacterCustomize:button_hat')
            this.shoesButton.setTexture('CharacterCustomize:button_shoes')
            this.updateAssets(firstOfPage)
        })

        this.pantsButton.on('pointerdown', () => {
            activeCategory = 'PANTS'
            firstOfPage = 0
            this.pantsButton.setTexture(
                'CharacterCustomize:button_pants_active'
            )
            this.shirtButton.setTexture('CharacterCustomize:button_shirt')
            this.hatsButton.setTexture('CharacterCustomize:button_hat')
            this.shoesButton.setTexture('CharacterCustomize:button_shoes')
            this.updateAssets(firstOfPage)
        })

        this.itemSlotOne = this.add
            .image(
                withDPI(123),
                withDPI(361),
                'CharacterCustomize:inventory_item_normal'
            )
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))
            .setInteractive()

        this.itemSlotOneInfo = this.add
            .image(withDPI(180), withDPI(422), 'CharacterCustomize:button_info')
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))
            .setInteractive({
                pixelPerfect: true,
                alphaTolerance: 50
            })
            .setDepth(2)

        this.itemSlotOneImage = this.add
            .image(withDPI(173), withDPI(411), 'Character:shirt_long_blank')
            .setOrigin(0.5, 0.5)
            .setScale(withDPI(0.1), withDPI(0.1))

        this.itemSlotTwo = this.add
            .image(
                withDPI(247),
                withDPI(361),
                'CharacterCustomize:inventory_item_normal'
            )
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))
            .setInteractive()

        this.itemSlotTwoInfo = this.add
            .image(withDPI(304), withDPI(422), 'CharacterCustomize:button_info')
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))
            .setInteractive({
                pixelPerfect: true,
                alphaTolerance: 50
            })
            .setDepth(2)

        this.itemSlotTwoImage = this.add
            .image(withDPI(297), withDPI(411), 'Character:shirt_long_blank')
            .setOrigin(0.5, 0.5)
            .setScale(withDPI(0.1), withDPI(0.1))

        this.itemSlotThree = this.add
            .image(
                withDPI(123),
                withDPI(486),
                'CharacterCustomize:inventory_item_normal'
            )
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))
            .setInteractive()

        this.itemSlotThreeInfo = this.add
            .image(withDPI(180), withDPI(547), 'CharacterCustomize:button_info')
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))
            .setInteractive({
                pixelPerfect: true,
                alphaTolerance: 50
            })
            .setDepth(2)

        this.itemSlotThreeImage = this.add
            .image(withDPI(173), withDPI(536), 'Character:shirt_long_blank')
            .setOrigin(0.5, 0.5)
            .setScale(withDPI(0.1), withDPI(0.1))

        this.itemSlotFour = this.add
            .image(
                withDPI(247),
                withDPI(486),
                'CharacterCustomize:inventory_item_normal'
            )
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))
            .setInteractive()

        this.itemSlotFourInfo = this.add
            .image(withDPI(304), withDPI(547), 'CharacterCustomize:button_info')
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))
            .setInteractive({
                pixelPerfect: true,
                alphaTolerance: 50
            })
            .setDepth(2)

        this.itemSlotFourImage = this.add
            .image(withDPI(297), withDPI(536), 'Character:shirt_long_blank')
            .setOrigin(0.5, 0.5)
            .setScale(withDPI(0.1), withDPI(0.1))

        this.homeButton = this.add
            .image(
                withDPI(235),
                withDPI(window.innerHeight - 8),
                'Snake:home_button'
            )
            .setScale(withDPI(0.2), withDPI(0.2))
            .setOrigin(0.5, 1)
            .setDepth(8)
            .setInteractive({
                pixelPerfect: true,
                alphaTolerance: 50
            })

        this.homeButton.on('pointerdown', () => {
            this.scene.start('OverviewScene')
            this.scene.stop('CustomizeCharacter')
        })

        this.updateAssets(firstOfPage)

        this.itemSlotOne.on('pointerdown', () => {
            activeIds[activeCategory] = this.itemSlotOne.getData('itemId')
            this.updateAssets(firstOfPage)
        })

        this.itemSlotTwo.on('pointerdown', () => {
            activeIds[activeCategory] = this.itemSlotTwo.getData('itemId')
            this.updateAssets(firstOfPage)
        })
        this.itemSlotThree.on('pointerdown', () => {
            activeIds[activeCategory] = this.itemSlotThree.getData('itemId')
            this.updateAssets(firstOfPage)
        })
        this.itemSlotFour.on('pointerdown', () => {
            activeIds[activeCategory] = this.itemSlotFour.getData('itemId')
            this.updateAssets(firstOfPage)
        })

        const SwipeArea = document.createElement('div')
        SwipeArea.style = `
            position: absolute;
            top: 340px;
            left: 0px;
            height: ${withDPI(window.innerHeight - 340)}px;
            width: 100%;
        `
        SwipeArea.id = 'swipe-area__kleding'

        const domElement = this.add.dom(0, 340, SwipeArea).setOrigin(0, 0)
        const listener = SwipeListener(SwipeArea)

        SwipeArea.addEventListener('swipe', ev => {
            const directions = ev.detail.directions

            if (directions.left) {
                if (firstOfPage + 4 < maxPage) {
                    firstOfPage += 4
                    this.updateAssets(firstOfPage)
                    this.tweens.add({
                        targets: [
                            this.itemSlotOneImage,
                            this.itemSlotTwoImage,
                            this.itemSlotThreeImage,
                            this.itemSlotFourImage
                        ],
                        scaleX: 0.06 * window.devicePixelRatio,
                        scaleY: 0.06 * window.devicePixelRatio,
                        ease: 'Circ',
                        duration: 200,
                        repeat: 0,
                        yoyo: true
                    })
                }
            } else if (directions.right) {
                if (firstOfPage - 4 >= 0) {
                    firstOfPage -= 4
                    this.updateAssets(firstOfPage)
                    this.tweens.add({
                        targets: [
                            this.itemSlotOneImage,
                            this.itemSlotTwoImage,
                            this.itemSlotThreeImage,
                            this.itemSlotFourImage
                        ],
                        scaleX: 0.06 * window.devicePixelRatio,
                        scaleY: 0.06 * window.devicePixelRatio,
                        ease: 'Circ',
                        duration: 200,
                        repeat: 0,
                        yoyo: true
                    })
                }
            }
        })
    }

    /**
     * @description Updates the shirts to show in the inventory.
     * @param {number} firstItemOfPage - The first item on the page.
     */
    updateAssets(firstItemOfPage) {
        this.itemSlotOne.setData(
            'itemId',
            inventoryCats[activeCategory][firstItemOfPage].id
        )
        this.itemSlotOneImage
            .setTexture(
                inventoryCats[activeCategory][firstItemOfPage].textureKey
            )
            .setScale(
                withDPI(inventoryCats[activeCategory][firstItemOfPage].scale),
                withDPI(inventoryCats[activeCategory][firstItemOfPage].scale)
            )

        this.checkIfAndShowActive(firstItemOfPage, this.itemSlotOne)

        if (inventoryCats[activeCategory][firstItemOfPage + 1] !== undefined) {
            this.setItemVisible(
                this.itemSlotTwo,
                this.itemSlotTwoImage,
                this.itemSlotTwoInfo,
                true
            )

            this.itemSlotTwo.setData(
                'itemId',
                inventoryCats[activeCategory][firstItemOfPage + 1].id
            )

            this.itemSlotTwoImage
                .setTexture(
                    inventoryCats[activeCategory][firstItemOfPage + 1]
                        .textureKey
                )
                .setScale(
                    withDPI(
                        inventoryCats[activeCategory][firstItemOfPage + 1].scale
                    ),
                    withDPI(
                        inventoryCats[activeCategory][firstItemOfPage + 1].scale
                    )
                )

            this.checkIfAndShowActive(firstItemOfPage + 1, this.itemSlotTwo)
        } else {
            this.setItemVisible(
                this.itemSlotTwo,
                this.itemSlotTwoImage,
                this.itemSlotTwoInfo,
                false
            )
        }

        if (inventoryCats[activeCategory][firstItemOfPage + 2] !== undefined) {
            this.setItemVisible(
                this.itemSlotThree,
                this.itemSlotThreeImage,
                this.itemSlotThreeInfo,
                true
            )

            this.itemSlotThree.setData(
                'itemId',
                inventoryCats[activeCategory][firstItemOfPage + 2].id
            )

            this.itemSlotThreeImage
                .setTexture(
                    inventoryCats[activeCategory][firstItemOfPage + 2]
                        .textureKey
                )
                .setScale(
                    withDPI(
                        inventoryCats[activeCategory][firstItemOfPage + 2].scale
                    ),
                    withDPI(
                        inventoryCats[activeCategory][firstItemOfPage + 2].scale
                    )
                )

            this.checkIfAndShowActive(firstItemOfPage + 2, this.itemSlotThree)
        } else {
            this.setItemVisible(
                this.itemSlotThree,
                this.itemSlotThreeImage,
                this.itemSlotThreeInfo,
                false
            )
        }

        if (inventoryCats[activeCategory][firstItemOfPage + 3] !== undefined) {
            this.setItemVisible(
                this.itemSlotFour,
                this.itemSlotFourImage,
                this.itemSlotFourInfo,
                true
            )

            this.itemSlotFour.setData(
                'itemId',
                inventoryCats[activeCategory][firstItemOfPage + 3].id
            )

            this.itemSlotFourImage
                .setTexture(
                    inventoryCats[activeCategory][firstItemOfPage + 3]
                        .textureKey
                )
                .setScale(
                    withDPI(
                        inventoryCats[activeCategory][firstItemOfPage + 3].scale
                    ),
                    withDPI(
                        inventoryCats[activeCategory][firstItemOfPage + 3].scale
                    )
                )

            this.checkIfAndShowActive(firstItemOfPage + 3, this.itemSlotFour)
        } else {
            this.setItemVisible(
                this.itemSlotFour,
                this.itemSlotFourImage,
                this.itemSlotFourInfo,
                false
            )
        }
    }

    /**
     * @description Make a item slot invisible.
     * @param {Phaser.GameObjects.Image} itemSlot
     * @param {Phaser.GameObjects.Image} infoIcon
     * @param {Phaser.GameObjects.Image} image
     * @param {boolean} isVisible
     */
    setItemVisible(itemSlot, infoIcon, image, isVisible) {
        try {
            itemSlot.setVisible(isVisible)
            infoIcon.setVisible(isVisible)
            image.setVisible(isVisible)
        } catch (err) {
            Sentry.captureException(err)
            console.error(err)
        }
    }

    /**
     * @description Check if the slot should be active and updates the background texture.
     * @param {Phaser.GameObjects.Image} itemSlot - the background of the slot.
     *
     * @fires setTexture
     */
    checkIfAndShowActive(index, itemSlot) {
        if (
            inventoryCats[activeCategory][index].id ===
            activeIds[activeCategory]
        ) {
            itemSlot.setTexture('CharacterCustomize:inventory_item_active')
        } else {
            itemSlot.setTexture('CharacterCustomize:inventory_item_normal')
        }
    }

    update() {
        // this.Mylevel.text = this._player.getLevel();
    }
}

export default CustomizeCharacterScene
