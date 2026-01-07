const express = require("express");
const categoryController = require("../../controllers/categoryController");

const router = express.Router();

router.get('/', categoryController.getAllCategories);
router.get('/name/:category_name', categoryController.getCategoryByName);
router.get('/:category_id', categoryController.getCategoryById);

module.exports = router;