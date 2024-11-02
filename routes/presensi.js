const router = require('express').Router();
const controller = require('../controllers/presensi');

router.get('/', controller.all);
router.post('/', controller.create);
router.put('/:id_presensi', controller.update);
router.delete('/:id_presensi', controller.delete);
router.get('/:id_kelas', controller.index);

module.exports = router;