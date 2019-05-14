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
        

        const progress = this.add.graphics();
        const progressValue = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, '0%', { fontSize: '32px', fill: '#000' });

        this.load.spritesheet('boot_bird1', 'src/assets/boot/bird-1.png', {frameWidth: 400, frameHeight: 400});
        this.load.spritesheet('boot_bird2', 'src/assets/boot/bird-2.png', {frameWidth: 400, frameHeight: 400});
        this.load.image('boot_ground', 'src/assets/boot/ground.png');
        this.load.image('boot_loadingText', 'src/assets/boot/loading-text.png');
        this.load.image('boot_morfitWalking', 'src/assets/boot/Morfit walking.png');
        this.load.image('boot_morfitLogo', 'src/assets/boot/morfit-logo.png');
        this.load.image('boot_plant1', 'src/assets/boot/Plant_2.png');
        this.load.image('boot_plant2', 'src/assets/boot/Plant_6.png');

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

        window.setInterval(()=>{
            if ((this.boot_loadingText.text += '.').length == 25) 
                this.boot_loadingText.text = 'Je Morfit is onderweg';
        }, 750);

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


        this.load.on('progress', (value) => {
            
            
        });

        this.load.on('complete', () => {
            if(new Player().exists()) {
                this.scene.start('OverviewScene');
            } else {
                this.scene.start('CreatePlayerScene');
            }
        });

        
        this.overview_assets();
    }

    create() {
        // Animatie van de vogels 
        this.anims.create({
            key: 'fly',
            repeat: -1,
            frameRate: 5,
            smoothed: false,
            frames: this.anims.generateFrameNames('boot_bird1', {start: 1, end: 4})
       
        });

        this.anims.create({
            key: 'fly2',
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNames('boot_bird2', {start: 1, end: 4})
       
        });

        // De achtergrond van het scherm
        
        this.bg = this.addImage(0, 0, 'bg');
        this.grid.placeAtIndex(60, this.bg); 
        this.bg_cloud6 = this.addImage(0, 0, 'bg_cloud6').setOrigin(0, 0.19);
        this.mntn1 = this.addImage(0, 0, 'bg_mntn1').setOrigin(0, 0);
        this.grid.scaleX(this.mntn1, 2.5);
       
        this.mntn2 = this.addImage(0, 0, 'bg_mntn2').setOrigin(0.13, 0);
       
        this.bg_trees1 = this.addImage(0, 0, 'bg_trees1').setOrigin(0.134, 0);
        this.bg_terrain_front = this.addImage(0, 0, 'bg_terrain_front').setOrigin(0, 0.17);
        this.bg_trees_front = this.addImage(0, 0, 'bg_trees_front').setOrigin(0, 0.17);
        this.bg_cloud5 = this.addImage(0, 0, 'bg_cloud5').setOrigin(0.05, 0.1);
       


       
        // Het morfit logo aan de bovenkant
        this.boot_morfitLogo = this.addImage(0, 0, 'boot_morfitLogo').setOrigin(0, 0);
        this.grid.placeAtIndex(2, this.boot_morfitLogo); 
        this.grid.scaleTo(this.boot_morfitLogo, 0.5, 500);
        // Beide vogels die in de lucht zweven
        this.boot_bird1 = this.add.sprite(0, 0, 'boot_bird1', 0);
        this.boot_bird1.play('fly');
        this.grid.placeAtIndex(35, this.boot_bird1);
        this.grid.scaleTo(this.boot_bird1, 0.3, 500);
        this.boot_bird2 = this.add.sprite(0, 0, 'boot_bird2');
        this.boot_bird2.play('fly2');
        this.grid.placeAtIndex(63, this.boot_bird2);
        this.grid.scaleTo(this.boot_bird2, 0.3, 500);
        // Plant aan de rechter van het scherm
        this.boot_plant2 = this.addImage(0, 0, 'boot_plant2');
        this.grid.placeAtIndex(108, this.boot_plant2);
        this.grid.scaleTo(this.boot_plant2, 0.17, 500);
        // De grond
        this.boot_ground = this.addImage(0, this.sys.game.config.height, 'boot_ground').setOrigin(0, 1);
        this.grid.scaleY(this.boot_ground, .22);
        // Boom aan de linkerkant van het scherm
        this.boot_plant1 = this.addImage(0, 0, 'boot_plant1');
        this.grid.placeAtIndex(89, this.boot_plant1);
        this.grid.scaleTo(this.boot_plant1, 0.28, 500);
        // De morfit in het midden van het scherm
        this.boot_morfitWalking = this.addImage(0, 0, 'boot_morfitWalking');
        this.grid.placeAtIndex(82, this.boot_morfitWalking);
        this.grid.scaleTo(this.boot_morfitWalking, .5);
        // De laad tekst onderaan het scherm
        this.boot_loadingText = this.add.text(0, 0, 'Je Morfit is onderweg', { fontFamily: 'Bubblegum Sans', fontSize: `60px`, fill: 'white'}).setOrigin(0.5, 0.5);
        this.grid.placeAtIndex(137, this.boot_loadingText);
        


        // this.boot_loadingText = this.addImage(0, 0, 'boot_loadingText');
        // this.grid.placeAtIndex(115, this.boot_loadingText);
        // this.grid.scaleTo(this.boot_loadingText, .9, 500);
        // this.grid.showNumbers();

    
        
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
    //     this.load.image('bg_mntn1', 'src/assets/bg/home/morfit walking.png');
    //     this.load.image('bg_mntn0', 'src/assets/bg/home/boot_ground.png');
     }
}



export default BootScene;