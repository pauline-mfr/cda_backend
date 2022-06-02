const express = require('express');
const router = express.Router();

const questionController = require('../controllers/question.controller');

router.get('/random/:country', questionController.getRandomQuiz);
router.get('/quiz/:country/:category', questionController.getQuiz);
router.get('/:id', questionController.getById);

module.exports = router;