class DailyQuiz extends Phaser.Scene {
    constructor(props) {
        super({
            key: 'DailyQuiz'
        });
        this.question;
     
    }

    preload() {

    }

    create() {
        this.question = this.add.text(20, 50, `Waarom zijn bananen krom?`);
      

    }

    createOption(id, option1, option2, option3) {
        const options = {
            id: id,
            option1: option1,
            option2: option2,
            option3, option3
        }
    
    }

  

}

export default DailyQuiz;