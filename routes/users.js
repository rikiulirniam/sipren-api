const router = require("express").Router();
const controllers = require("../controllers/users");
const token = require("../controllers/auth");
const verify = require("../middleware/verifyUser");

router.get("/", controllers.all);
router.get("/token", token.refreshToken);
router.post("/create", controllers.create);
router.put("/:id_user", controllers.update);
router.get("/:id_user", controllers.show);
router.delete("/:id_user", controllers.delete);

module.exports = router;
