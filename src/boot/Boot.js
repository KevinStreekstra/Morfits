import Player from '../classes/Player';
import AlignGrid from '../classes/AlignGrid';
import { addImage } from '../helpers'

class BootScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'BootScene'
        });
        this.boot_morfitWalking;
        this.boot_morfitLogo;
        this.boot_ground;
        this.addImage = addImage.bind(this);
        this.boot_loadingText;
    }

    preload() {
        this.grid = new AlignGrid({
            scene: this, 
            rows: 13, 
            cols: 11,
            width: this.sys.game.config.width,         
            height: this.sys.game.config.height
        });

        // Morfit & morfitlogo
        this.load.image('overview:morfitWalking', 'src/assets/caracter_page/morfit_character@2x.png');
        this.load.image('overview:bg', 'src/assets/caracter_page/background@2x.png');
        this.load.image('overview:XPbar', 'src/assets/caracter_page/exp_bar@2x.png');
        this.load.image('overview:txtXPbar', 'src/assets/caracter_page/250-486XP@2x.png');

        //navbar & bars
        this.load.image('overview:MentalBar', 'src/assets/caracter_page/mental_bar@2x.png');
        this.load.image('overview:Mental80', 'src/assets/caracter_page/80-100@2x.png');
        this.load.image('overview:IconMental', 'src/assets/caracter_page/icon_mental_fill@2x.png');
        this.load.image('overview:EnergyBar', 'src/assets/caracter_page/energie_bar@2x.png');
        this.load.image('overview:Energy100', 'src/assets/caracter_page/100-100@2x.png');
        this.load.image('overview:IconEnergy', 'src/assets/caracter_page/icon_energie_bar_fill@2x.png');
        this.load.image('overview:PowerBar', 'src/assets/caracter_page/kracht_bar@2x.png');
        this.load.image('overview:Power100', 'src/assets/caracter_page/100-100@2x.png');
        this.load.image('overview:IconPower', 'src/assets/caracter_page/icon_kracht_fill@2x.png');
        this.load.image('overview:TopNavbar', 'src/assets/caracter_page/nav@2x.png');
        this.load.image('overview:whiteBG', 'src/assets/level-tap/nav-tap@2x.png');
        this.load.image('overview:Myname', 'src/assets/level-tap/Myname@2x.png');
        this.load.image('overview:level', 'src/assets/level-tap/Group 242@2x.png');

        //bottom navbar icons / tekst
        this.load.image('overview:btnSettings', 'src/assets/caracter_page/btn_setting@2x.png');
        this.load.image('overview:btnFriends', 'src/assets/caracter_page/btn_freinds@2x.png');
        this.load.image('overview:btnGym', 'src/assets/caracter_page/brn_gym@2x.png');
        this.load.image('overview:btnGames', 'src/assets/caracter_page/btn_games@2x.png');
        this.load.image('overview:btnfeed', 'src/assets/caracter_page/btn_feed@2x.png');
        this.load.image('overview:btnInventory', 'src/assets/caracter_page/btn_inventory@2x.png');
        this.load.image('overview:btnQuiz', 'src/assets/caracter_page/btn_daily-reward@2x.png');

        this.load.image('overview:txtGym', 'src/assets/caracter_page/Gym@2x.png');
        this.load.image('overview:txtGames', 'src/assets/caracter_page/Games@2x.png');
        this.load.image('overview:txtFeed', 'src/assets/caracter_page/Voeden@2x.png');
        this.load.image('overview:txtInventory', 'src/assets/caracter_page/Inventaris@2x.png');
        this.load.image('overview:txtQuiz', 'src/assets/caracter_page/Quiz@2x.png');

        //bottom navbar
        this.load.image('overview:BottomNavbar', 'src/assets/caracter_page/nav-bottom_background@2x.png');
        this.load.image('overview:ground2', 'src/assets/caracter_page/ground-bottom@2x.png');
        this.load.image('overview:ground3', 'src/assets/caracter_page/ground-top@2x.png');
        
        //plants
        this.load.image('plant1', 'src/assets/boot/Plant_2.png');
        this.load.image('plant2', 'src/assets/boot/Plant_6.png');
        this.load.image('HomePlant', 'src/assets/bg/home/Plant_7.png');
        this.load.image('HomePlant2', 'src/assets/bg/home/Plant_9.png');
        this.load.image('SkyPlant', 'src/assets/bg/home/skyPlant.png');
        this.load.image('overview:HomePlant', 'src/assets/caracter_page/plant-vase@2x.png');
        this.load.image('overview:HomePlant2', 'src/assets/caracter_page/plant-pot@2x.png');

         //DailyScene

        //DailyScene background
        this.load.image('Daily:bg', 'src/assets/daily_reward_pop-up/daily_reward_pop-up_quiz/overlay@2x.png');
        this.load.image('Daily:popup', 'src/assets/daily_reward_pop-up/daily_reward_pop-up_quiz/popup_daily_background@2x.png');
        this.load.image('Daily:BgMask', 'src/assets/daily_reward_pop-up/daily_reward_pop-up_quiz/Mask Group 2@2x.png');

        //DailyScene popup
        this.load.image('Daily:quit', 'src/assets/daily_reward_pop-up/daily_reward_pop-up_quiz/btn_close@2x.png');
        this.load.image('Daily:start', 'src/assets/daily_reward_pop-up/daily_reward_pop-up_quiz/btn_start-quiz@2x.png');
        this.load.image('Daily:popupPlank', 'src/assets/daily_reward_pop-up/daily_reward_pop-up_quiz/popup_plank@2x.png');
        this.load.image('Daily:Planktxt', 'src/assets/daily_reward_pop-up/daily_reward_pop-up_quiz/Doe mee met de Quiz van de week en win 5 M-Dollars voor vandaag!@2x.png');
        this.load.image('Daily:ribbonCoins', 'src/assets/daily_reward_pop-up/daily_reward_pop-up_quiz/popup_ribbon_coins_5@2x.png');
        this.load.image('modal:active', 'src/assets/daily_reward_pop-up/daily_reward_pop-up_quiz/popup_reward_swipe@2x.png');
        this.load.image('Daily:Quiz', 'src/assets/daily_reward_pop-up/daily_reward_pop-up_quiz/Quiz vande dag!@2x.png');
        this.load.image('Daily:seperator', 'src/assets/daily_reward_pop-up/daily_reward_pop-up_quiz/popup_quiz_border@2x.png');
        this.load.image('Daily:Mission', 'src/assets/daily_reward_pop-up/daily_reward_pop-up_quiz/Missie vande week!@2x.png');

        //WeeklyScene
        this.load.image('Weekly:Plank1', 'src/assets/daily_reward_pop-up/daily_reward_pop-up_missions/Loop 10km in de week!@2x.png');
        this.load.image('Weekly:Plank2', 'src/assets/daily_reward_pop-up/daily_reward_pop-up_missions/Sprint voor 0,5km!@2x.png');
        this.load.image('Weekly:Plank3', 'src/assets/daily_reward_pop-up/daily_reward_pop-up_missions/Zit muisstil voor 20 min!@2x.png');
        this.load.image('Modal:Check', 'src/assets/daily_reward_pop-up/daily_reward_pop-up_missions/checkbox-check@2x.png');
        this.load.image('Modal:Check2', 'src/assets/daily_reward_pop-up/daily_reward_pop-up_missions/check-box@2x.png');


        //StatsScene
        this.load.image('Stats:bg', 'src/assets/stats/background@2x.png');
        this.load.image('Stats:TabBg', 'src/assets/stats/tab_background_states@2x.png');
        this.load.image('Stats:plank_1', 'src/assets/stats/plank_1@2x.png');
        this.load.image('Stats:Vines', 'src/assets/stats/vines@2x.png');
        this.load.image('Stats:level', 'src/assets/stats/Level@2x.png');
        this.load.image('Stats:levelIndicator', 'src/assets/stats/level_indicator@2x.png');
        this.load.image('Stats:MyName', 'src/assets/stats/Myname@2x.png');
        this.load.image('Stats:XPCount', 'src/assets/stats/45-486XP@2x.png');
        this.load.image('Stats:XPBar', 'src/assets/stats/exp_bar@2x.png');

        this.load.image('Stats:SmallHeart', 'src/assets/stats/icon_mental_fill_white.png');
        this.load.image('Stats:SmallEnergy', 'src/assets/stats/icon_energy_fill_white.png');
        this.load.image('Stats:SmallPower', 'src/assets/stats/icon_kracht_fill_white.png');
        this.load.image('Stats:Hitpoints', 'src/assets/stats/Hitpoints@2x.png');
        this.load.image('Stats:Energypoints', 'src/assets/stats/Energie@2x.png');
        this.load.image('Stats:kracht', 'src/assets/stats/kracht@2x.png');
        this.load.image('Stats:21', 'src/assets/stats/21@2x.png');
        this.load.image('Stats:32', 'src/assets/stats/32@2x.png');
        this.load.image('Stats:52', 'src/assets/stats/52@2x.png');

        this.load.image('Stats:BigHeart', 'src/assets/stats/icon_mental_fill_white@2x.png');
        this.load.image('Stats:BigEnergy', 'src/assets/stats/icon_energy_fill_white@2x.png');
        this.load.image('Stats:BigPower', 'src/assets/stats/icon_kracht_fill_white@2x.png');
        this.load.image('Stats:Mentalitytxt', 'src/assets/stats/Mentaliteit80-100@2x.png');
        this.load.image('Stats:Energytxt', 'src/assets/stats/energie100-100@2x.png');
        this.load.image('Stats:Powertxt', 'src/assets/stats/Kracht100-100@2x.png');

        this.load.on('progress', (value) => {
            
            
        });

        this.load.on('complete', () => {
            if(new Player().exists()) {
                this.scene.start('OverviewScene');
            } else {
                this.scene.start('CreatePlayerScene');
            }
            this.scene.stop('LoadingScene');
            this.scene.stop('BootScene');
        });

        
        // this.overview_assets();
    }

    overview_assets() {
        this.load.image('bg', 'src/assets/boot/bg/background.png');
        this.load.image('bg_mntn1', 'src/assets/boot/bg/mountain-depth-5.png');
        this.load.image('bg_mntn2', 'src/assets/boot/bg/mountain-depth-4.png');
        this.load.image('bg_mntn3', 'src/assets/bg/mountain-depth-3.png');
        this.load.image('bg_terrain_front', 'src/assets/boot/bg/terrain-front.png');
        this.load.image('bg_trees_front', 'src/assets/boot/bg/trees-front.png');
        this.load.image('bg_trees1', 'src/assets/boot/bg/trees-depth-4.png');
        this.load.image('bg_cloud6', 'src/assets/boot/bg/clouds-depth-6.png');
        this.load.image('bg_cloud5', 'src/assets/boot/bg/clouds-depth-5.png');
        this.load.image('sun', 'src/assets/bg/Sun.png');
        this.load.image('bg_sky', 'src/assets/bg/Sky cloud.png');
        // this.load.image('bg_mntn1', 'src/assets/bg/home/morfit walking.png');
        // this.load.image('bg_mntn0', 'src/assets/bg/home/boot_ground.png');
     }
}



export default BootScene;