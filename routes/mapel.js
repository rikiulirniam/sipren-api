const router = require("express").Router();
const controller = require('../controllers/mapel');

router.get('/', controller.index);

module.exports = router;