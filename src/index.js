import Phaser from "phaser";

import BootScene from './boot/Boot';
import LoadingScene from './scenes/Loading';
import CreatePlayerScene from './scenes/CreatePlayer';
import OverviewScene from './scenes/Overview';
import StatsScene from "./scenes/Stats";
import DailyScenes from "./scenes/DailyQuiz";
import WeeklyScenes from "./scenes/WeeklyMission";
import SnakeScene from "./scenes/Snake";
import GameSelectScene from "./scenes/GameSelect";
import RunMorfiRun from "./scenes/games/RunMorfiRun";
import PopupModalScene from './scenes/PopupModal';
import ShopScene from './scenes/Shop';
import StartQuiz from "./scenes/StartQuiz";
import StopQuiz from "./scenes/StopQuiz";

//Quiz questions
import Question1 from "./scenes/QuizScenes/Question1";
import Question2 from "./scenes/QuizScenes/Question2";
import Question3 from "./scenes/QuizScenes/Question3";
import Question4 from "./scenes/QuizScenes/Question4";
import InfoQuestion from "./scenes/QuizScenes/InfoQuestion";
import Question5 from "./scenes/QuizScenes/Question5";

// Styling
import './master.css';

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
    physics: {
      default: 'arcade',
      arcade: {
          debug: false
      }
    },
    antialias: true,
    multiTexture: true,
    scale: {
        zoom: 1 / devicePixelRatio,
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
        SnakeScene,
        GameSelectScene,
        RunMorfiRun,
        PopupModalScene,
        ShopScene,
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

const WebFontConfig = {
  google: {
    families: ['Bubblegum Sans']
  }
}

if(typeof(module.hot) !== 'undefined') {
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(function() {
            location.reload()
        });
    }
}
