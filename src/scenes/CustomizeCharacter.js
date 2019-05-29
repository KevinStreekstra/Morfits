import Player from '../classes/Player';
import AlignGrid from '../classes/AlignGrid';

import { addImage, addElement, withDPI } from '../helpers';

// Data
import { INVENTORY } from '../data/inventory';

let firstOfPage = 0
let activeId = 'dfb25653-0196-4458-80f1-dd83a1cfb147'

class CustomizeCharacterScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'CustomizeCharacter'
        });

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
    }

    create() {
        this.grid = new AlignGrid({
            scene: this,
            rows: 30,
            cols: 15,
            width: this.sys.game.config.width,
            height: this.sys.game.config.height
        });

        this.background = this.add.image(withDPI(-102), withDPI(399), 'CharacterCustomize:background')
            .setOrigin(0, 1)
            .setDisplaySize(withDPI(642), withDPI(361));

        this.terrain = this.add.image(0, withDPI(425), 'CharacterCustomize:terrain')
            .setOrigin(0, 1)
            .setDisplaySize(withDPI(478), withDPI(135))

        this.add.image(0, withDPI(340), 'CharacterCustomize:inventory_background')
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))

        this.add.image(0, withDPI(340), 'CharacterCustomize:navigation_background')
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))

        this.add.image(withDPI(16), withDPI(361), 'CharacterCustomize:button_hat')
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))
            .setInteractive()

        this.add.image(withDPI(16), withDPI(425), 'CharacterCustomize:button_shirt')
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))
            .setInteractive()

        this.add.image(withDPI(16), withDPI(489), 'CharacterCustomize:button_pants')
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))
            .setInteractive()

        this.add.image(withDPI(16), withDPI(553), 'CharacterCustomize:button_shoes')
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))
            .setInteractive()

        this.itemSlotOne = this.add.image(withDPI(123), withDPI(361), 'CharacterCustomize:inventory_item_normal')
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))
            .setInteractive()

        this.itemSlotOneInfo = this.add.image(withDPI(180), withDPI(422), 'CharacterCustomize:button_info')
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))
            .setInteractive()
            .setDepth(2)

        this.itemSlotOneImage = this.add
            .image(withDPI(173), withDPI(411), 'Character:shirt_long_blank')
            .setOrigin(0.5, 0.5)
            .setScale(withDPI(0.1), withDPI(0.1))

        this.itemSlotTwo = this.add.image(withDPI(247), withDPI(361), 'CharacterCustomize:inventory_item_normal')
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))
            .setInteractive()

        this.itemSlotTwoInfo = this.add.image(withDPI(304), withDPI(422), 'CharacterCustomize:button_info')
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))
            .setInteractive()
            .setDepth(2)

        this.itemSlotTwoImage = this.add
            .image(withDPI(297), withDPI(411), 'Character:shirt_long_blank')
            .setOrigin(0.5, 0.5)
            .setScale(withDPI(0.1), withDPI(0.1))

        this.itemSlotThree = this.add.image(withDPI(123), withDPI(486), 'CharacterCustomize:inventory_item_normal')
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))
            .setInteractive()

        this.itemSlotThreeInfo = this.add.image(withDPI(180), withDPI(547), 'CharacterCustomize:button_info')
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))
            .setInteractive()
            .setDepth(2)

        this.itemSlotThreeImage = this.add
            .image(withDPI(173), withDPI(536), 'Character:shirt_long_blank')
            .setOrigin(0.5, 0.5)
            .setScale(withDPI(0.1), withDPI(0.1))

        // TODO: Make it so the image either fires the function or gets ignored when clicking.

        this.itemSlotFour = this.add.image(withDPI(247), withDPI(486), 'CharacterCustomize:inventory_item_normal')
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))
            .setInteractive()

        this.itemSlotFourInfo = this.add.image(withDPI(304), withDPI(547), 'CharacterCustomize:button_info')
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))
            .setInteractive()
            .setDepth(2)

        this.itemSlotFourImage = this.add
            .image(withDPI(297), withDPI(536), 'Character:shirt_long_blank')
            .setOrigin(0.5, 0.5)
            .setScale(withDPI(0.1), withDPI(0.1))

        this.updateAssets(firstOfPage)

        this.itemSlotOne.on('pointerdown', () => {
            activeId = this.itemSlotOne.getData('itemId')
            this.updateAssets(firstOfPage)
        })

        this.itemSlotTwo.on('pointerdown', () => {
            console.log(this.itemSlotTwo)
            activeId = this.itemSlotTwo.getData('itemId')
            this.updateAssets(firstOfPage)
        })
        this.itemSlotThree.on('pointerdown', () => {
            activeId = this.itemSlotThree.getData('itemId')
            this.updateAssets(firstOfPage)
        })
        this.itemSlotFour.on('pointerdown', () => {
            activeId = this.itemSlotFour.getData('itemId')
            this.updateAssets(firstOfPage)
        })
    }

    /**
     * @description Updates the shirts to show in the inventory.
     * @param {number} firstItemOfPage - The first item on the page.
     */
    updateAssets(firstItemOfPage) {
        this.itemSlotOne.setData('itemId', INVENTORY[firstItemOfPage].id)
        this.itemSlotOneImage
            .setTexture(INVENTORY[firstItemOfPage].textureKey)

        this.checkIfAndShowActive(firstItemOfPage, this.itemSlotOne)

        if (INVENTORY[firstItemOfPage + 1] !== undefined) {
            this.setItemVisible(
                this.itemSlotTwo,
                this.itemSlotTwoImage,
                this.itemSlotTwoInfo,
                true
            )

            this.itemSlotTwo.setData('itemId', INVENTORY[firstItemOfPage + 1].id)

            this.itemSlotTwoImage
                .setTexture(INVENTORY[firstItemOfPage + 1].textureKey)

            this.checkIfAndShowActive(firstItemOfPage + 1, this.itemSlotTwo)
        } else {
            this.setItemVisible(
                this.itemSlotTwo,
                this.itemSlotTwoImage,
                this.itemSlotTwoInfo,
                false
            )
        }

        if (INVENTORY[firstItemOfPage + 2] !== undefined) {
            this.setItemVisible(
                this.itemSlotThree,
                this.itemSlotThreeImage,
                this.itemSlotThreeInfo,
                true
            )

            this.itemSlotThree.setData('itemId', INVENTORY[firstItemOfPage + 2].id)

            this.itemSlotThreeImage
                .setTexture(INVENTORY[firstItemOfPage + 2].textureKey)

            this.checkIfAndShowActive(firstItemOfPage + 2, this.itemSlotThree)
        } else {
            this.setItemVisible(
                this.itemSlotThree,
                this.itemSlotThreeImage,
                this.itemSlotThreeInfo,
                false
            )
        }

        if (INVENTORY[firstItemOfPage + 3] !== undefined) {
            this.setItemVisible(
                this.itemSlotFour,
                this.itemSlotFourImage,
                this.itemSlotFourInfo,
                true
            )

            this.itemSlotFour.setData('itemId', INVENTORY[firstItemOfPage + 3].id)

            this.itemSlotFourImage
                .setTexture(INVENTORY[firstItemOfPage + 3].textureKey)

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
        if (INVENTORY[index].id === activeId) {
            itemSlot.setTexture('CharacterCustomize:inventory_item_active')
        } else {
            itemSlot.setTexture('CharacterCustomize:inventory_item_normal')
        }
    }

    update() {
        // this.Mylevel.text = this._player.getLevel();
    }
}

export default CustomizeCharacterScene;
