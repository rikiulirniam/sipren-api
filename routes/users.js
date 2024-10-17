const router = require("express").Router();
const controllers = require("../controllers/users")
const token = require("../controllers/auth")
// import { verifyToken } from "../middleware/verifyToken";
const verify = require("../middleware/verifyToken");

router.get('/', verify.verifyToken, controllers.all);
router.get('/token', token.refreshToken);
// router.post('/login', controllers.login);
// router.post('/register', controllers.register);

module.exports = router