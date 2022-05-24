const sql = require('../config/db');

const Country = function(country) {
    this.id = country.id;
    this.name = country.name;
};

Country.getAll = (result) => {
    sql.query("SELECT * FROM country", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("countries: ", res);
        result(null, res);
    })
}

Country.getByLevel = (id, result) => {
    sql.query(`SELECT * FROM country WHERE level_id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found countries of this level: ", res);
            result(null, res);
            return;
        }
        result({ kind: "not_found" }, null);
    })
}

Country.getById = (id, result) => {
    sql.query(`SELECT * FROM country WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found country: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    });
};

module.exports = Country;