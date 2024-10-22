const router = require('express').Router();
const controller = require('../controllers/kelas');

router.get('/', controller.index);
router.post('/', controller.create);
router.put('/', controller.update);
router.delete('/:id_kelas', controller.delete);

module.exports = router;