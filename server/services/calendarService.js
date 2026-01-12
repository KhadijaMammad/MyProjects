const CalendarEvent = require('../models/calendarModel');
const { google } = require('googleapis');

const calendarService = {
  async syncAIEvent(userId, aiJson) {
    try {
      // Datanın içindən start və end vaxtlarını təhlükəsiz şəkildə çıxarırıq
      const startTime = aiJson.start?.dateTime || aiJson.start?.date || aiJson.start_time;
      const endTime = aiJson.end?.dateTime || aiJson.end?.date || aiJson.end_time;

      const [event, created] = await CalendarEvent.upsert({
        google_event_id: aiJson.id || aiJson.google_event_id, 
        user_id: userId,
        summary: aiJson.summary || aiJson.title || 'Adsız Hadisə',
        description: aiJson.description || '',
        start_time: startTime,
        end_time: endTime,
        html_link: aiJson.htmlLink || aiJson.html_link,
        metadata: {
          creator: aiJson.creator,
          organizer: aiJson.organizer,
          etag: aiJson.etag,
          status: aiJson.status,
          reminders: aiJson.reminders,
          updated_from_ai: aiJson.updated || new Date().toISOString()
        }
      });

      return { event, created };
    } catch (error) {
      console.error("syncAIEvent Service Error:", error);
      throw error;
    }
  },

  async deleteAIEvent(googleEventId, userId) {
    const deletedCount = await CalendarEvent.destroy({
      where: { 
        google_event_id: googleEventId,
        user_id: userId 
      }
    });
    
    return deletedCount > 0;
  },

  async getUserEvents(userId) {
    return await CalendarEvent.findAll({
      where: { user_id: userId },
      order: [['start_time', 'ASC']]
    });
  },

  async syncFromGoogle(userId) {
  // 1. İstifadəçinin Google Tokenini bazadan götür (User modelindən)
  // Bu hissə sənin 'users' table-ındakı field adlarına uyğun olmalıdır
  const user = await User.findByPk(userId); 
  const googleToken = user.google_access_token; 

  if (!googleToken) return; // Token yoxdursa sync etmə

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: googleToken });
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  // 2. Google-dan son hadisələri al
  const response = await calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
  });

  const googleEvents = response.data.items || [];

  // 3. Hər birini bazaya (upsert) yaz
  for (const gEvent of googleEvents) {
    await this.syncAIEvent(userId, gEvent); // Bayaq yazdığımız funksiyanı çağırırıq
  }
}
};

module.exports = calendarService;