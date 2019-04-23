import Phaser from "phaser";

import BootScene from './scenes/Boot';
import OverviewScene from './scenes/Overview';
import ParallaxScene from './scenes/Parallax';

const game = new Phaser.Game({
    parent: 'game',
    type: Phaser.AUTO,
    width: 375,
    height: 475,
    scene: [
      BootScene,
      OverviewScene,
      ParallaxScene
    ],
});