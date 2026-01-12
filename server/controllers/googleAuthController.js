const { google } = require('googleapis');
const Users = require('../models/userModel'); 
const { syncEventsFromGoogle } = require('../services/googleCalendarService'); 

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

const googleAuth = {
    getGoogleAuthUrl: (req, res) => {
        const { userId } = req.query; 

        if (!userId) {
            return res.status(400).json({ status: false, message: "User ID tələb olunur!" });
        }

        const url = oauth2Client.generateAuthUrl({
            access_type: 'offline', 
            scope: ['https://www.googleapis.com/auth/calendar'],
            prompt: 'consent',
            state: userId.toString()
        });

        res.json({ url });
    },

   
    googleCallback: async (req, res) => {
        const { code, state } = req.query;

        if (!code) {
            console.error("Google-dan kod gəlmədi.");
            return res.redirect('http://localhost:5173/calendar?sync=error');
        }

        try {
            const { tokens } = await oauth2Client.getToken(code);
            
            // 2. Əgər refresh_token gəlibsə (bu adətən ilk qoşulmada gəlir)
            if (tokens.refresh_token) {
                // User-i bazada yeniləyirik
                await Users.update(
                    { google_refresh_token: tokens.refresh_token },
                    { where: { user_id: state } }
                );
                
                console.log(`User ${state} üçün Google bağlantısı uğurludur.`);

                // 3. İlk sinxronizasiyanı DƏRHAL başladırıq
                // User-i bazadan tapırıq ki, tam datası ilə servisə göndərək
                const user = await Users.findByPk(state);
                if (user) {
                    // Bu servis Google-dan dataları çəkib CalendarEvents cədvəlinə dolduracaq
                    await syncEventsFromGoogle(user);
                    console.log(`User ${state} üçün ilkin sinxronizasiya tamamlandı.`);
                }
            }

            // Hər şey uğurludursa, istifadəçini frontend təqviminə qaytarırıq
            res.redirect('http://localhost:5173/calendar?sync=success');

        } catch (error) {
            console.error("Google Callback Xətası:", error);
            res.redirect('http://localhost:5173/calendar?sync=error');
        }
    }
};

module.exports = googleAuth;