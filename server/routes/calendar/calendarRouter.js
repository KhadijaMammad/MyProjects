const express = require('express');
const router = express.Router();
const calendarController = require('../../controllers/calendarController')
const authMiddleware = require('../../middleware/authMiddleware'); 

router.post('/ai-sync', authMiddleware, calendarController.handleAICommand);
router.get('/events', authMiddleware, calendarController.getMyEvents);

module.exports = router;