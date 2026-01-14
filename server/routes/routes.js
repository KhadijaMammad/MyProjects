const express = require('express');
const router = express.Router()
const authRoutes = require('./auth/authRouter');
const categoryRoutes = require('./category/categoryRouter');
const newsRoutes = require('./news/newsRouter');
const notesRoutes = require('./notes/notesRouter');
const folderRoutes = require('./folder/folderRouter');
const calendarRoutes = require('./calendar/calendarRouter');
const googleAuthRoutes = require('../routes/auth/googleAuthRouter');
const taskRoutes = require('./task/taskRouter');
const dashboardRoutes = require('./dashboard/dashboardRouter');



router.use('/auth', authRoutes)
router.use('/categories', categoryRoutes)
router.use('/news', newsRoutes)
router.use('/notes', notesRoutes)
router.use('/folders', folderRoutes)
router.use('/calendar', calendarRoutes)
router.use('/google', googleAuthRoutes)
router.use('/tasks', taskRoutes)
router.use('/dashboard', dashboardRoutes)



module.exports = router