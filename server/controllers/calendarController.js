const calendarService = require("../services/calendarService");

const calendarController = {
  async handleAICommand(req, res) {
    try {
      const { action, data } = req.body;
      const userId = req.user.user_id;

      if (!action || !data) {
        return res
          .status(400)
          .json({ message: "Invalid request: action and data are required." });
      }

      let result;

      switch (action.toLowerCase()) {
        case "create":
        case "update":
          result = await calendarService.syncAIEvent(userId, data);
          return res.status(200).json({
            success: true,
            message: `Hadisə uğurla ${
              result.created ? "yaradıldı" : "yeniləndi"
            }`,
            data: result.event,
          });
        case "delete":
          const eventId = data.id || data.google_event_id;
          const isDeleted = await calendarService.deleteAIEvent(
            eventId,
            userId
          );

          if (!isDeleted) {
            return res
              .status(404)
              .json({ message: "Hadisə tapılmadı və ya silinə bilmədi." });
          }
          return res
            .status(200)
            .json({ success: true, message: "Hadisə uğurla silindi." });
        default:
          return res.status(400).json({ message: "Unknown action." });
      }
    } catch (err) {
      console.error("Error in handleAICommand:", err);
      res.status(500).json({ message: "Internal server error." });
    }
  },

  async getMyEvents(req, res) {
    try {
      const events = await calendarService.getUserEvents(req.user.user_id);
      res.status(200).json({ success: true, data: events });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

module.exports = calendarController;
