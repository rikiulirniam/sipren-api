const router = require("express").Router();
const controller = require("../controllers/detailPresensi");

router.get("/", controller.all);
router.get("/:id_presensi", controller.show);
router.post("/", controller.create);

module.exports = router;
