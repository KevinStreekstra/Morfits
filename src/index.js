import Phaser from "phaser";
import config from "./config";
import logoImg from "./assets/logo.png";

config.game.scene = {preload, create, update};

const game = new Phaser.Game(config.game);

function preload() {
  this.load.image("logo", logoImg);
}

function create() {
  const logo = this.add.image(270, 480, "logo");

  this.tweens.add({
    targets: logo,
    y: 600,
    duration: 2000,
    yoyo: true,
    loop: -1,
  });
}

function update() {}
