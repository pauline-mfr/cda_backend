const sql = require('../config/db');

const Progression = function (quiz) {
    this.id = quiz.id;
    this.user_id = quiz.user_id;
    this.category_id = quiz.category_id;
    this.country_id = quiz.country_id;
    this.score = quiz.score;
}


//get category score
Progression.getCategoryScore = (user, category, country, results) => {
    sql.query(`SELECT score FROM progression WHERE user_id = ${user} AND category_id = ${category} AND country_id = ${country} ` , (err, res) => {
        if (err) {
            console.log("error: ", err);
            results(null, err);
            return;
        }
        console.log("category score: ", res);
        results(null, res);
    })
}

//get country score
Progression.getCountryScore = (user, country, results) => {
    sql.query(`SELECT *, SUM(score) FROM progression WHERE user_id = ${user} AND country_id = ${country}`, (err, res) => {
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

//add quiz score
Progression.addCategoryScore = (user, category, country, score, results) => {
    sql.query(`INSERT INTO progression (user_id, category_id, country_id, score) VALUES (${user}, ${category}, ${country}, ${score})`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            results(null, err);
            return;
        }
        console.log("score registered", res);
        results(null, res);
    })

}

//update quiz score
Progression.updateCategoryScore = (user, category, country, score, results) => {
    sql.query(`UPDATE progression SET score = ${score} WHERE user_id = ${user} AND category_id = ${category} AND country_id = ${country}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            results(null, err);
            return;
        }
        console.log("score updated", res);
        results(null, res);
    })
}

module.exports = Progression;