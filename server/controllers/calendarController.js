const calendarService = require("../services/calendarService");
const googleCalendarService = require("../services/googleCalendarService");
const Users = require("../models/userModel");

const calendarController = {
  // 1. AI və ya Manual Event Yaratma/Yeniləmə/Silmə
  async handleAICommand(req, res) {
    try {
      const { action, data } = req.body;
      const userId = req.user.user_id;

      if (!action || !data) {
        return res.status(400).json({ message: "Action və data tələb olunur." });
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
            return res.status(404).json({ message: "Hadisə tapılmadı." });
          }
          return res.status(200).json({ success: true, message: "Hadisə silindi." });
        default:
          return res.status(400).json({ message: "Naməlum əməliyyat." });
      }
    } catch (err) {
      console.error("Error in handleAICommand:", err);
      res.status(500).json({ message: "Server xətası." });
    }
  },

  // 2. HADİSƏLƏRİ GƏTİRMƏK (Bazadan)
  async getMyEvents(req, res) {
    try {
      const userId = req.user.user_id;
      // Burada sinxronizasiyanı çıxardıq ki, GET sorğusu sürətli olsun.
      // Sinxronizasiya üçün ayrıca endpoint istifadə edəcəyik (triggerGoogleSync).
      const events = await calendarService.getUserEvents(userId);
      res.status(200).json({ success: true, data: events });
    } catch (error) {
      console.error("getMyEvents Xətası:", error);
      res.status(500).json({ success: false, message: "Hadisələr gətirilərkən xəta." });
    }
  },

  // 3. GOOGLE-DAN SİNXRONİZASİYA (Frontend-dəki triggerGoogleSync üçün
async syncWithGoogle(req, res) {
    try {
        console.log("Sync istəyi gəldi. User:", req.user);

        const userId = req.user?.user_id 

        if (!userId) {
            return res.status(401).json({ success: false, message: "Auth xətası: User ID tapılmadı" });
        }

        const user = await Users.findOne({ where: { user_id: userId } });

        if (!user || !user.google_refresh_token) {
            return res.status(400).json({ 
                success: false, 
                message: "Google hesabı bağlı deyil və ya token yoxdur." 
            });
        }

        const syncResult = await googleCalendarService.syncEventsFromGoogle(user);

        res.status(200).json({
            success: true,
            message: "Sinxronizasiya uğurla tamamlandı",
            count: syncResult?.count || 0
        });
    } catch (error) {
        console.error("Sync Controller Xətası (500):", error);
        res.status(500).json({ success: false, message: error.message });
    }
}
};

module.exports = calendarController;