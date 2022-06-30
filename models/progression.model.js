const sql = require('../config/db');

const Progression = function (quiz) {
    // this.id = quiz.id;
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

//get level score
Progression.getLevelScore = (user, level, result) => {
    //res tab
    let test = 0;

    sql.query(`SELECT id FROM country WHERE level_id = ${level}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            // res = IDs of level countries
            console.log("found countries of this level: ", res);

            //loop through IDs
            for (let country_id in res) {
                console.log(res[country_id].id)
                sql.query(`SELECT SUM(score) AS score FROM progression WHERE user_id = ${user} AND country_id = ${res[country_id].id}`, (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(err, null);
                        return;
                    }
                    if (res.length) {
                        console.log("found score of this country: ", res[0].score);
                        test += res[0].score
                        //result(null, res);
                        // return;
                    }
                })
            console.log('test',test)

            } //end of loop
        }
            console.log('test',test)
        result({ kind: "not_found" }, null);
    })

            console.log('test',test)

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