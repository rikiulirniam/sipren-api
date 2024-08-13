const router = require("express").Router();
const controllers = require("../controllers/tingkat");

router.get('/', controllers.all);

module.exports = router;