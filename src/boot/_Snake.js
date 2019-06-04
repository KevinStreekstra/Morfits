export function snake_assets() {
    // Snake assets
    this.load.image(
        'Snake:player1_body',
        require('../assets/snake/body/body-part-player-1.svg')
    )
    this.load.image(
        'Snake:player2_body',
        require('../assets/snake/body/body-part-player-2.svg')
    )
    this.load.image('Snake:player1_head', require('../assets/snake/body/head.png'))

    // Board assets
    this.load.image(
        'Snake:board_background',
        require('../assets/snake/board/field.png')
    )
    this.load.image(
        'Snake:background_top',
        require('../assets/snake/ui/background_top.png')
    )
    this.load.image(
        'Snake:background_bottom',
        require('../assets/snake/ui/background_bottom.png')
    )
    this.load.image('Snake:live_icon', require('../assets/snake/ui/heart.png'))
    this.load.image(
        'Snake:modal_background',
        require('../assets/snake/ui/modal-background.png')
    )
    this.load.image(
        'Snake:respawn_button',
        require('../assets/snake/ui/continue.png')
    )
    this.load.image(
        'Snake:close_button',
        require('../assets/snake/ui/close-button.png')
    )

    // End game assets
    this.load.image(
        'Snake:head_player_1',
        require('../assets/snake/ui/end_game/player_head.png')
    )
    this.load.image(
        'Snake:medal_first',
        require('../assets/snake/ui/end_game/medal_first.png')
    )
    this.load.image(
        'Snake:medal_second',
        require('../assets/snake/ui/end_game/medal_second.png')
    )
    this.load.image(
        'Snake:medal_third',
        require('../assets/snake/ui/end_game/medal_third.png')
    )
    this.load.image(
        'Snake:morfit_coin',
        require('../assets/snake/ui/end_game/dollar_icon.png')
    )
    this.load.image(
        'Snake:home_button',
        require('../assets/snake/ui/end_game/home_button.png')
    )

    // Food assets
    this.load.image('Snake:apple', require('../assets/snake/food/apple.png'))
    this.load.image('Snake:pineapple', require('../assets/snake/food/pineapple.png'))
    this.load.image('Snake:hamburger', require('../assets/snake/food/hamburger.png'))
    this.load.image('Snake:lemon', require('../assets/snake/food/lemon.png'))
    this.load.image('Snake:soda', require('../assets/snake/food/soda.png'))

    // Guide assets
    this.load.image(
        'Snake:guide_barricade',
        require('../assets/snake/ui/guide/guide_barricade.png')
    )
    this.load.image(
        'Snake:guide_healthy',
        require('../assets/snake/ui/guide/guide_healthy.png')
    )
    this.load.image(
        'Snake:guide_unhealthy',
        require('../assets/snake/ui/guide/guide_unhealthy.png')
    )
    this.load.image(
        'Snake:guide_hit_other_player',
        require('../assets/snake/ui/guide/guide_hit_other_player.png')
    )
    this.load.image(
        'Snake:guide_hit_wall',
        require('../assets/snake/ui/guide/guide_hit_wall.png')
    )
    this.load.image(
        'Snake:guide_move',
        require('../assets/snake/ui/guide/guide_move.png')
    )
    this.load.image(
        'Snake:guide_score',
        require('../assets/snake/ui/guide/guide_score.png')
    )
    this.load.image(
        'Snake:guide_self_damage',
        require('../assets/snake/ui/guide/guide_self_damage.png')
    )
    this.load.image(
        'Snake:prev_button',
        require('../assets/snake/ui/guide/prev_button.png')
    )
    this.load.image(
        'Snake:next_button',
        require('../assets/snake/ui/guide/next_button.png')
    )
    this.load.image(
        'Snake:start_button',
        require('../assets/snake/ui/guide/start_button.png')
    )
    this.load.image(
        'Snake:guide_helper_background',
        require('../assets/snake/ui/guide/guide_background.png')
    )
}
