const express = require('express');
const router = express.Router();
const notesController = require('../../controllers/notesController'); 
const authMiddleware = require('../../middleware/authMiddleware');
const upload = require('../../middleware/multer/upload');

router.use(authMiddleware);
router.post('/', upload.array('images', ), notesController.create);


router.get('/', notesController.getAll);
router.get('/:id', notesController.getOne);
router.post('/', notesController.create);
router.put('/:id', notesController.update);

router.patch('/:id/trash', notesController.moveToTrash);
router.patch('/:id/restore', notesController.restore);
router.patch('/:id/favorite', notesController.toggleFavorite);

router.delete('/:id/permanent', notesController.hardDelete); 

module.exports = router;