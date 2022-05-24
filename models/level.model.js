const sql = require('../config/db');

const Level = function(level) {
    this.id = level.id;
    this.number = level.number;
};

Level.getAll = (result) => {
    sql.query("SELECT * FROM level", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("levels: ", res);
        result(null, res);
    })
}

Level.getById = (id, result) => {
    sql.query(`SELECT * FROM level WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found level: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

module.exports = Level;