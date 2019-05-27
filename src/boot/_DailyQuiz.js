export function dailyQuiz_assets() {
    //DailyScene background
    this.load.image('Daily:bg', require('../assets/daily_reward_pop-up/daily_reward_pop-up_quiz/overlay@2x.png'));
    this.load.image('Daily:popup', require('../assets/daily_reward_pop-up/daily_reward_pop-up_quiz/popup_daily_background@2x.png'));
    this.load.image('Daily:BgMask', require('../assets/daily_reward_pop-up/daily_reward_pop-up_quiz/mask_group_2@2x.png'));

    //DailyScene popup
    this.load.image('Daily:quit', require('../assets/daily_reward_pop-up/daily_reward_pop-up_quiz/btn_close@2x.png'));
    this.load.image('Daily:start', require('../assets/daily_reward_pop-up/daily_reward_pop-up_quiz/btn_start-quiz@2x.png'));
    this.load.image('Daily:popupPlank', require('../assets/daily_reward_pop-up/daily_reward_pop-up_quiz/popup_plank@2x.png'));
    this.load.image('Daily:Planktxt', require('../assets/daily_reward_pop-up/daily_reward_pop-up_quiz/quiz_van_de_week@2x.png'));
    this.load.image('Daily:ribbonCoins', require('../assets/daily_reward_pop-up/daily_reward_pop-up_quiz/popup_ribbon_coins_5@2x.png'));
    this.load.image('Daily:active', require('../assets/daily_reward_pop-up/daily_reward_pop-up_quiz/popup_reward_swipe@2x.png'));
    this.load.image('Daily:Quiz', require('../assets/daily_reward_pop-up/daily_reward_pop-up_quiz/quiz_van_de_dag@2x.png'));
    this.load.image('Daily:seperator', require('../assets/daily_reward_pop-up/daily_reward_pop-up_quiz/popup_quiz_border@2x.png'));
    this.load.image('Daily:Mission', require('../assets/daily_reward_pop-up/daily_reward_pop-up_quiz/missie_van_de_week@2x.png'));
}
