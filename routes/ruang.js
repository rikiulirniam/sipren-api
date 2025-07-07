const router = require("express").Router();
const controller = require("../controllers/ruang")

router.get("/", controller.all);

module.exports = router