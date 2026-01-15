const express = require('express');
const router = express.Router();
const { startDiscussion, getAllTalks, getOneTalk } = require('../../controllers/gemTalkController');
const AuthMiddleware = require('../../middleware/authMiddleware');

router.post('/discuss', AuthMiddleware, startDiscussion);
router.get('/history', AuthMiddleware, getAllTalks);
router.get('/history/:id', AuthMiddleware, getOneTalk);

module.exports = router;