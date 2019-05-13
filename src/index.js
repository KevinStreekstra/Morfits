import Phaser from "phaser";

import BootScene from './scenes/Boot';
import CreatePlayerScene from './scenes/CreatePlayer';
import OverviewScene from './scenes/Overview';
import ParallaxScene from './scenes/Parallax';
import DailyScenes from "./scenes/DailyScenes";

const scaleRatio = window.devicePixelRatio / 3;

const game = new Phaser.Game({
    parent: 'game',
    type: Phaser.AUTO,
    width: 375,
    height: 675,
    antialias: true,
    multiTexture: true,
    scene: [
      BootScene,
      CreatePlayerScene,
      OverviewScene,
      DailyScenes,
    ],
});

WebFontConfig = {
  google: {
    families: ['Bubblegum Sans']
  }
}

// game.config.width = window.innerWidth * window.devicePixelRatio;
// game.config.height = window.innerHeight * window.devicePixelRatio;