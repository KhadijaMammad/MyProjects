const express = require('express')
const router = express.Router()
const authRoutes = require('./auth/authRouter')
const categoryRoutes = require('./category/categoryRouter')
const newsRoutes = require('./news/newsRouter')
const notesRoutes = require('./notes/notesRouter')



router.use('/auth', authRoutes)
router.use('/categories', categoryRoutes)
router.use('/news', newsRoutes)
router.use('/notes', notesRoutes)


module.exports = router