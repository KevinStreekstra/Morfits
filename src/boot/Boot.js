import Player from '../classes/Player';
import AlignGrid from '../classes/AlignGrid';
import { addImage } from '../helpers'

import { overview_assets } from './_Overview';
import { dailyQuiz_assets } from './_DailyQuiz';
import { weeklyMission_assets } from './_WeeklyMission';
import { shop } from './_Shop';
import { stats } from './_Stats';
import { snake_assets } from './_Snake';

class BootScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'BootScene'
        });

        this.addImage = addImage.bind(this);
        this.overview_assets = overview_assets.bind(this);
        this.dailyQuiz_assets = dailyQuiz_assets.bind(this);
        this.weeklyMission_assets = weeklyMission_assets.bind(this);
        this.shop = shop.bind(this);
        this.stats = stats.bind(this);
        this.snake_assets = snake_assets.bind(this);
    }

    preload() {
        this.grid = new AlignGrid({
            scene: this,
            rows: 13,
            cols: 11,
            width: this.sys.game.config.width,
            height: this.sys.game.config.height
        });

        // START LOAD SCENE ASSETS
        this.overview_assets();
        this.dailyQuiz_assets();
        this.weeklyMission_assets();
        this.shop();
        this.stats();
        this.snake_assets();
        // END LOAD SCENE ASSETS

        this.load.on('complete', () => {
            this.time.delayedCall(10, () => {
                if(new Player().exists()) {
                    this.scene.start('OverviewScene');
                } else {
                    this.scene.start('CreatePlayerScene');
                }
                this.scene.stop('LoadingScene');
                this.scene.stop('BootScene');
                this.scene.start('SnakeScene');
            }, [], this);
        });
    }
}

export default BootScene;
