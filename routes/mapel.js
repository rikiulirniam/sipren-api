const router = require("express").Router();
const controller = require('../controllers/mapel');

router.get('/:produktif', controller.index);
router.get('/', controller.all);
router.post('/', controller.create);
router.put('/:id_mapel', controller.update);
router.delete('/:id_mapel', controller.delete);

module.exports = router;