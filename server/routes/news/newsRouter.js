const newsController = require('../../controllers/newsController');

const router = require('express').Router();

router.get('/', newsController.getAllNews);
router.get('/user/:user_id', newsController.getNewsByUserId);
router.get('/category/:category_id', newsController.getNewsByCategoryId);
router.get('/category/:category_id/lang/:news_lang', newsController.getNewsByCategoryAndLang);
router.get('/sites/:sites_id', newsController.getNewsBySiteId);
router.get('/lang/:news_lang', newsController.getNewsByNewsLang);
router.get('/date/:news_date', newsController.getNewsByNewsDate);
router.get('/:news_id', newsController.getNewsByNewsId);

module.exports = router;