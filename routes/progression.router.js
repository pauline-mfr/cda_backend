const express = require('express');
const router = express.Router();

const progressionController = require('../controllers/progression.controller');
const auth = require("../middleware/auth");

router.get('/category/:user/:category/:country', auth, progressionController.getCategoryScore);
router.get('/country/:user/:country', auth, progressionController.getCountryScore);
router.get('/level/:user/:level', auth, progressionController.getLevelScore);

//get total questions
router.get('/stats/1/:user', auth, progressionController.getTotalQuestions);
//get total correct
router.get('/stats/2/:user', auth, progressionController.getTotalCorrectAnswers)
//get average score
router.get('/stats/3/:user', auth, progressionController.getAverageScore)
//greatest category
router.get('/stats/4/:user', auth, progressionController.getBestCategory)

//POST
router.post('/', auth, progressionController.create);

//PATCH
router.patch('/:id/:score', auth, progressionController.update);

module.exports = router;