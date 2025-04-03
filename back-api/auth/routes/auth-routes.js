const express = require('express');
const AuthController = require('../controllers/auth-controller');
const { validateRegister, validateLogin } = require('../../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', validateRegister, AuthController.registerUser);
router.post('/login', validateLogin, AuthController.loginUser);

module.exports = router;