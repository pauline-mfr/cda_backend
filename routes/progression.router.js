const express = require('express');
const router = express.Router();

const progressionController = require('../controllers/progression.controller');
const auth = require("../middleware/auth");

router.get('/score/:user/:category/:country', auth, progressionController.getCategoryScore);
router.get('/score/:user/:country', auth, progressionController.getCountryScore);

//POST
router.post('/score', auth, progressionController.create);



module.exports = router;