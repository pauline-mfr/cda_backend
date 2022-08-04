const express = require('express');
const router = express.Router();

const countryController = require('../controllers/country.controller');
const auth = require('../middleware/auth');

router.get('/', auth, countryController.getLevels);

module.exports = router;

