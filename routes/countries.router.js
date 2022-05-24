const express = require('express');
const router = express.Router();

const countryController = require('../controllers/country.controller');

router.get('/', countryController.getAll);
router.get('/level/:id', countryController.getByLevel);
router.get('/:id', countryController.getById);

module.exports = router;
