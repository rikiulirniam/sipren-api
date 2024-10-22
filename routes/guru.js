const router = require('express').Router();
const controller = require("../controllers/guru");
const verify = require("../middleware/verifyUser");

router.get('/', controller.index);
router.post('/create', verify.verifyToken, verify.verifyLevel ,controller.create);
router.put('/update', controller.update);

module.exports = router;