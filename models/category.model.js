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
            console.log("found tutorial: ", res[0]);
            result(null, res[0]);
            return;
        }
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    });
};

module.exports = Category;
