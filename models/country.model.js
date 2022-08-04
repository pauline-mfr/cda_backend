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

Country.getByLevel = (id, result) => {
    sql.query(`SELECT * FROM country WHERE level = ${id}`, (err, res) => {
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

Country.getLevels = (results) => {
    sql.query("SELECT level FROM country GROUP BY level", (err, res) => {
        if (err) {
            console.log("error: ", err);
            results(null, err);
            return;
        }
        console.log("levels: ", res);
        results(null, res);
    })
}


Country.getUnlockedLevels = (results) => {
    sql.query("SELECT id FROM country WHERE unlocked = 1", (err, res) => {
        if (err) {
            console.log("error: ", err);
            results(null, err);
            return;
        }
        console.log("unlocked levels: ", res);
        results(null, res);
    })
}

Country.getIdentifier = (name, result) => {
    sql.query(`SELECT id FROM country WHERE name = '${name}'`, (err, res) => {
        console.log('CHECK',name)
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.length) {
            console.log("id country: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({kind: "not_found"}, null);
    });
}

module.exports = Country;