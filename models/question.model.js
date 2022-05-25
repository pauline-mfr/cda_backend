const sql = require('../config/db');

const Question = function (question) {
    this.id = question.id;
    this.country_id = question.country_id;
    this.category_id = question.category_id;
    this.question = question.question;
    this.type = question.type;
};

Question.getQuiz = (country, category, results) => {
    sql.query(`SELECT * FROM question WHERE country_id = ${country} AND category_id = ${category}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            results(null, err);
            return;
        }
        console.log("quiz: ", res);
        results(null, res);
    })
}

Question.getById = (id, result) => {
    sql.query(`SELECT * FROM question WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found question: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: 'not_found'}, null);
    });
}

module.exports = Question;