const router = require("express").Router()
const controller = require("../controllers/jadwal");
const Verify = require("../middleware/verifyUser");

router.post("/", Verify.verifyLevel, controller.create);
router.get("/",Verify.verifyLevel, controller.all)
router.get("/mine", controller.index);
router.get("/:id_jadwal",Verify.verifyLevel, controller.detail)
router.put("/:id_jadwal", Verify.verifyLevel, controller.update);
router.delete("/:id_jadwal", Verify.verifyLevel, controller.delete)

module.exports = router