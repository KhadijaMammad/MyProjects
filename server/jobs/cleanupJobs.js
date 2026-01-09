const cron = require("node-cron");
const Note = require("../models/notesModel");
const { Op } = require("sequelize");

const startCleanupJob = () => {
  cron.schedule("0 0 * * *", async () => {
    console.log("Recyle bin is starting for cleaning");

    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const deletedNotes = await Note.destroy({
        where: {
          is_deleted: true,
          deleted_at: { [Op.lte]: thirtyDaysAgo },
        },
      });

      console.log(
        `Cleanup job completed. Permanently deleted ${deletedNotes} notes.`
      );
    } catch (err) {
      console.error("Error during cleanup job:", err);
    }
  });
};

module.exports = startCleanupJob;