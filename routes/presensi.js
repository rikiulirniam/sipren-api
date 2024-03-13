const router = require('express').Router();
const controller = require('../controllers/presensi');

router.get('/', controller.index);

module.exports = router;