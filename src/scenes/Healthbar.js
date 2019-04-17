import Sun from '../assets/bg/Sun.png';

class Healthbar extends Phaser.Scene {
    constructor(props) {
        super({
            key: 'Healthbar'
        })
    

    this.sillhouetteBMD;
    this.sillhouette;
    this.mask;

    this.color1 = 0xff0000;
    this.color2 = 0x80ff00;
    }

    preload() {
    this.load.image('Sun', { Sun });
    }

    create() {
    //	Create a new bitmap data for the silhouette sprite
    this.sillhouetteBMD = this.createSillhouette('Sun');
    // create a sprite from that bitmapdata
    this.sillhouette = this.add.sprite(150, 150, sillhouetteBMD);
    this.sillhouette.tint = 0xffffff;

    //add the mask that covers the silhouette, the mask will be tweened
    this.mask = game.add.graphics();
    this.mask.beginFill(0xffffff, 1);
    this.mask.drawRect(0, sillhouette.height, sillhouette.width, sillhouette.height);
    this.mask.endFill();

    this.sillhouette.mask = mask;//comment this to see what mask does
   
    this.sillhouette.addChild(mask);
    
    //add the progress animation by moving the mask object
    this.progress = this.add.tween(mask).to({
        y: - sillhouette.height
    }, 1200, "Linear", true, 1000, 0);
    }

    update() {
    //interpolate in RGB
    //sillhouette.tint = Phaser.Color.interpolateColor(color1, color2, 1, progress.timeline[0].percent, 1,0);
    //interpolate in HSV
    this.sillhouette.tint = Phaser.Color.interpolateColor(color1, color2, 1, progress.timeline[0].percent, 1,1);
    }

    createSillhouette(srcKey) {
    this.bmd = game.make.Healthbar()
    // load texture into the bitmap
    bmd.load(srcKey);
    bmd.processPixelRGB(forEachPixel, this);
    return bmd;
    }

    forEachPixel(pixel) {
    pixel.r = 255;
    pixel.g = 255;
    pixel.b = 255;
    return pixel;
    }
}

export default Healthbar;