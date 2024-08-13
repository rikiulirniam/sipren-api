const router = require("express").Router();
const controllers = require("../controllers/users")

router.get('/', controllers.all);
router.post('/login', controllers.login);
router.post('/register', controllers.register);

module.exports = router