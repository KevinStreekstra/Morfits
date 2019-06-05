class EnergyLevel extends Phaser.Scene {
    constructor() {
        super({
            key: 'EnergyLevel'
        })
    }

    preload() {}

    create() {
        let energy_level = 100
        function minigame() {
            energy_level -= 30
            console.log(energy_level)
        }
        minigame()
    }
}
export default EnergyLevel
