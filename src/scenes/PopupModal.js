class PopupModalScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'PopupModalScene'
        });
    }
    preload(){}
    create(data){
        this.bg = this.add.image(0,0, "popup:background").setScale(0.5).setOrigin(0,0);
        this.button = this.add.image(0,0, "popup:button").setScale(0.5).setOrigin(0,0);

        this.button.on('pointerdown', () => {
            this.scene.start('OverviewScene');
            this.scene.stop('RunMorfiRun');
            this.scene.stop('PopupModalScene');
        });

        const Title = this.add.text(0, 0, data.title, {
            color: "#fff",
            fontFamily: "Bubblegum Sans",
            fontSize: "50px"
        }).setScrollFactor(0);

        const priceAmount = this.add.text(0, 0, `x ${ data.priceAmount }`, {
            color: "#fff",
            fontFamily: "Bubblegum Sans",
            fontSize: "50px"
        }).setScrollFactor(0);

        const priceText = this.add.text(0, 0, data.priceText, {
            color: "#fff",
            fontFamily: "Bubblegum Sans",
            fontSize: "50px"
        }).setScrollFactor(0);
    }
    update(){}

}

export default PopupModalScene;