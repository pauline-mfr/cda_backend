const express = require('express');
const router = express.Router();
// const db = require("../config/db");

const categoryController = require('../controllers/category.controller');
const auth = require("../middleware/auth");


router.get("/", auth, categoryController.getAll);
router.get('/:id', auth, categoryController.getById);
router.get('/:id/next', auth, categoryController.getNextCategory);
router.get('/identifier/:name', auth, categoryController.getIdentifier);

module.exports = router;

// middleware that is specific to this router
// router.get('/', function (req, res) {
//     db.query('SELECT * FROM category', function (error, results, fields) {
//         if(error) throw error;
//         return res.send({error: false,results, message:'category list'})
//     });
// });

//get one
// router.get('/:id', function (req, res) {
//     let cat_id = req.params.id;
//     if (!cat_id) {
//         return res.status(400).send({ error: true, message: 'undefined category' });
//     }
//     db.query('SELECT * FROM category where id=?', cat_id, function (error, results) {
//         if (error) throw error;
//         return res.send({ error: false, data: results[0], message: 'category found' });
//     });
// })
