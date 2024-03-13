const router = require('express').Router();
const controller = require('../controllers/kelas');

router.get('/', controller.index);

module.exports = router;