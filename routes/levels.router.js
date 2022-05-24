const express = require('express');
const router = express.Router();

const levelController = require('../controllers/level.controller');

router.get('/', levelController.getAll);
router.get('/:id', levelController.getById);

module.exports = router;
