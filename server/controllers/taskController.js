const TaskService = require("../services/taskService");

const TaskController = {
  createTask: async (req, res) => {
    try {
      const userId = req.user.user_id;
      const aiJson = req.body;

      const newTask = await TaskService.createTask(userId, aiJson);
      res.status(201).json({ success: true, data: newTask });
    } catch (error) {
      console.error("Error in createTask controller:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },

  updatedTask: async (req, res) => {
    try {
      const userId = req.user.user_id;
      const taskId = req.params.id;
      const aiJson = req.body;

      const updatedTask = await TaskService.updatedTask(taskId, userId, aiJson);
      res.status(200).json({ success: true, data: updatedTask });
    } catch (error) {
      console.error("Error in updatedTask controller:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },

  getAllTasks: async (req, res) => {
    try {
      const userId = req.user.user_id;
      const tasks = await TaskService.getAllTasks(userId);
      res.status(200).json({ success: true, data: tasks });
    } catch (error) {
      console.error("Error in getAllTasks controller:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },

  deleteTask: async (req, res) => {
    try {
      const userId = req.user.user_id;
      const taskId = req.params.id;

      const deletedTask = await TaskService.deleteTask(taskId, userId);
      if (deletedTask) {
        res.status(200).json({ success: true, data: deletedTask });
      } else {
        res.status(404).json({ error: "Tapşırıq tapılmadı" });
      }
    } catch (error) {
      console.error("Error in deleteTask controller:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },
};

module.exports = TaskController;
