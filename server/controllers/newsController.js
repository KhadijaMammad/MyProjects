const { ErrorResponse, SuccessResponse } = require('../helpers/responseHandler')
const newsService = require('../services/newsService')
const responseMessages = require('../helpers/responseMessages')

const getAllNews = async (req, res) => {
    try {
        const { q, search, page, limit, lang } = req.query;
        const filter = { search: q || search, page, limit, lang };


        const newsList = await newsService.getAllNews(filter);
        res.status(200).json(new SuccessResponse(200, responseMessages.DATA_FETCHED_SUCCESSFULLY, newsList));
    }
    catch (error) {
        res.status(error.status || 500).json(new ErrorResponse(error.status || 500, error.message));
    }
};

const getNewsByNewsId = async (req, res) => {
    const { news_id } = req.params;
    try {
        const newsItem = await newsService.getNewsByNewsId(news_id);
        res.status(200).json(new SuccessResponse(200, responseMessages.DATA_FETCHED_SUCCESSFULLY, newsItem));
    }
    catch (error) {
        res.status(error.status || 500).json(new ErrorResponse(error.status || 500, error.message));
    }
};

const getNewsByUserId = async (req, res) => {
    const { user_id } = req.params;
    try {
        const newsList = await newsService.getNewsByUserId(user_id);
        res.status(200).json(new SuccessResponse(200, responseMessages.DATA_FETCHED_SUCCESSFULLY, newsList));
    }
    catch (error) {
        res.status(error.status || 500).json(new ErrorResponse(error.status || 500, error.message));
    }
};

const getNewsByCategoryId = async (req, res) => {
    const { category_id } = req.params;
    try {
        const newsList = await newsService.getNewsByCategoryId(category_id);
        res.status(200).json(new SuccessResponse(200, responseMessages.DATA_FETCHED_SUCCESSFULLY, newsList));
    }
    catch (error) {
        res.status(error.status || 500).json(new ErrorResponse(error.status || 500, error.message));
    }
};

const getNewsBySiteId = async (req, res) => {
    const { sites_id } = req.params;
    try {
        const newsList = await newsService.getNewsBySiteId(sites_id);
        res.status(200).json(new SuccessResponse(200, responseMessages.DATA_FETCHED_SUCCESSFULLY, newsList));
    }
    catch (error) {
        res.status(error.status || 500).json(new ErrorResponse(error.status || 500, error.message));
    }
};

const getNewsByNewsLang = async (req, res) => {
    const { news_lang } = req.params;
    try {
        const newsList = await newsService.getNewsByNewsLang(news_lang);
        res.status(200).json(new SuccessResponse(200, responseMessages.DATA_FETCHED_SUCCESSFULLY, newsList));
    }
    catch (error) {
        res.status(error.status || 500).json(new ErrorResponse(error.status || 500, error.message));
    }
};

const getNewsByNewsDate = async (req, res) => {
    const { news_date } = req.params;
    try {
        const newsList = await newsService.getNewsByNewsDate(news_date);
        res.status(200).json(new SuccessResponse(200, responseMessages.DATA_FETCHED_SUCCESSFULLY, newsList));
    }
    catch (error) {
        res.status(error.status || 500).json(new ErrorResponse(error.status || 500, error.message));
    }
};

const getNewsByCategoryAndLang = async (req, res) => {
    const { category_id, news_lang } = req.params;
    const { page, limit, search, q } = req.query;

    try {
        const newsList = await newsService.getNewsByCategoryAndLang(
            {
                categoryId: category_id,
                newsLang: news_lang,
                page,
                limit,
                search: q || search
            }
        );

        res.status(200).json(
            new SuccessResponse(
                200,
                responseMessages.DATA_FETCHED_SUCCESSFULLY,
                newsList
            )
        );
    } catch (error) {
        res.status(error.status || 500).json(
            new ErrorResponse(error.status || 500, error.message)
        );
    }
};



module.exports = {
    getAllNews,
    getNewsByNewsId,
    getNewsByUserId,
    getNewsByCategoryId,
    getNewsBySiteId,
    getNewsByNewsLang,
    getNewsByNewsDate,
    getNewsByCategoryAndLang
};