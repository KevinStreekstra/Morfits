import Player from '../classes/Player';
import AlignGrid from '../classes/AlignGrid';
import { addImage } from '../helpers'

import { overview_assets } from './_Overview';
import { dailyQuiz_assets } from './_DailyQuiz';
import { weeklyMission_assets } from './_WeeklyMission';
import { shop } from './_Shop';
import { stats } from './_Stats';
import { snake_assets } from './_Snake';
import { gameSelect_assets } from './_GameSelect';
import { game_RunMorfiRun_assets } from './games/_RunMorfiRun';
import { pop_up_modal } from './_PopUpModal';
import { StartQuiz } from './_StartQuiz';
import { StopQuiz } from './_StopQuiz';

//Quiz Questions
import { Question1 } from './BootQuiz/_Question1';
import { InfoQuestion } from './BootQuiz/_InfoQuestion';
import { Question5 } from './BootQuiz/_Question5';

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
        this.gameSelect_assets = gameSelect_assets.bind(this);
        this.game_RunMorfiRun_assets = game_RunMorfiRun_assets.bind(this);
        this.pop_up_modal = pop_up_modal.bind(this);
        this.StartQuiz = StartQuiz.bind(this);
        this.StopQuiz = StopQuiz.bind(this);

        this.Question1 = Question1.bind(this);
        this.InfoQuestion = InfoQuestion.bind(this);
        this.Question5 = Question5.bind(this);
    }

    preload() {
        let div = document.querySelector('#game div');
        div.style.transform = "scale(" + (1 / window.devicePixelRatio) + ")";

        this.grid = new AlignGrid({
            scene: this,
            rows: 13,
            cols: 11,
            width: this.sys.game.config.width,
            height: this.sys.game.config.height
        });

        this.load.css('master', './src/master.css');

        // START LOAD SCENE ASSETS
        this.overview_assets();
        this.dailyQuiz_assets();
        this.weeklyMission_assets();
        this.shop();
        this.stats();
        this.snake_assets();
        this.gameSelect_assets();
        this.game_RunMorfiRun_assets();
        this.pop_up_modal();
        this.StartQuiz();
        this.StopQuiz();
        this.Question1();
        this.InfoQuestion();
        this.Question5();
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
            }, [], this);
        });
    }
}

export default BootScene;
