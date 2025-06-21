const router = require('express').Router();
const controller = require('../controllers/kelas');

router.get('/', controller.index);
router.post('/', controller.create);
router.put('/:id_kelas', controller.update);
router.delete('/:id_kelas', controller.delete);
router.get('/:id_kelas', controller.detail);

module.exports = router;