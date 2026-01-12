const express = require('express');
const router = express.Router();
const googleAuthController = require('../../controllers/googleAuthController');
const AuthMiddleware = require('../../middleware/authMiddleware');

router.get('/url', AuthMiddleware, googleAuthController.getGoogleAuthUrl);

router.get('/callback', googleAuthController.googleCallback);

module.exports = router;
