const express = require('express');
const router = express.Router();

const questionController = require('../controllers/question.controller');
const auth = require("../middleware/auth");

router.get('/random/:country', auth, questionController.getRandomQuiz);
router.get('/quiz/:country/:category', auth, questionController.getQuiz);
router.get('/:id', auth, questionController.getById);

module.exports = router;