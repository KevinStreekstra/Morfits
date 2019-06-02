export function pop_up_modal() {
    // Elements
    this.load.image(
        'popup:food_list',
        require('../assets/popup/good-bad-food.png')
    )

    // Backgrounds
    this.load.image(
        'popup:background',
        require('../assets/popup/backgrounds/background-small.png')
    )

    this.load.image(
        'popup:background_big',
        require('../assets/popup/backgrounds/background-big.png')
    )

    // Buttons
    this.load.image(
        'popup:begin_spel',
        require('../assets/popup/buttons/btn_start.png')
    )

    this.load.image(
        'popup:button',
        require('../assets/popup/buttons/btn_claim.png')
    )
}
