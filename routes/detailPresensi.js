const router = require('express').Router();
const controller = require("../controllers/detailPresensi");

router.get("/", controller.all)
router.post("/", controller.create)

module.exports = router