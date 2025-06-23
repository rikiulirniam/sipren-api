const router = require('express').Router();
const controller = require('../controllers/presensi');

router.get('/:id_presensi', controller.detail);
router.get('/kelas/:id_kelas', controller.index);
router.get('/', controller.all);
router.post('/', controller.create);
router.put('/:id_presensi', controller.update);
router.delete('/:id_presensi', controller.delete);

module.exports = router;