import Phaser from "phaser";

import BootScene from './boot/Boot';
import LoadingScene from './scenes/Loading';
import CreatePlayerScene from './scenes/CreatePlayer';
import OverviewScene from './scenes/Overview';
import StatsScene from "./scenes/Stats";
import DailyScenes from "./scenes/DailyQuiz";
import WeeklyScenes from "./scenes/WeeklyMission";
import ShopScene from './scenes/Shop';
import StartQuiz from "./scenes/StartQuiz";
import StopQuiz from "./scenes/StopQuiz";

//Quiz questions
import Question1 from "./scenes/QuizScenes/Question1";

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
        zoom: 1 / devicePixelRatio,
        scale: Phaser.Scale.NONE,
        width: 375 * devicePixelRatio,
        height: 675 * devicePixelRatio
    },
    dom: {
      createContainer: true,
    },
    scene: [
      LoadingScene,
      BootScene,
      CreatePlayerScene,
      OverviewScene,
      DailyScenes,
      WeeklyScenes,
      StatsScene,
      ShopScene,
      StartQuiz,
      StopQuiz,
      Question1,
    ],
});

WebFontConfig = {
  google: {
    families: ['Bubblegum Sans']
  }
}
