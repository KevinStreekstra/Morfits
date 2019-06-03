export function characterCustomize_assets() {
    this.load.image(
        'CharacterCustomize:background',
        require('../assets/character_customize/backgrounds/background_terrain.png')
    )
    this.load.image(
        'CharacterCustomize:terrain',
        require('../assets/character_customize/backgrounds/foreground_terrain_blue.png')
    )

    // Navigation buttons
    this.load.image(
        'CharacterCustomize:button_hat',
        require('../assets/character_customize/buttons/btn_hat.png')
    )
    this.load.image(
        'CharacterCustomize:button_pants',
        require('../assets/character_customize/buttons/btn_pants.png')
    )
    this.load.image(
        'CharacterCustomize:button_shirt',
        require('../assets/character_customize/buttons/btn_shirt.png')
    )
    this.load.image(
        'CharacterCustomize:button_shoes',
        require('../assets/character_customize/buttons/btn_shoes.png')
    )

    // Active navigation buttons
    this.load.image(
        'CharacterCustomize:button_hat_active',
        require('../assets/character_customize/buttons/btn_hat_active.png')
    )
    this.load.image(
        'CharacterCustomize:button_pants_active',
        require('../assets/character_customize/buttons/btn_pants_active.png')
    )
    this.load.image(
        'CharacterCustomize:button_shirt_active',
        require('../assets/character_customize/buttons/btn_shirt_active.png')
    )
    this.load.image(
        'CharacterCustomize:button_shoes_active',
        require('../assets/character_customize/buttons/btn_shoes_active.png')
    )

    this.load.image(
        'CharacterCustomize:navigation_background',
        require('../assets/character_customize/backgrounds/navigation_background.png')
    )
    this.load.image(
        'CharacterCustomize:inventory_background',
        require('../assets/character_customize/backgrounds/inventory_background.png')
    )

    this.load.image(
        'CharacterCustomize:inventory_item_active',
        require('../assets/character_customize/backgrounds/inventory_item_active.png')
    )
    this.load.image(
        'CharacterCustomize:inventory_item_normal',
        require('../assets/character_customize/backgrounds/inventory_item_normal.png')
    )
    this.load.image(
        'CharacterCustomize:button_info',
        require('../assets/character_customize/buttons/btn_info.png')
    )
    // this.load.image('CharacterCustomize:', require('../assets/character_customize/'))
}
