const router = require("express").Router();
const controllers = require("../controllers/siswa");

router.get("/", controllers.all); 
router.get("/:nis", controllers.index);
router.put("/:old_nis", controllers.update);
router.delete("/:nis", controllers.delete);
router.post("/", controllers.create);

module.exports = router;
