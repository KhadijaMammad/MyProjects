const express = require('express')
const router = express.Router()
const authRoutes = require('./auth/authRouter')
const categoryRoutes = require('./category/categoryRouter')
const newsRoutes = require('./news/newsRouter')
const notesRoutes = require('./notes/notesRouter')
const folderRoutes = require('./folder/folderRouter')



router.use('/auth', authRoutes)
router.use('/categories', categoryRoutes)
router.use('/news', newsRoutes)
router.use('/notes', notesRoutes)
router.use('/folders', folderRoutes)



module.exports = router