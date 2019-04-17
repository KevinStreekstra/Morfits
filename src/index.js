import Phaser from "phaser";

import BootScene from './scenes/Boot';
import Healthbar from './scenes/Healthbar';
import ParallaxScene from './scenes/Parallax';

const game = new Phaser.Game({
    parent: 'game',
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scene: [
    width: 800,
    height: 600,
    scene: [
      BootScene,
      ParallaxScene,
      Healthbar,
    ],
});