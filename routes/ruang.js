const router = require("express").Router();
const controller = require("../controllers/ruang")

router.get("/", controller.all);
router.post("/", controller.create);
router.delete("/:id_ruang", controller.delete)


module.exports = router