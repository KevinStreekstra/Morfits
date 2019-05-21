export function snake_assets() {
    // Snake assets
    this.load.image('Snake:player1_body', 'src/assets/snake/body/body-part-player-1.svg');
    this.load.image('Snake:player2_body', 'src/assets/snake/body/body-part-player-2.svg');
    this.load.image('Snake:player1_head', 'src/assets/snake/Head.png');

    // Board assets
    this.load.image('Snake:board_background', 'src/assets/snake/board/field.png');

    // Food assets
    this.load.image('Snake:apple', 'src/assets/snake/food/apple.png');
    this.load.image('Snake:pineapple', 'src/assets/snake/food/pineapple.png');
    this.load.image('Snake:hamburger', 'src/assets/snake/food/hamburger.png');
    this.load.image('Snake:lemon', 'src/assets/snake/food/lemon.png');
    this.load.image('Snake:soda', 'src/assets/snake/food/soda.png');
}
