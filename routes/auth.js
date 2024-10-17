const router = require('express').Router();
const auth = require("../controllers/auth");

// router.post('/signup', auth);

// Rute untuk login
router.post('/login', auth.login);
router.post('/register', auth.register);
router.delete('/logout', auth.logout);
router.get('/token', auth.refreshToken);

module.exports = router;