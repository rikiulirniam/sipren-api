const router = require('express').Router();
const controller = require("../controllers/guru");

router.get('/', controller.index);

module.exports = router;