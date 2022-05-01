// import qui permet de créer un server
// require == import
const  http = require('http');

//import de l'application express
const app = require('./app')  // -> app.js file

//dire à express quel port on va écouter
app.set('port', process.env.PORT || 3000);

//gestion des erreurs
const errorHandler = error => {
    if(errors.syscall !== 'listen') {
        throw error;
    }}

// fonction qui sera reçue à chaque requête du server
const server = http.createServer(app);


console.log('SERVER ON');

// TEST CONN DB
// const mysql = require('mysql');
// const db = mysql.createConnection({
//     host:"localhost",
//     user: "root",
//     password: "5CCm6rFa/yX7jw==",
//     database: "euro_quiz"
// });
//
// db.connect(function(err) {
//     if(err) throw err;
//     console.log("Connexion MySQL réussie !");
//     db.query("SELECT * FROM category", function (err, result) {
//         if (err) throw err;
//         console.log('categories ',result);
//     });
// })
//
// db.end();

// set le port à écouter
server.listen(process.env.PORT || 3000);