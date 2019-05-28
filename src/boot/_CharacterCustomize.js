export function characterCustomize_assets () {
    this.load.image('CharacterCustomize:background', require('../assets/character_customize/background_terrain.png'))
    this.load.image('CharacterCustomize:terrain', require('../assets/character_customize/foreground_terrain_blue.png'))

    // Navigation buttons
    this.load.image('CharacterCustomize:button_hat', require('../assets/character_customize/button_hat.png'))
    this.load.image('CharacterCustomize:button_pants', require('../assets/character_customize/button_pants.png'))
    this.load.image('CharacterCustomize:button_shirt', require('../assets/character_customize/button_shirt.png'))
    this.load.image('CharacterCustomize:button_shoes', require('../assets/character_customize/button_shoes.png'))

    this.load.image('CharacterCustomize:navigation_background', require('../assets/character_customize/navigation_background.png'))
    this.load.image('CharacterCustomize:inventory_background', require('../assets/character_customize/inventory_background.png'))

    this.load.image('CharacterCustomize:inventory_item_active', require('../assets/character_customize/inventory_item_active.png'))
    this.load.image('CharacterCustomize:inventory_item_normal', require('../assets/character_customize/inventory_item_normal.png'))
    this.load.image('CharacterCustomize:button_info', require('../assets/character_customize/button_info.png'))
    // this.load.image('CharacterCustomize:', require('../assets/character_customize/'))
}
