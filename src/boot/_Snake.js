export function snake_assets() {
    // Snake assets
    this.load.image('Snake:player1_body', require('../assets/snake/body/body-part-player-1.svg'));
    this.load.image('Snake:player2_body', require('../assets/snake/body/body-part-player-2.svg'));
    this.load.image('Snake:player1_head', require('../assets/snake/Head.png'));

    // Board assets
    this.load.image('Snake:board_background', require('../assets/snake/board/field.png'));

    // Food assets
    this.load.image('Snake:apple', require('../assets/snake/food/apple.png'));
    this.load.image('Snake:pineapple', require('../assets/snake/food/pineapple.png'));
    this.load.image('Snake:hamburger', require('../assets/snake/food/hamburger.png'));
    this.load.image('Snake:lemon', require('../assets/snake/food/lemon.png'));
    this.load.image('Snake:soda', require('../assets/snake/food/soda.png'));
}
