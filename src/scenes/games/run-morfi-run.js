class RunMorfiRun extends Phaser.Scene {
    constructor() {
        super({
            key: 'RunMorfiRun'
        });
        /* Map of the game.
            ' ' = nothing,
            1 = platform
            2 = spawn point
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


    }
}

export default RunMorfiRun;