const express = require('express');
const router = express.Router({ mergeParams: true });
const authenticateToken = require('../middlewares/authenticateToken');
const { requireFields } = require('../middlewares/validate');
const controller = require('../controllers/bonoController');

router.use(authenticateToken);

router.post('/', requireFields(['juego','apuesta']), controller.create);
router.put('/:bonoId', controller.update);
router.delete('/:bonoId', controller.remove);

module.exports = router;
