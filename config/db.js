const mysql = require('mysql');

//db connexion
const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "",
    database: "euro_quiz"
});

db.connect(error => {
    if(error) throw error;
    console.log('Connexion MySQL réussie !');
});

module.exports = db;