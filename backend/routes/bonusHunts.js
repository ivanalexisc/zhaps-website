const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const { requireFields } = require('../middlewares/validate');
const controller = require('../controllers/bonusHuntController');

// Public routes (no auth required)
router.get('/', controller.list);
router.get('/:id', controller.getOne);

// Protected routes (auth required)
router.post('/', authenticateToken, requireFields(['startBalance']), controller.create);
router.put('/:id', authenticateToken, controller.update);
router.delete('/:id', authenticateToken, controller.remove);

module.exports = router;
