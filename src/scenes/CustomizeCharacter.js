import Player from '../classes/Player';
import AlignGrid from '../classes/AlignGrid';

import { addImage, addElement, withDPI } from '../helpers';

class CustomizeCharacterScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'CustomizeCharacter'
        });

        this.scene;

        this.background_cloud;

        this.morfitWalking;
        this.XPbar;
        this.BottomNavbar;
        this.ground2;
        this.ground3;
        this.HomePlant;
        this.HomePlant2;
        this.nav;
        this.settings;
        this.friends;
        this.gym;
        this.games;
        this.feed;
        this.inventory;
        this.quiz;

        this.whiteBg;

        this.MentalBar;
        this.EnergyBar;
        this.PowerBar;

        this.IconMental;
        this.IconEnergy;
        this.IconPower;

        this._player = new Player();
        this.player = {};


        this.dailyQuestion = {};
        this.addImage = addImage.bind(this);
        this.addElement = addElement.bind(this);

        this.scaleRatio = window.devicePixelRatio / 3;
    }

    preload() {
        this.player = this._player.get();
    }

    create() {
        console.log(this.player);

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

        this.itemSlotOne = this.add.image(withDPI(123), withDPI(361), 'CharacterCustomize:inventory_item_active')
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))
            .setInteractive()

        this.itemSlotOneInfo = this.add.image(withDPI(180), withDPI(422), 'CharacterCustomize:button_info')
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))
            .setInteractive()

        this.itemSlotTwo = this.add.image(withDPI(247), withDPI(361), 'CharacterCustomize:inventory_item_normal')
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))
            .setInteractive()

        this.itemSlotTwoInfo = this.add.image(withDPI(304), withDPI(422), 'CharacterCustomize:button_info')
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))
            .setInteractive()

        this.itemSlotThree = this.add.image(withDPI(123), withDPI(486), 'CharacterCustomize:inventory_item_normal')
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))
            .setInteractive()

        this.itemSlotThreeInfo = this.add.image(withDPI(180), withDPI(547), 'CharacterCustomize:button_info')
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))
            .setInteractive()

        this.itemSlothFour = this.add.image(withDPI(247), withDPI(486), 'CharacterCustomize:inventory_item_normal')
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))
            .setInteractive()

        this.itemSlotFourInfo = this.add.image(withDPI(304), withDPI(547), 'CharacterCustomize:button_info')
            .setOrigin(0, 0)
            .setScale(withDPI(0.2), withDPI(0.2))
            .setInteractive()

        // this.grid.showNumbers();
    }

    update() {
        // this.Mylevel.text = this._player.getLevel();
    }
}

export default CustomizeCharacterScene;
