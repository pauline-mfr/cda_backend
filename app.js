/* CONTAINS THE EXPRESS APP */

// import express
const express = require('express');
//création app express
const app = express();

// ROUTES
const usersRouter = require('./routes/users.router');
const categoriesRouter = require('./routes/categories.router');
const levelsRouter = require('./routes/levels.router');
const countriesRouter = require('./routes/countries.router');
const questionsRouter = require('./routes/questions.router');
const choicesRouter = require('./routes/choices.router');

// TEST
const square = require('./config/db.config');
// console.log('area = ', square.area(4));

//middleware appliqué à toutes les requêtes
//permet à l'API d'être accessible partout, erreur de CORS
app.use((req, res, next) => {
   //on ajoute des headers à nos réponses json
    res.setHeader('Access-Control-Allow-Origin', '*'); //origin = all
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //allow headers
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //allow methods
    next();
});

// chaque app.use() == middleware qui doit renvoyer au suivant

//pour permettre l'accès au corps json d'une request grâce au req.body
app.use(express.json());

app.use('/auth', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/levels', levelsRouter);
app.use('/countries', countriesRouter);
app.use('/questions', questionsRouter);
app.use('/choices', choicesRouter);

//permet d'y accéder depuis les autres fichiers
module.exports = app;



//TO DO

/*
* delete return
* voir si modif SELECT *
* vérif question + choices routes
*
* */













//db connexion
// const db = require('./config/db');
// const mysql = require('mysql');



//route = url utilisée par l'app
// app.get('/api/categories', function (req, res) {
//     db.query('SELECT * FROM category', function (error, results, fields) {
//         if(error) throw error;
//         return res.send({error: false,results, message:'category list'})
//     });
// });
//
// //get one
// app.get('/api/categories/:id', function (req, res) {
//     let cat_id = req.params.id;
//     if (!cat_id) {
//         return res.status(400).send({ error: true, message: 'undefined category' });
//     }
//     db.query('SELECT * FROM category where id=?', cat_id, function (error, results) {
//         if (error) throw error;
//         return res.send({ error: false, data: results[0], message: 'category found' });
//     });
// })