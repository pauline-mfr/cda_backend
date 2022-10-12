const express = require('express');
const router = express.Router();

const questionController = require('../controllers/question.controller');
const auth = require("../middleware/auth");

router.get('/quiz/:country/:category', questionController.getQuiz);
router.get('/random/:country', questionController.getRandomQuiz);
router.get('/:id', questionController.getById);

router.get('/', questionController.getAndroidQuiz);

module.exports = router;