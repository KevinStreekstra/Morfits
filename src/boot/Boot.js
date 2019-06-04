import Player from '../classes/Player'
import AlignGrid from '../classes/AlignGrid'
import { addImage } from '../helpers'

import { overview_assets } from './_Overview'
import { dailyQuiz_assets } from './_DailyQuiz'
import { weeklyMission_assets } from './_WeeklyMission'
import { shop } from './_Shop'
import { inventory } from './_Inventory'
import { stats } from './_Stats'
import { snake_assets } from './_Snake'
import { gameSelect_assets } from './_GameSelect'
import { game_RunMorfiRun_assets } from './games/_RunMorfiRun'
import { character_assets } from './_Character'
import { pop_up_modal } from './_PopUpModal'
import { StartQuiz } from './_StartQuiz'
import { StopQuiz } from './_StopQuiz'
import { characterCustomize_assets } from './_CharacterCustomize'

//Quiz Questions
import { Question1 } from './BootQuiz/_Question1'
import { InfoQuestion } from './BootQuiz/_InfoQuestion'
import { Question5 } from './BootQuiz/_Question5'
import { QuizReward } from './BootQuiz/_QuizReward'
import { QuizAnswer } from './BootQuiz/_QuizAnswer'

class BootScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'BootScene'
        })

        this.addImage = addImage.bind(this)
        this.overview_assets = overview_assets.bind(this)
        this.dailyQuiz_assets = dailyQuiz_assets.bind(this)
        this.weeklyMission_assets = weeklyMission_assets.bind(this)
        this.shop = shop.bind(this)
        this.inventory = inventory.bind(this)
        this.stats = stats.bind(this)
        this.snake_assets = snake_assets.bind(this)
        this.gameSelect_assets = gameSelect_assets.bind(this)
        this.character_assets = character_assets.bind(this)
        this.game_RunMorfiRun_assets = game_RunMorfiRun_assets.bind(this)
        this.pop_up_modal = pop_up_modal.bind(this)
        this.StartQuiz = StartQuiz.bind(this)
        this.StopQuiz = StopQuiz.bind(this)
        this.characterCustomize_assets = characterCustomize_assets.bind(this)

        this.Question1 = Question1.bind(this)
        this.InfoQuestion = InfoQuestion.bind(this)
        this.Question5 = Question5.bind(this)
        this.QuizReward = QuizReward.bind(this)
        this.QuizAnswer = QuizAnswer.bind(this)
    }

    preload() {
        let div = document.querySelector('#game div')
        div.style.transform = 'scale(' + 1 / window.devicePixelRatio + ')'

        this.grid = new AlignGrid({
            scene: this,
            rows: 13,
            cols: 11,
            width: this.sys.game.config.width,
            height: this.sys.game.config.height
        })

        // START LOAD SCENE ASSETS
        this.overview_assets()
        this.dailyQuiz_assets()
        this.weeklyMission_assets()
        this.shop()
        this.inventory()
        this.stats()
        this.snake_assets()
        this.gameSelect_assets()
        this.character_assets()
        this.game_RunMorfiRun_assets()
        this.pop_up_modal()
        this.StartQuiz()
        this.StopQuiz()
        this.Question1()
        this.InfoQuestion()
        this.Question5()
        this.QuizReward()
        this.characterCustomize_assets()
        this.QuizAnswer()
        // END LOAD SCENE ASSETS

        this.load.on('complete', () => {
            this.time.delayedCall(
                10,
                () => {
                    if (new Player().exists()) {
                        this.scene.start('OverviewScene')
                    } else {
                        this.scene.start('CreatePlayerScene')
                    }
                    this.scene.stop('LoadingScene')
                    this.scene.start('FlappyGame')
                    this.scene.stop('BootScene')
                },
                [],
                this
            )
        })
    }
}

export default BootScene
