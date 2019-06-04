export function stats() {
    // Background elements
    this.load.image(
        'Stats:bg',
        require('../assets/stats/backgrounds/background.png')
    )
    this.load.image(
        'Stats:TabBg',
        require('../assets/stats/backgrounds/modal_background.png')
    )
    this.load.image(
        'Stats:plank_1',
        require('../assets/stats/backgrounds/plank_background.png')
    )
    this.load.image('Stats:Vines', require('../assets/stats/backgrounds/vines.png'))
    this.load.image(
        'Stats:levelIndicatorBG',
        require('../assets/stats/backgrounds/level_indicator_background.png')
    )

    // Bars
    this.load.image(
        'Stats:XPBar',
        require('../assets/stats/bars/experience_bar.png')
    )

    // Small icons
    this.load.image(
        'Stats:SmallHeart',
        require('../assets/stats/icons/mentality_icon_small.png')
    )
    this.load.image(
        'Stats:SmallEnergy',
        require('../assets/stats/icons/energy_icon_small.png')
    )
    this.load.image(
        'Stats:SmallPower',
        require('../assets/stats/icons/power_icon_small.png')
    )

    // Big icons
    this.load.image(
        'Stats:BigHeart',
        require('../assets/stats/icons/mentality_icon_big.png')
    )
    this.load.image(
        'Stats:BigEnergy',
        require('../assets/stats/icons/energy_icon_big.png')
    )
    this.load.image(
        'Stats:BigPower',
        require('../assets/stats/icons/power_icon_big.png')
    )
}
