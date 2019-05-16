class Player {
    constructor() {
        this.player = {};
    }

    init(username) {
        if(!localStorage.getItem('username') || localStorage.getItem('username') === null)
            localStorage.setItem('username', username);

        if(!localStorage.getItem('energy') || localStorage.getItem('energy') === null)
            localStorage.setItem('energy', JSON.stringify(100));

        if(!localStorage.getItem('power') || localStorage.getItem('power') === null)
            localStorage.setItem('power', JSON.stringify(100));

        if(!localStorage.getItem('mentality') || localStorage.getItem('mentality') === null)
            localStorage.setItem('mentality', JSON.stringify(100));

        if(!localStorage.getItem('xp') || localStorage.getItem('xp') === null)
            localStorage.setItem('xp', JSON.stringify(0));

        if(!localStorage.getItem('powerpoints') || localStorage.getItem('powerpoints') === null)
            localStorage.setItem('powerpoints', JSON.stringify(0));

        if(!localStorage.getItem('morfos') || localStorage.getItem('morfos') === null)
            localStorage.setItem('morfos', JSON.stringify(0));
    }

    exists() {
        if(!localStorage.getItem('username') || localStorage.getItem('username') === null) {
            return false;
        } else {
            return true;
        }
    }

    get() {
        this.player.username = localStorage.getItem('username');
        this.player.energy = JSON.parse(localStorage.getItem('energy'));
        this.player.power = JSON.parse(localStorage.getItem('power'));
        this.player.mentality = JSON.parse(localStorage.getItem('mentality'));
        this.player.xp = JSON.parse(localStorage.getItem('xp'));
        this.player.powerpoints = JSON.parse(localStorage.getItem('powerpoints'));
        this.player.morfos = JSON.parse(localStorage.getItem('morfos'));
        return this.player;
    }

    getUsername() {
        return localStorage.getItem('username');
    }

    getEnergy() {
        return JSON.parse(localStorage.getItem('energy'));
    }

    getMentality() {
        return JSON.parse(localStorage.getItem('mentality'));
    }

    getPower() {
        return JSON.parse(localStorage.getItem('power'));
    }

    getXP() {
        return JSON.parse(localStorage.getItem('xp'));
    }

    getPowerPoints() {
        return JSON.parse(localStorage.getItem('powerpoints'));
    }

    getMorfos() {
        return JSON.parse(localStorage.getItem('morfos'));
    }

    getLevel() {
        return Math.floor(Math.floor(25 + Math.sqrt(625 + 100 * this.getXP())) / 50);
    }

    getRequiredXP(level) {
        return 25 * (level + 1) * (level + 1)  - 25 * (level + 1);
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