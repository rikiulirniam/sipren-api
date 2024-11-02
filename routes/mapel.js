const router = require("express").Router();
const controller = require('../controllers/mapel');

router.get('/:produktif', controller.index);
router.get('/', controller.all);

module.exports = router;