class Player {
    constructor() {
        this.player = {};
    }

    init() {
        if(!localStorage.getItem('energy') || localStorage.getItem('energy') === null)
            localStorage.setItem('energy', JSON.stringify(100));

        if(!localStorage.getItem('food') || localStorage.getItem('food') === null)
            localStorage.setItem('food', JSON.stringify(100));

        if(!localStorage.getItem('health') || localStorage.getItem('health') === null)
            localStorage.setItem('health', JSON.stringify(100));

        if(!localStorage.getItem('xp') || localStorage.getItem('xp') === null)
            localStorage.setItem('xp', JSON.stringify(0));
    }

    get() {
        this.player.energy = JSON.parse(localStorage.getItem('energy'));
        this.player.food = JSON.parse(localStorage.getItem('food'));
        this.player.health = JSON.parse(localStorage.getItem('health'));
        this.player.xp = JSON.parse(localStorage.getItem('xp'));
        return this.player;
    }

    getEnergy() {
        return this.player.energy;
    }

    getFood() {
        return this.player.food;
    }

    getHealth() {
        return this.player.health;
    }

    getXP() {
        return this.player.xp;
    }

    getLevel() {
        return Math.floor(Math.floor(25 + Math.sqrt(625 + 100 * this.getXP())) / 50);
    }

    getRequiredXP(level) {
        return 25 * (level+1) * (level+1)  - 25 * (level+1);
    }

    getLevelProgress() {
        return (0);
    }

    getDailyQuestion() {
        const questions = [
            {
              question: "Wat is het gezondst?",
              answers: {
                a: "Banaan",
                b: "Hamburger",
                c: "Spaghetti"
              },
              correctAnswer: "a"
            },
            {
              question: "Je moet minimaal 30 minuten bewegen per dag?",
              answers: {
                a: "Waar",
                b: "Niet waar",
              },
              correctAnswer: "a"
            },
            {
              question: "Moet je minimaal 5 liter water per dag drinken?",
              answers: {
                a: "Ja",
                b: "Nee",
              },
              correctAnswer: "b"
            }
        ];
        return questions[Math.floor(Math.random() * questions.length)];
    }
}

export default Player;