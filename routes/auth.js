const router = require("express").Router();
const auth = require("../controllers/auth");
const Verify = require("../middleware/verifyUser");

router.post("/login", auth.login);
router.post("/register", auth.register);
router.put("/change_password", Verify.verifyToken, auth.changePassword)
router.delete("/logout", auth.logout);
router.get("/token", auth.refreshToken);

module.exports = router;
