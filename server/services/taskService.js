const TaskModel = require("../models/taskModel");

const TaskService = {
  async createTask(userId, aiJson) {
    try {
      const data = Array.isArray(aiJson) ? aiJson[0] : aiJson;

      return await TaskModel.create({
        user_id: userId,
        title: data.Title,
        description: data.Desciption || "",
        status: data.Status && data.Status !== "" ? data.Status : "Open",
        priority: data.Priority || "Medium",
        deadline: data.Deadline === "" || !data.Deadline ? null : data.Deadline,
      });
    } catch (error) {
      console.error("Error in createTask:", error);
      throw error;
    }
  },

  async updatedTask(taskId, userId, aiJson) {
    try {
      const data = Array.isArray(aiJson) ? aiJson[0] : aiJson;

      const task = await TaskModel.findOne({
        where: { id: taskId, user_id: userId },
      });

      if (!task) {
        throw new Error(
          "Tapşırıq tapılmadı və ya bu əməliyyata icazəniz yoxdur."
        );
      }
      await task.update({
        title: data.Title,
        description: data.Desciption || "",
        status: data.Status && data.Status !== "" ? data.Status : "Open",
        priority: data.Priority || "Medium",
        deadline: data.Deadline === "" || !data.Deadline ? null : data.Deadline,
      });
    } catch (error) {
      console.error("Error in updatedTask:", error);
      throw error;
    }
  },

  async getAllTasks(userId) {
    try {
      return await TaskModel.findAll({
        where: { user_id: userId },
        order: [["createdAt", "DESC"]],
      });
    } catch (error) {
      console.error("Error in getAllTasks:", error);
      throw error;
    }
  },

  async deleteTask (taskId, userId) {
    try{
        const result = await TaskModel.destroy({
            where: {id: taskId, user_id: userId}
        })
        return result > 0;
    }
    catch(error){
        console.error("Error in deleteTask:", error);
        throw error;
    }
    }
};

module.exports = TaskService;
