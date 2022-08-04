const sql = require('../config/db');

const Progression = function (quiz) {
    this.id = quiz.id;
    this.user_id = quiz.user_id;
    this.category_id = quiz.category_id;
    this.country_id = quiz.country_id;
    this.score = quiz.score;
}

Progression.getCategoryScore = (user, category, country, results) => {
    sql.query(`SELECT id, score FROM progression WHERE user_id = ${user} AND category_id = ${category} AND country_id = ${country}`, (err, res) => {
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

Progression.getLevelScore = (user, level, result) => {
    sql.query(`SELECT SUM(score) AS score FROM progression INNER JOIN country ON progression.country_id = country.id WHERE level = ${level} AND user_id = ${user}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("level score: ", res);
        result(null, res);
    })
}

Progression.getTotalQuestions = (user, result) => {
    sql.query(`SELECT COUNT(id) AS total FROM progression WHERE user_id = ${user}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("total answered questions: ", res);
        result(null, res);
    })
}

Progression.getTotalCorrectAnswers = (user, result) => {
    sql.query(`SELECT SUM(score) AS total FROM progression WHERE user_id = ${user}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("total correct answers: ", res);
        result(null, res);
    })
}

Progression.getAverageScore = (user, result) => {
    sql.query(`SELECT AVG(score) AS average FROM progression WHERE user_id = ${user}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("average score: ", res);
        result(null, res);
    })
}

Progression.getBestCategory = (user, result) => {
    sql.query(`SELECT category_id, SUM(score) AS best FROM progression WHERE user_id = ${user} GROUP BY category_id ORDER BY best DESC LIMIT 1`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("best category: ", res);
        result(null, res);
    })
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

Progression.update = (id, score, result) => {
    sql.query(`UPDATE progression SET score = ${score} WHERE id = ${id}`, (err, res) => {
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