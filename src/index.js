import Phaser from "phaser";

import BootScene from './scenes/Boot';
import OverviewScene from './scenes/Overview';
import ParallaxScene from './scenes/Parallax';

const game = new Phaser.Game({
    parent: 'game',
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [
      BootScene,
      OverviewScene,
      ParallaxScene,
    ],
});