const { google } = require('googleapis');
const CalendarEvent = require('../models/calendarModel'); 

const syncEventsFromGoogle = async (user) => {
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
    );

    oauth2Client.setCredentials({
        refresh_token: user.google_refresh_token
    });

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    try {
        const response = await calendar.events.list({
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            singleEvents: true,
            orderBy: 'startTime',
        });

        const googleEvents = response.data.items;

        // Dataları bazaya yazmaq (Loop)
        for (const gEvent of googleEvents) {
            await CalendarEvent.upsert({
                google_event_id: gEvent.id,
                user_id: user.user_id,
                summary: gEvent.summary || '(Adsız Hadisə)',
                description: gEvent.description || '',
                start_time: gEvent.start.dateTime || gEvent.start.date,
                end_time: gEvent.end.dateTime || gEvent.end.date,
                metadata: gEvent 
            });
        }

        return { success: true, count: googleEvents.length };
    } catch (error) {
        console.error("Sinxronizasiya xətası:", error);
        throw error;
    }
};

module.exports = { syncEventsFromGoogle };