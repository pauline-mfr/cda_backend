const express = require('express');
const router = express.Router();

const progressionController = require('../controllers/progression.controller');
const auth = require("../middleware/auth");

router.get('/category/:user/:category/:country', auth, progressionController.getCategoryScore);
router.get('/country/:user/:country', auth, progressionController.getCountryScore);
router.get('/level/:user/:level', auth, progressionController.getLevelScore);

//POST
router.post('/', auth, progressionController.create);

//PATCH
router.patch('/:id/:score', auth, progressionController.update);

module.exports = router;