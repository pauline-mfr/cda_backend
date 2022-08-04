const express = require('express');
const router = express.Router();

const countryController = require('../controllers/country.controller');
const auth = require("../middleware/auth");

router.get('/', auth, countryController.getAll);
router.get('/:id', auth, countryController.getById);
router.get('/level/:id', auth, countryController.getByLevel);
router.get('/unlocked/all', auth, countryController.getUnlockedLevels);
//Retrieving id
router.get('/identifier/:name', auth, countryController.getIdentifier);

module.exports = router;
