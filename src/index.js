import Phaser from "phaser";

import BootScene from './boot/Boot';
import LoadingScene from './scenes/Loading';
import CreatePlayerScene from './scenes/CreatePlayer';
import OverviewScene from './scenes/Overview';
import StatsScene from "./scenes/Stats";
import DailyScenes from "./scenes/DailyQuiz";
import WeeklyScenes from "./scenes/WeeklyMission";
import StartQuiz from "./scenes/StartQuiz";
import StopQuiz from "./scenes/StopQuiz";

//Quiz questions
import Question1 from "./scenes/QuizScenes/Question1";
import Question2 from "./scenes/QuizScenes/Question2";
import Question3 from "./scenes/QuizScenes/Question3";
import Question4 from "./scenes/QuizScenes/Question4";
import InfoQuestion from "./scenes/QuizScenes/InfoQuestion";
import Question5 from "./scenes/QuizScenes/Question5";

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
      StartQuiz,
      StopQuiz,
      Question1,
      Question2,
      Question3,
      Question4,
      InfoQuestion,
      Question5,
    ],
});

WebFontConfig = {
  google: {
    families: ['Bubblegum Sans']
  }
}

// game.config.width = window.innerWidth * window.devicePixelRatio;
// game.config.height = window.innerHeight * window.devicePixelRatio;
