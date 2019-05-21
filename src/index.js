import Phaser from "phaser";

import BootScene from './boot/Boot';
import LoadingScene from './scenes/Loading';
import CreatePlayerScene from './scenes/CreatePlayer';
import OverviewScene from './scenes/Overview';
import StatsScene from "./scenes/Stats";
import DailyScenes from "./scenes/DailyQuiz";
import WeeklyScenes from "./scenes/WeeklyMission";
import RunMorfiRun from "./scenes/games/RunMorfiRun";

const devicePixelRatio = window.devicePixelRatio;
const scaleDownRation = 1 / 3;

const game = new Phaser.Game({
    parent: 'game',
    type: Phaser.CANVAS,
    width: 375,
    height: 675,
    dom: {
      createContainer: true,
    },
    physics: {
      default: 'arcade',
      arcade: {
          debug: true
      }
    },
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
      RunMorfiRun,
    ],
});

WebFontConfig = {
  google: {
    families: ['Bubblegum Sans']
  }
}

// game.config.width = window.innerWidth * window.devicePixelRatio;
// game.config.height = window.innerHeight * window.devicePixelRatio;
