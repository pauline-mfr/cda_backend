const sql = require('../config/db');

const User = function(user) {
    this.id = user.id;
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
};

User.checkUser = (user, result) => {
    sql.query("SELECT * FROM user WHERE username = ?", [user.username], (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("users: ", res);
        result(null, res);
    })
};

User.create = (user, result) => {
    sql.query("INSERT INTO user (username, password, email) VALUES (?, ?, ?)", [user.username, user.password, user.email], (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    })
};

User.getUser = (username, result) => {
    sql.query(`SELECT id, username FROM user WHERE username = '${username}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(res);
        result(null, res);
    })
}

module.exports = User;