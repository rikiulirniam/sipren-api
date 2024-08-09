const router = require('express').Router();
const controllers = require('../controllers/siswa')

router.get('/', controllers.index);

module.exports = router;