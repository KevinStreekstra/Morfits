import Phaser from "phaser";

import BootScene from './boot/Boot';
import LoadingScene from './scenes/Loading';
import CreatePlayerScene from './scenes/CreatePlayer';
import OverviewScene from './scenes/Overview';
import ParallaxScene from './scenes/Parallax';
import StatsScene from "./scenes/StatsSCene";
import DailyScenes from "./scenes/DailyQuiz";
import WeeklyScenes from "./scenes/WeeklyMission";

const devicePixelRatio = window.devicePixelRatio;
const scaleDownRation = 1 / 3;

const game = new Phaser.Game({
    parent: 'game',
    type: Phaser.CANVAS,
    width: 375,
    height: 675,
    antialias: true,
    multiTexture: true,
    scale: {
        zoom: 1 / window.devicePixelRatio,
        scale: Phaser.Scale.NONE,
        width: 375 * devicePixelRatio,
        height: 675 * devicePixelRatio
    },
    scene: [
      LoadingScene,
      BootScene,
      CreatePlayerScene,
      OverviewScene,
      DailyScenes,
      WeeklyScenes,
      StatsScene,
    ],
});

WebFontConfig = {
  google: {
    families: ['Bubblegum Sans']
  }
}

// game.config.width = window.innerWidth * window.devicePixelRatio;
// game.config.height = window.innerHeight * window.devicePixelRatio;
