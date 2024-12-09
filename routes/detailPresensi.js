const router = require("express").Router();
const controller = require("../controllers/detailPresensi");

router.get("/", controller.all);
router.get("/:id_presensi", controller.show);
router.post("/", controller.create);
router.put("/", controller.updateKeterangan);

module.exports = router;
