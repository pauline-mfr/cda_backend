const sql = require('../config/db');

const Progression = function (quiz) {
    // this.id = quiz.id;
    this.user_id = quiz.user_id;
    this.category_id = quiz.category_id;
    this.country_id = quiz.country_id;
    this.score = quiz.score;
}

Progression.getCategoryScore = (user, category, country, results) => {
    sql.query(`SELECT score FROM progression WHERE user_id = ${user} AND category_id = ${category} AND country_id = ${country}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            results(null, err);
            return;
        }
        console.log("category score: ", res);
        results(null, res);
    })
}

Progression.getCountryScore = (user, country, results) => {
    sql.query(`SELECT SUM(score) AS score FROM progression WHERE user_id = ${user} AND country_id = ${country}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            results(null, err);
            return;
        }
        console.log("country score: ", res);
        results(null, res);
    })
}

//get level score
Progression.getLevelScore = () => {

}

Progression.create = (progression, result) => {
    sql.query('INSERT INTO progression SET ?', [progression], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("score registered", res);
        result(null, res);
    })
}

//update quiz score
Progression.update = (user, category, country, score, result) => {
    sql.query(`UPDATE progression SET score = ${score} WHERE user_id = ${user} AND category_id = ${category} AND country_id = ${country}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("score updated", res);
        result(null, res);
    })
}

module.exports = Progression;