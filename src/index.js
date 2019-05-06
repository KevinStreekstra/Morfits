import Phaser from "phaser";

import BootScene from './scenes/Boot';
import OverviewScene from './scenes/Overview';
import ParallaxScene from './scenes/Parallax';

const scaleRatio = window.devicePixelRatio / 3;

const game = new Phaser.Game({
    parent: 'game',
    type: Phaser.CANVAS,
    width: window.innerWidth * scaleRatio,
    height: window.innerHeight * scaleRatio,
    scene: [
      BootScene,
      OverviewScene,
      ParallaxScene
    ],
});

// game.config.width = window.innerWidth * window.devicePixelRatio;
// game.config.height = window.innerHeight * window.devicePixelRatio;