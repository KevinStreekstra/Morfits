import Phaser from "phaser";

import ParallaxScene from './scenes/ParallaxScene';

const game = new Phaser.Game({
    parent: 'game',
    type: Phaser.AUTO,
    width: 1920,
    height: 1024,
    scene: [
      ParallaxScene
    ],
});