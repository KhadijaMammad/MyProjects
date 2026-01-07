const express = require('express')
const router = express.Router()
const authRoutes = require('./auth/authRouter')
const categoryRoutes = require('./category/categoryRouter')


router.use('/auth', authRoutes)
router.use('/categories', categoryRoutes)


module.exports = router