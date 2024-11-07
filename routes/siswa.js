const router = require('express').Router();
const controllers = require('../controllers/siswa')

router.delete("/:nis", controllers.delete);
router.put("/:nis", controllers.update);
router.get('/', controllers.all);
router.get('/:rfid', controllers.index);
router.post('/', controllers.create);

module.exports = router;