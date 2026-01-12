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
        const userId = req.user.user_id; 

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
        const { code, state } = req.query; // state burada userId-dir

        if (!code) {
            console.error("Google-dan kod gəlmədi.");
            return res.redirect('http://localhost:5173/calendar?sync=error');
        }

        try {
            const { tokens } = await oauth2Client.getToken(code);
            
            // Yenilənəcək datanı hazırlayırıq
            const updateData = {
                google_access_token: tokens.access_token
            };

            // Refresh token yalnız istifadəçi ilk dəfə icazə verəndə (prompt: consent) gəlir
            if (tokens.refresh_token) {
                updateData.google_refresh_token = tokens.refresh_token;
            }

            // 1. User-i bazada yeniləyirik
            await Users.update(updateData, { 
                where: { user_id: state } // Səndə sütun adı user_id-dirsə belə qalır
            });
            
            console.log(`User ${state} üçün Google bağlantısı və tokenlər yeniləndi.`);

            // 2. İlk sinxronizasiyanı başladırıq
            const user = await Users.findOne({ where: { user_id: state } });
            if (user) {
                // Burada await istifadə edirik ki, bitmədən redirect etməsin
                await syncEventsFromGoogle(user);
                console.log(`User ${state} üçün ilkin sinxronizasiya tamamlandı.`);
            }

            res.redirect('http://localhost:5173/calendar?sync=success');

        } catch (error) {
            console.error("Google Callback Xətası:", error);
            res.redirect('http://localhost:5173/calendar?sync=error');
        }
    }
};

module.exports = googleAuth;