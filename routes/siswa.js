const router = require('express').Router();
const controllers = require('../controllers/siswa')

router.get('/', controllers.all);
router.get('/:id_kelas', controllers.index);

module.exports = router;