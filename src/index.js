import Phaser from "phaser";
import config from "./config";
import logoImg from "./assets/logo.png";

config.game.scene = {preload, create, update};

const game = new Phaser.Game(config.game);

function preload() {

  this.load.image("./layers/Background-mountain-depth-4.png", );
}

function create() {
 

  this.tweens.add({
    targets: logo,
    y: 400,
    duration: 2000,
    yoyo: true,
    loop: -1,
  });

 
  

}

  


function update() {}
