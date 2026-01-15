const axios = require('axios');
const GemTalk = require('../models/gemTalkModel');

// Python-dan stream-i gətirən funksiya
const getAIStream = async (topic, rounds) => {
    return await axios({
        method: 'post',
        url: 'http://jg04swko40sg0sk04400wswc.185.205.244.33.sslip.io/discuss',
        data: { topic, rounds },
        responseType: 'stream'
    });
};

// Bazada söhbəti yadda saxlayan funksiya
const saveChatToDB = async (id, history) => {
    return await GemTalk.update(
        { chat_history: history, status: 'completed' },
        { where: { id } }
    );
};

// İstifadəçinin bütün müzakirələrini gətirir
const getUserTalks = async (userId) => {
    return await GemTalk.findAll({
        where: { user_id: userId },
        order: [['createdAt', 'DESC']], 
        attributes: ['id', 'topic', 'rounds', 'status', 'createdAt'] 
    });
};

// Konkret bir müzakirənin detallarını gətirir
const getTalkDetails = async (talkId, userId) => {
    return await GemTalk.findOne({
        where: { id: talkId, user_id: userId }
    });
};

module.exports = { getAIStream, saveChatToDB, getUserTalks, getTalkDetails };