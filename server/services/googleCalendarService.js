const { google } = require('googleapis');
const CalendarEvent = require('../models/calendarModel');

// Ortaq OAuth2 Client yaradan köməkçi funksiya
const getOAuth2Client = (user) => {
    const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
    );
    oauth2Client.setCredentials({
        refresh_token: user.google_refresh_token
    });
    return oauth2Client;
};

// 1. GOOGLE-DAN BAZAYA ÇƏKMƏK (Mövcud funksiyan)
const syncEventsFromGoogle = async (user) => {
    const auth = getOAuth2Client(user);
    const calendar = google.calendar({ version: 'v3', auth });

    try {
        const response = await calendar.events.list({
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            singleEvents: true,
            orderBy: 'startTime',
        });

        const googleEvents = response.data.items;

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
        console.error("Google-dan çəkmə xətası:", error);
        throw error;
    }
};

// 2. YENİ HADİSƏNİ GOOGLE-A GÖNDƏRMƏK (Yeni funksiya)
const createEventInGoogle = async (user, eventData) => {
    const auth = getOAuth2Client(user);
    const calendar = google.calendar({ version: 'v3', auth });

    const event = {
        summary: eventData.summary,
        description: eventData.description,
        start: {
            dateTime: eventData.start_time,
            timeZone: 'Asia/Baku', 
        },
        end: {
            dateTime: eventData.end_time,
            timeZone: 'Asia/Baku',
        },
    };

    try {
        const response = await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
        });
        return response.data; // Google-dan gələn ID buradadır
    } catch (error) {
        console.error("Google-a göndərmə xətası:", error);
        throw error;
    }
};

// 3. GOOGLE-DAKI HADİSƏNİ SİLMƏK (Yeni funksiya)
const deleteEventFromGoogle = async (user, googleEventId) => {
    const auth = getOAuth2Client(user);
    const calendar = google.calendar({ version: 'v3', auth });

    try {
        await calendar.events.delete({
            calendarId: 'primary',
            eventId: googleEventId,
        });
        return { success: true };
    } catch (error) {
        console.error("Google-dan silmə xətası:", error);
        // Əgər hadisə Google-da artıq yoxdursa, xəta verməsin deyə:
        if (error.code === 410 || error.code === 404) return { success: true };
        throw error;
    }
};

module.exports = { 
    syncEventsFromGoogle, 
    createEventInGoogle, 
    deleteEventFromGoogle 
};