const express = require('express');
const router = express.Router();
const googleAuthController = require('../../controllers/googleAuthController');

router.get('/url', googleAuthController.getGoogleAuthUrl);

router.get('/auth/callback', googleAuthController.googleCallback);

module.exports = router;
