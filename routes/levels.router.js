const express = require('express');
const router = express.Router();

const levelController = require('../controllers/level.controller');
const auth = require('../middleware/auth');

router.get('/', auth, levelController.getAll);
router.get('/:id', auth, levelController.getById);

module.exports = router;
