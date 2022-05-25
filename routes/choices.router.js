const express = require('express');
const router = express.Router();

const choiceController = require('../controllers/choice.controller');

router.get('/:question', choiceController.getChoices);

module.exports = router;