const CalendarEvent = require('../models/calendarModel');

const calendarService = {
  async syncAIEvent(userId, aiJson) {
    const [event, created] = await CalendarEvent.upsert({
      google_event_id: aiJson.id, 
      user_id: userId,
      summary: aiJson.summary || 'Adsız Hadisə',
      description: aiJson.description || '',
      start_time: aiJson.start.dateTime,
      end_time: aiJson.end.dateTime,
      html_link: aiJson.htmlLink,
      metadata: {
        creator: aiJson.creator,
        organizer: aiJson.organizer,
        etag: aiJson.etag,
        status: aiJson.status,
        reminders: aiJson.reminders,
        updated_from_ai: aiJson.updated
      }
    });

    return { event, created };
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
  }
};

module.exports = calendarService;