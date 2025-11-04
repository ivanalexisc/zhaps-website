const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken');
const { requireFields } = require('../middlewares/validate');
const controller = require('../controllers/bonusHuntController');

router.use(authenticateToken);

router.get('/', controller.list);
router.get('/:id', controller.getOne);
router.post('/', requireFields(['startBalance']), controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
