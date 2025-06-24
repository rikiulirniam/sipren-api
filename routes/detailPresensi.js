const router = require("express").Router();
const controller = require("../controllers/detailPresensi");

router.get("/:id_presensi", controller.show);
router.put("/:id_detail_presensi", controller.editKeterangan);
router.put("/:id_presensi/present", controller.present);

module.exports = router;
