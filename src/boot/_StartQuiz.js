export function StartQuiz() {
    // Start quiz elements
    this.load.image(
        'Quiz:bg',
        require('../assets/daily_reward/quiz/start/tab_background.png')
    )

    this.load.image(
        'Quiz:Start',
        require('../assets/daily_reward/quiz/start/txt_quiz_daily.png')
    )

    this.load.image(
        'Quiz:Btn',
        require('../assets/daily_reward/quiz/start/btn_start.png')
    )

    // Planks
    this.load.image(
        'Quiz:Plank_1',
        require('../assets/daily_reward/quiz/start/plank_rotated_right.png')
    )

    this.load.image(
        'Quiz:Plank_2',
        require('../assets/daily_reward/quiz/start/plank_straight.png')
    )

    this.load.image(
        'Quiz:Plank_3',
        require('../assets/daily_reward/quiz/start/plank_rotated_left.png')
    )

    this.load.image(
        'Quiz:Plank_4',
        require('../assets/daily_reward/quiz/start/plank_rotated_right_small.png')
    )
}
