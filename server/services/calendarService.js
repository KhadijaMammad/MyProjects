const { google } = require("googleapis");
const CalendarEvent = require("../models/calendarModel");
const User = require("../models/userModel");

const calendarService = {
  async getGoogleClient(user) {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      access_token: user.google_access_token,
      refresh_token: user.google_refresh_token,
    });

    // Token yenilənməsi hadisəsi
    oauth2Client.on("tokens", async (tokens) => {
      const updateData = {};
      if (tokens.refresh_token)
        updateData.google_refresh_token = tokens.refresh_token;
      if (tokens.access_token)
        updateData.google_access_token = tokens.access_token;

      if (Object.keys(updateData).length > 0) {
        await User.update(updateData, { where: { user_id: user.user_id } });
      }
    });

    return google.calendar({ version: "v3", auth: oauth2Client });
  },

  // Hadisəni həm Google-a, həm də Bazaya sinxron edir (CREATE / UPDATE)

  async syncAIEvent(userId, aiJson) {
    try {
      const user = await User.findByPk(userId);
      let googleEventId = aiJson.id || aiJson.google_event_id;

      // 1. Tarixləri təhlükəsiz şəkildə parse edirik
      const startTime =
        aiJson.start?.dateTime || aiJson.start_time || aiJson.start?.date;
      const endTime =
        aiJson.end?.dateTime || aiJson.end_time || aiJson.end?.date;

      if (!startTime || !endTime) {
        throw new Error("Başlanğıc və ya bitmə vaxtı təyin edilməyib.");
      }

      if (user && user.google_refresh_token) {
        const calendar = await this.getGoogleClient(user);

        const eventResource = {
          summary: aiJson.summary || aiJson.title || "Adsız Hadisə",
          description: aiJson.description || "",
          start: {
            dateTime: new Date(startTime).toISOString(), // Mütləq ISO format
            timeZone: "Asia/Baku",
          },
          end: {
            dateTime: new Date(endTime).toISOString(), // Mütləq ISO format
            timeZone: "Asia/Baku",
          },
        };

        // Əgər ID yoxdursa və ya "manual_" ilə başlayırsa YENİ yarat
        if (!googleEventId || googleEventId.toString().startsWith("manual_")) {
          const googleResponse = await calendar.events.insert({
            calendarId: "primary",
            resource: eventResource,
          });
          googleEventId = googleResponse.data.id;
        } else {
          // Mövcud olanı yenilə
          await calendar.events.update({
            calendarId: "primary",
            eventId: googleEventId,
            resource: eventResource,
          });
        }
      }

      // 2. Bazaya yazarkən (Upsert)
      const [event, created] = await CalendarEvent.upsert({
        google_event_id: googleEventId,
        user_id: userId,
        summary: aiJson.summary || aiJson.title || "Adsız Hadisə",
        description: aiJson.description || "",
        start_time: new Date(startTime),
        end_time: new Date(endTime),
        metadata: aiJson,
      });

      return { event, created };
    } catch (error) {
      // Backend terminalında xətanın tam detallarını görmək üçün:
      console.error(
        "syncAIEvent Detallı Xəta:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

    // Hadisəni həm Bazadan, həm də Google-dan silir
  async deleteAIEvent(googleEventId, userId) {
    try {
      const user = await User.findByPk(userId);

      // 1. Google-dan sil
      if (
        user &&
        user.google_refresh_token &&
        googleEventId &&
        !googleEventId.startsWith("manual_")
      ) {
        try {
          const calendar = await this.getGoogleClient(user);
          await calendar.events.delete({
            calendarId: "primary",
            eventId: googleEventId,
          });
        } catch (gErr) {
          console.warn("Google-da hadisə tapılmadı və ya artıq silinib.");
        }
      }

      // 2. Bazadan sil
      const deletedCount = await CalendarEvent.destroy({
        where: {
          google_event_id: googleEventId,
          user_id: userId,
        },
      });

      return deletedCount > 0;
    } catch (error) {
      console.error("deleteAIEvent Xətası:", error);
      throw error;
    }
  },

  //  * Google-dan çəkmək 
  async syncFromGoogle(userId) {
    const user = await User.findByPk(userId);
    if (!user || !user.google_refresh_token)
      throw new Error("Google bağlantısı yoxdur.");

    const calendar = await this.getGoogleClient(user);
    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const googleEvents = response.data.items || [];
    for (const gEvent of googleEvents) {
      // Hər birini bazaya yaz
      await CalendarEvent.upsert({
        google_event_id: gEvent.id,
        user_id: userId,
        summary: gEvent.summary || "Adsız",
        description: gEvent.description || "",
        start_time: gEvent.start.dateTime || gEvent.start.date,
        end_time: gEvent.end.dateTime || gEvent.end.date,
        metadata: gEvent,
      });
    }
    return { success: true, count: googleEvents.length };
  },

  async getUserEvents(userId) {
    return await CalendarEvent.findAll({
      where: { user_id: userId },
      order: [["start_time", "ASC"]],
    });
  },
};

module.exports = calendarService;
