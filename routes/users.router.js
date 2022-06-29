const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/me' ,userController.authenticateToken);
router.post('/signup', userController.signup);
router.post('/login', userController.login);
// router.get('/user', userController.getUser);


module.exports = router;
