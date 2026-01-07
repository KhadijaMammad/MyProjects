const CategoryModel = require("../models/categoryModel");
const { ErrorResponse } = require("../helpers/responseHandler");
const { Model } = require("sequelize");

const getAllCategories = async () => {
  try {
    const categories = await CategoryModel.findAll();
    return categories;
  } catch (err) {
    console.error("getAllCategories error:", err);
    throw new ErrorResponse(
      500,
      err.message || responseMessages.DATA_NOT_FOUND
    );
  }
};

const getCategoryById = async (category_id) => {
    try{
        const category = await CategoryModel.findByPk(category_id);
        return category;
    }
    catch(err) {
        console.error("getCategoryById error:", err);
        throw new ErrorResponse(
          500,
          err.message || responseMessages.DATA_NOT_FOUND
        );
    }
};


const getCategoryByName = async (category_name) => {
    try{
        const category = await CategoryModel.findOne({ where: { category_name } });
        return category;
    }
    catch(err) {
        console.error("getCategoryByName error:", err);
        throw new ErrorResponse(
          500,
          err.message || responseMessages.DATA_NOT_FOUND
        );
    }
}

module.exports = {
    getAllCategories,
    getCategoryById,
    getCategoryByName
}