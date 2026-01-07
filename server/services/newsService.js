const News = require('../models/newsModel');
const { ErrorResponse } = require('../helpers/responseHandler');
const responseMessages = require('../helpers/responseMessages');
const { Op, fn, col, where } = require('sequelize');

const getAllNews = async (filter = {}) => {
    try {
        const q = (filter.search || filter.q || '').toString().trim();
        const lang = filter.lang;

        const page = Math.max(1, parseInt(filter.page, 10) || 1);

        const rawLimit = filter.limit;
        const noLimit =
            rawLimit === '0' ||
            (typeof rawLimit === 'string' && rawLimit.toLowerCase() === 'all');

        const limit = noLimit ? undefined : Math.min(1000, parseInt(rawLimit, 10) || 20);
        const offset = noLimit ? undefined : (page - 1) * limit;

        const pattern = q && q.length >= 2 ? `%${q.toLowerCase()}%` : null;

        const whereClause = {};

        if (pattern) {
            whereClause[Op.or] = [
                where(fn('LOWER', col('title')), { [Op.like]: pattern }),
                where(fn('LOWER', col('summary')), { [Op.like]: pattern }),
                where(fn('LOWER', col('keywords')), { [Op.like]: pattern }),
                where(fn('LOWER', col('insight')), { [Op.like]: pattern })
            ];
        }

        if (lang) {
            whereClause.news_lang = lang;
        }

        const findOptions = {
            order: [['sent_at', 'DESC']]
        };

        if (Object.keys(whereClause).length > 0) {
            findOptions.where = whereClause;
        }

        if (!noLimit) {
            findOptions.limit = limit;
            findOptions.offset = offset;
        }

        const results = await News.findAll(findOptions);
        return results;

    } catch (error) {
        console.error('getAllNews error:', error);
        throw new ErrorResponse(
            500,
            error.message || responseMessages.DATA_NOT_FOUND
        );
    }
};

const getNewsByNewsId = async (newsId) => {
    try {
        const newsItem = await News.findByPk(newsId);
        return newsItem;
    } catch (error) {
        console.error('getNewsByNewsId error:', error);
        throw new ErrorResponse(500, error.message || responseMessages.DATA_NOT_FOUND);
    }
};

const getNewsByUserId = async (userId) => {
    try {
        const newsList = await News.findAll({
            where: { user_id: userId },
            order: [['sent_at', 'DESC']]
        });
        return newsList;
    } catch (error) {
        console.error('getNewsByUserId error:', error);
        throw new ErrorResponse(500, error.message || responseMessages.DATA_NOT_FOUND);
    }
};

const getNewsByCategoryId = async (categoryId) => {
    try {
        const newsList = await News.findAll({
            where: { category_id: categoryId },
            order: [['sent_at', 'DESC']]
        });
        return newsList;
    } catch (error) {
        console.error('getNewsByCategoryId error:', error);
        throw new ErrorResponse(500, error.message || responseMessages.DATA_NOT_FOUND);
    }
};

const getNewsBySiteId = async (siteId) => {
    try {
        const newsList = await News.findAll({
            where: { sites_id: siteId },
            order: [['sent_at', 'DESC']]
        });
        return newsList;
    } catch (error) {
        console.error('getNewsBySiteId error:', error);
        throw new ErrorResponse(500, error.message || responseMessages.DATA_NOT_FOUND);
    }
};

const getNewsByNewsLang = async (newsLang) => {
    try {
        const newsList = await News.findAll({
            where: { news_lang: newsLang },
            order: [['sent_at', 'DESC']]
        });

        return newsList;
    } catch (error) {
        console.error('getNewsByNewsLang error:', error);
        throw new ErrorResponse(500, error.message || responseMessages.DATA_NOT_FOUND);
    }
};

const getNewsByNewsDate = async (news_date) => {
    try {
        const newsList = await News.findAll({ where: { news_date: news_date } });
        return newsList;
    }  catch (error) {
        console.error('getNewsByNewsDate error:', error);
        throw new ErrorResponse(500, error.message || responseMessages.DATA_NOT_FOUND);
    }
};

const getNewsByCategoryAndLang = async (filter = {}) => {
    try {
        const {
            categoryId,
            newsLang,
            page = 1,
            limit: rawLimit,
            search
        } = filter;

        const pageNumber = Math.max(1, parseInt(page, 10) || 1);

        const noLimit =
            rawLimit === '0' ||
            (typeof rawLimit === 'string' && rawLimit.toLowerCase() === 'all');

        const limit = noLimit ? undefined : Math.min(1000, parseInt(rawLimit, 10) || 20);
        const offset = noLimit ? undefined : (pageNumber - 1) * limit;

        const q = (search || '').toString().trim();
        const pattern = q && q.length >= 2 ? `%${q.toLowerCase()}%` : null;

        // WHERE
        const whereClause = {
            category_id: categoryId,
            news_lang: newsLang
        };

        if (pattern) {
            whereClause[Op.or] = [
                where(fn('LOWER', col('title')), { [Op.like]: pattern }),
                where(fn('LOWER', col('summary')), { [Op.like]: pattern }),
                where(fn('LOWER', col('keywords')), { [Op.like]: pattern }),
                where(fn('LOWER', col('insight')), { [Op.like]: pattern })
            ];
        }

        const findOptions = {
            where: whereClause,
            order: [['sent_at', 'DESC']]
        };

        if (!noLimit) {
            findOptions.limit = limit;
            findOptions.offset = offset;
        }

        const results = await News.findAll(findOptions);
        return results;

    } catch (error) {
        console.error('getNewsByCategoryAndLang error:', error);
        throw new ErrorResponse(
            500,
            error.message || responseMessages.DATA_NOT_FOUND
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