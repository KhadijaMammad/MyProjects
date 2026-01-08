const express = require('express');
const router = express.Router();
const folderController = require('../../controllers/folderController');
const authMiddleware = require('../../middleware/authMiddleware');

router.use(authMiddleware);

router.get('/', folderController.getAllFolders);
router.post('/', folderController.createFolder);
router.get('/:id', folderController.folderGetById);
router.put('/:id', folderController.updatedFolder);
router.delete('/:id', folderController.deleteFolder);
router.patch('/pin/:id', folderController.togglePin);

module.exports = router;