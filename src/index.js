import Phaser from "phaser";

import BootScene from './boot/Boot';
import LoadingScene from './scenes/Loading';
import CreatePlayerScene from './scenes/CreatePlayer';
import OverviewScene from './scenes/Overview';
import StatsScene from "./scenes/Stats";
import DailyScenes from "./scenes/DailyQuiz";
import WeeklyScenes from "./scenes/WeeklyMission";
import SnakeScene from "./scenes/Snake";

const devicePixelRatio = window.devicePixelRatio;
const scaleDownRation = 1 / 3;

const game = new Phaser.Game({
    parent: 'game',
    type: Phaser.AUTO,
    width: 375,
    height: 675,
    dom: {
      createContainer: true,
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
        SnakeScene
    ],
});

const WebFontConfig = {
  google: {
    families: ['Bubblegum Sans']
  }
}

if(typeof(module.hot) !== 'undefined') {
    module.hot.accept() // eslint-disable-line no-undef
  }

// game.config.width = window.innerWidth * window.devicePixelRatio;
// game.config.height = window.innerHeight * window.devicePixelRatio;
