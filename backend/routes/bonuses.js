const express = require('express');
const router = express.Router({ mergeParams: true });
const authenticateToken = require('../middlewares/authenticateToken');
const { requireFields } = require('../middlewares/validate');
const controller = require('../controllers/bonusController');

router.use(authenticateToken);

router.post('/', requireFields(['slotName', 'bet']), controller.create);
router.put('/:bonusId', controller.update);
router.delete('/:bonusId', controller.remove);

module.exports = router;