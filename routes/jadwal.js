const router = require("express").Router()
const controller = require("../controllers/jadwal");
const Verify = require("../middleware/verifyUser");

router.post("/", Verify.verifyLevel, controller.create);
router.get("/", controller.index);

module.exports = router