const calendarService = require("../services/calendarService");
const googleCalendarService = require("../services/googleCalendarService"); // Bu servisi əlavə etdik
const Users = require("../models/userModel");

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
            message: `Hadisə uğurla ${result.created ? "yaradıldı" : "yeniləndi"}`,
            data: result.event,
          });
        case "delete":
          const eventId = data.id || data.google_event_id;
          const isDeleted = await calendarService.deleteAIEvent(eventId, userId);

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
    const userId = req.user.user_id;
    const user = await Users.findOne({ where: { user_id: userId } });
    
    // Əgər user bazada yoxdursa və ya tokeni yoxdursa, sinxronizasiyanı keç
    if (user && user.google_refresh_token) {
      try {
        await googleCalendarService.syncEventsFromGoogle(user); 
      } catch (googleError) {
        // API bağlıdırsa və ya başqa problem varsa, sadəcə log yaz, dayandırılmasın
        console.error("Google Sync Baş tutmadı (API bağlı ola bilər):", googleError.message);
      }
    }

    const events = await calendarService.getUserEvents(userId);
    res.status(200).json(events);
  } catch (error) {
    console.error("getMyEvents Xətası:", error);
    const events = await calendarService.getUserEvents(req.user.user_id);
    res.status(200).json(events);
  }
},
};

module.exports = calendarController;