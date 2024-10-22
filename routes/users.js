const router = require("express").Router();
const controllers = require("../controllers/users")
const token = require("../controllers/auth")
const verify = require("../middleware/verifyUser");

router.get('/', verify.verifyToken, verify.verifyLevel,  controllers.all);
router.get('/token', token.refreshToken);
// router.post('/login', controllers.login);
// router.post('/register', controllers.register);

module.exports = router