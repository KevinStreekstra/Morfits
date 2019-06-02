export function dailyQuiz_assets() {
    //DailyScene background
    this.load.image('Daily:bg', require('../assets/daily_reward/pop-up/quiz/backgrounds/modal_backdrop.png'));
    this.load.image('Daily:BgMask', require('../assets/daily_reward/pop-up/quiz/backgrounds/popup_background_detail.png'));
    this.load.image('Daily:popup', require('../assets/daily_reward/pop-up/quiz/backgrounds/popup_background.png'));

    //DailyScene popup
    this.load.image('Daily:active', require('../assets/daily_reward/pop-up/quiz/backgrounds/popup_toggle_background_active.png'));
    this.load.image('Daily:Mission', require('../assets/daily_reward/pop-up/quiz/text/txt_weekly_mission.png'));
    this.load.image('Daily:Planktxt', require('../assets/daily_reward/pop-up/quiz/text/txt_instructions_reward.png'));
    this.load.image('Daily:popupPlank', require('../assets/daily_reward/pop-up/quiz/backgrounds/plank_background.png'));
    this.load.image('Daily:quit', require('../assets/daily_reward/pop-up/quiz/buttons/btn_close.png'));
    this.load.image('Daily:Quiz', require('../assets/daily_reward/pop-up/quiz/text/txt_quiz_day.png'));
    this.load.image('Daily:ribbonCoins', require('../assets/daily_reward/pop-up/quiz/icons/rewards_icon.png'));
    this.load.image('Daily:seperator', require('../assets/daily_reward/pop-up/quiz/backgrounds/popup_seperator.png'));
    this.load.image('Daily:start', require('../assets/daily_reward/pop-up/quiz/buttons/btn_start.png'));
}
