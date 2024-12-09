const router = require('express').Router();
const controller = require('../controllers/presensi');

router.get('/detail', controller.detail);
router.get('/:id_kelas', controller.index);
router.get('/', controller.all);
router.post('/', controller.create);
router.put('/:id_presensi', controller.update);
router.delete('/:id_presensi', controller.delete);

module.exports = router;