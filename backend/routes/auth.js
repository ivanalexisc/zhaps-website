
const express = require('express');
const router = express.Router();
const { register, login, me } = require('../controllers/authController');
const authenticateToken = require('../middlewares/authenticateToken');
const { requireFields } = require('../middlewares/validate');

router.post('/register', requireFields(['username','email','password']), register);
router.post('/login', requireFields(['email','password']), login);
router.get('/me', authenticateToken, me);

module.exports = router;
