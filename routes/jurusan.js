const router = require('express').Router();
const controller = require('../controllers/jurusan');

router.get('/', controller.index);

module.exports = router;