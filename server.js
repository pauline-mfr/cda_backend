// import qui permet de créer un server
// require == import
const  http = require('http');

//import de l'application express
const app = require('./app')  // -> app.js file

//dire à express quel port on va écouter
app.set('port', process.env.PORT || 3000);

//gestion des erreurs
const errorHandler = error => {
    if(error.syscall !== 'listen') {
        throw error;
    }}

// fonction qui sera reçue à chaque requête du server
const server = http.createServer(app);

console.log('SERVER ON');

// set le port à écouter
server.listen(process.env.PORT || 3000);