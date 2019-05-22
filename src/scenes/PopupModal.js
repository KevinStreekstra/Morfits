class PopupModalScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'PopupModalScene'
        });
        this.textColor = '#fff';
        this.textFont = 'Bubblegum Sans';
        this.backgroundOverlay = 'rgba(0,0,0,0.5)';
    }
    create(data){
        this.data = data;
        this.bg = this.add.image(this.cameras.main.width / 2,this.cameras.main.height / 2, data.woodenBackground).setScale(0.5);
        this.cameras.main.setBackgroundColor(this.backgroundOverlay);

        // Assets
        data.content.length > 0 ? this.getTextData(data.content) : null;
        data.assets.length > 0 ? this.getAssetsData(data.assets) : null;
    }
    getTextData(elementData){
        elementData.forEach(el => {
            const text = this.add.text(0, 0, el.text, {
                color: this.textColor,
                fontFamily: this.textFont,
                fontSize: el.fontSize,
            });
            Phaser.Display.Align.In.Center(
                text,
                this.bg,
                el.x,
                el.y
            );
        });
    }
    getAssetsData(elementData){
        elementData.forEach(el => {
            const asset = this.add.image(0, 0, el.asset).setScale(0.5);
            Phaser.Display.Align.In.Center(
                asset,
                this.bg,
                el.x,
                el.y,
            );
            if(el.UseDefinedScenes || Object.entries(el.scenes).length > 0){
                asset.setInteractive().on('pointerdown', () => {
                    this.sceneHandler(el);
                });
            }
        });
    }
    sceneHandler(elementData){
        const data = elementData.scenes.length > 0 ? data = elementData : this.data;

        data.scenes.start.forEach(el => {
            this.scene.start(el);
        });
        data.scenes.stop.forEach(el => {
            this.scene.stop(el);
        });

    }
}

export default PopupModalScene;