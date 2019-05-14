import Phaser from "phaser";

import BootScene from './scenes/Boot';
import CreatePlayerScene from './scenes/CreatePlayer';
import OverviewScene from './scenes/Overview';
import ParallaxScene from './scenes/Parallax';
import DailyScenes from "./scenes/DailyScenes";
import JewelGameScene from "./games/jewel/main";

const scaleRatio = window.devicePixelRatio / 3;

const scenes = [      
    BootScene,
    CreatePlayerScene,
    OverviewScene,
    DailyScenes,
    JewelGameScene,
]

const game = new Phaser.Game({
    parent: 'game',
    type: Phaser.AUTO,
    width: 375,
    height: 675,
    antialias: true,
    multiTexture: true,
    scene: scenes.map(S => new S({key: S.name})),
});

WebFontConfig = {
  google: {
    families: ['Bubblegum Sans']
  }
}

// game.config.width = window.innerWidth * window.devicePixelRatio;
// game.config.height = window.innerHeight * window.devicePixelRatio;