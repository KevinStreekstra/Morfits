class PopupModalScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'PopupModalScene'
        });
    }
    preload(){}
    create(data){
        this.data = data;
        this.bg = this.add.image(this.cameras.main.width / 2,this.cameras.main.height / 2, data.woodenBackground).setScale(0.5);
        this.cameras.main.setBackgroundColor('rgba(0,0,0,0.5)');

        // Assets
        data.content.length > 0 ? this.getTextData(data.content) : null;
        data.assets.length > 0 ? this.getAssetsData(data.assets) : null;

    }
    update(){}
    getTextData(d){
        d.forEach(el => {
            const text = this.add.text(0, 0, el.text, {
                color: "#fff",
                fontFamily: "Bubblegum Sans",
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
    getAssetsData(d){
        d.forEach(el => {
            const asset = this.add.image(0, 0, el.asset).setScale(0.5);
            Phaser.Display.Align.In.Center(
                asset,
                this.bg,
                el.x,
                el.y,
            );
            if(el.UseDefinedScenes || el.scenes.length > 0){
                asset.setInteractive().on('pointerdown', () => {
                    this.sceneHandler(el, el.UseDefinedScenes);
                });
            }
        });
    }
    sceneHandler(d, definedScenes){
        if(definedScenes){
            this.data.scenes.start.forEach(el => {
                this.scene.start(el);
            });
            this.data.scenes.stop.forEach(el => {
                console.log(el);
                this.scene.stop(el);
            });
        } else {
            d.scenes.start.forEach(el => {
                this.scene.start(el);
            });
            d.scenes.stop.forEach(el => {
                this.scene.stop(el);
            });
        }
    }
}

export default PopupModalScene;