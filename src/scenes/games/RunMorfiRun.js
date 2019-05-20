class RunMorfiRun extends Phaser.Scene {
    constructor() {
        super({
            key: 'RunMorfiRun'
        });
        /* Map of the game.
            ' ' = nothing,
            1 = platform
            2 = spawn point
            3 = finish point
            'h' = H ealty food
            'u' = U nhealty food
            '.' = End of platform boundary
        */ 
        this.map = 
        '1                                          1.'+
        '1                                          1.'+
        '1                                          1.'+
        '1                                          1.'+
        '1                                          1.'+
        '1                                          1.'+
        '1                                          1.'+
        '11111111111111111111111111111111111111111111';
    }
    
    preload() {}

    create() {
        console.log('run morfi run game created');           
        this.spawnPlayer = ()=>{
            this.player = this.physics.add.sprite(400, 250, "player", "sprite_0");
        }
        this.spawnPlayer();

    }
}

export default RunMorfiRun;