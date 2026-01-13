const express = require('express');
const TaskController = require('../../controllers/taskController');
const AuthMiddleware = require('../../middleware/authMiddleware');


const router = express.Router();

router.use(AuthMiddleware);
router.get('/', TaskController.getAllTasks);
router.post('/', TaskController.createTask);
router.delete('/:id', TaskController.deleteTask);
router.put('/:id', TaskController.updatedTask);


module.exports = router