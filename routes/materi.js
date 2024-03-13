const router = require('express').Router();
const controller = require('../controllers/materi');

router.post('/', controller.store);
router.get('/:id_materi', controller.show);

module.exports = router;