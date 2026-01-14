const { google } = require('googleapis');
const Users = require('../models/userModel');
const { syncEventsFromGoogle } = require('../services/googleCalendarService');

// Client yaradan köməkçi funksiya
const createOAuthClient = () => {
    return new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
    );
};

const googleAuth = {
    getGoogleAuthUrl: (req, res) => {
        const userId = req.user.user_id;

        if (!userId) {
            return res.status(400).json({ status: false, message: "User ID tələb olunur!" });
        }

        const client = createOAuthClient(); 
        const url = client.generateAuthUrl({
            access_type: 'offline',
            scope: ['https://www.googleapis.com/auth/calendar'],
            prompt: 'consent',
            state: userId.toString()
        });

        res.json({ url });
    },

    googleCallback: async (req, res) => {
        const { code, state } = req.query;
        const client = createOAuthClient();

        if (!code) {
            return res.redirect('http://localhost:5173/calendar?sync=error');
        }

        try {
            // Kod vasitəsilə tokenləri alırıq
            const { tokens } = await client.getToken(code);
            
            const updateData = {
                google_access_token: tokens.access_token,
                // Access token-in bitmə vaxtını saxlamaq məsləhətdir
                google_token_expiry: tokens.expiry_date 
            };

            // Refresh token yalnız istifadəçi ilk dəfə təsdiq verəndə gəlir
            if (tokens.refresh_token) {
                updateData.google_refresh_token = tokens.refresh_token;
            }

            await Users.update(updateData, { 
                where: { user_id: state }
            });

            // İstifadəçini bazadan təzə məlumatla tapırıq
            const user = await Users.findOne({ where: { user_id: state } });
            
            if (user) {
                // Sinxronizasiyanı await etmədən (background-da) başlada bilərsiniz 
                // ki, istifadəçi redirect üçün gözləməsin
                syncEventsFromGoogle(user).catch(err => console.error("Sync Error:", err));
            }

            res.redirect('http://localhost:5173/calendar?sync=success');

        } catch (error) {
            console.error("Google Callback Xətası:", error);
            res.redirect('http://localhost:5173/calendar?sync=error');
        }
    }
};

module.exports = googleAuth;