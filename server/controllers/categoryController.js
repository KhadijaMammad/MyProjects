const { ErrorResponse, SuccessResponse } = require('../helpers/responseHandler')
const categoriesService = require('../services/categoryService')
const responseMessages = require('../helpers/responseMessages')

const getAllCategories = async (req, res) => {
    try {
        const allCategories = await categoriesService.getAllCategories();
        res.status(200).json(new SuccessResponse(200, responseMessages.DATA_FETCHED_SUCCESSFULLY, allCategories));
    }
    catch (error) {
        res.status(error.status || 500).json(new ErrorResponse(error.status || 500, error.message));
    }
};

const getCategoryById = async (req, res) => {
    const { category_id } = req.params;
    try {
        const categoryItem = await categoriesService.getCategoryById(category_id);
        res.status(200).json(new SuccessResponse(200, responseMessages.DATA_FETCHED_SUCCESSFULLY, categoryItem));
    }
    catch (error) {
        res.status(error.status || 500).json(new ErrorResponse(error.status || 500, error.message));
    }
};

const getCategoryByName = async (req, res) => {
    const { category_name } = req.params;
    try {
        const categoryItem = await categoriesService.getCategoryByName(category_name);
        res.status(200).json(new SuccessResponse(200, responseMessages.DATA_FETCHED_SUCCESSFULLY, categoryItem));
    }
    catch (error) {
        res.status(error.status || 500).json(new ErrorResponse(error.status || 500, error.message));
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    getCategoryByName
};