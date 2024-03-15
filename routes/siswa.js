const router = require('express').Router();
const controller = require('../controllers/siswa.js');

router.get('/', controller.index);

router.post('/', controller.store);

router.put("/:nis", controller.update);

router.delete('/:nis', controller.delete);

module.exports = router;