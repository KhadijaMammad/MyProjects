const authController = require('../../controllers/authController');

const router = require('express').Router();

router.post('/login', authController.loginUser);
router.post('/logout', authController.logoutUser);
router.post('/refresh', authController.refreshToken);

module.exports = router;