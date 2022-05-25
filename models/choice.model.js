const sql = require('../config/db');

const Choice = function (answer) {
    this.id = answer.id;
    this.question_id = answer.question_id; //title?
    this.choice = answer.choice;
    this.is_correct = answer.is_correct;
}

Choice.getChoices = (question, results) => {
    sql.query(`SELECT * FROM choice WHERE question_id = ${question}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            results(null, err);
            return;
        }
        console.log("choices: ", res);
        results(null, res);
    })
}

module.exports = Choice;