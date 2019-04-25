import Phaser from "phaser";

import BootScene from './scenes/Boot';
import ParallaxScene from './scenes/Parallax';
import DailyQuiz from './scenes/DailyQuiz';

const game = new Phaser.Game({
    parent: 'game',
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [
      BootScene,
      ParallaxScene,
      DailyQuiz
    ],
});








