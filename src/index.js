import Phaser from "phaser";

// import ParallaxScene from './scenes/ParallaxScene';
import Healthbar from './scenes/Healthbar';

const game = new Phaser.Game({
    parent: 'game',
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scene: [
      Healthbar
    ],
});