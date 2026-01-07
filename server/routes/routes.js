const express = require('express')
const router = express.Router()
const authRoutes = require('./auth/authRouter')
const categoryRoutes = require('./category/categoryRouter')
const newsRoutes = require('./news/newsRouter')



router.use('/auth', authRoutes)
router.use('/categories', categoryRoutes)
router.use('/news', newsRoutes)


module.exports = router