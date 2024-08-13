const router = require('express').Router();
const controller = require("../controllers/guru");

router.get('/', controller.index);
router.post('/create', controller.create);

module.exports = router;