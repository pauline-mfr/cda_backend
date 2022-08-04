const sql = require('../config/db');

const Category = function(category) {
    this.id = category.id;
    this.name = category.name;
};

Category.getAll = (result) => {
    let query = "SELECT * FROM category";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("categories: ", res);
        result(null, res);
    });
};

Category.getById = (id, result) => {
    sql.query(`SELECT * FROM category WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found category: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

Category.getNextCategory = (id, result) => {
    console.log('THIS IS ID', id)
    sql.query(`SELECT id, name FROM category WHERE id = ${id}+1`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found next category: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
}

Category.getIdentifier = (name, result) => {
    sql.query(`SELECT id FROM category WHERE name = '${name}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("found id: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
}

module.exports = Category;
