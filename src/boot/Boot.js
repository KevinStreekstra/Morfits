import Player from '../classes/Player';
import AlignGrid from '../classes/AlignGrid';
import { addImage } from '../helpers'

import { overview_assets } from './_Overview';
import { dailyQuiz_assets } from './_DailyQuiz';
import { weeklyMission_assets } from './_WeeklyMission';
import { shop } from './_Shop';
import { stats } from './_Stats';
import { StartQuiz } from './_StartQuiz'; 
import { StopQuiz } from './_StopQuiz';

//Quiz Questions
import { Question1 } from './BootQuiz/_Question1';

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
        this.StartQuiz = StartQuiz.bind(this);
        this.StopQuiz = StopQuiz.bind(this);

        this.Question1 = Question1.bind(this);
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
        this.StartQuiz();
        this.StopQuiz();
        this.Question1();
        // END LOAD SCENE ASSETS

        this.load.on('complete', () => {
            this.time.delayedCall(1000, () => {
                if(new Player().exists()) {
                    this.scene.start('OverviewScene');
                } else {
                    this.scene.start('CreatePlayerScene');
                }
                this.scene.stop('LoadingScene');
                this.scene.stop('BootScene');
            }, [], this);
        });
    }
}

export default BootScene;