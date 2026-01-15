const GemTalk = require("../models/gemTalkModel");
const {
  getAIStream,
  saveChatToDB,
  getUserTalks,
  getTalkDetails,
} = require("../services/gemTalkService");

// Yeni müzakirə başladan controller
const startDiscussion = async (req, res) => {
  try {
    const { topic, rounds } = req.body;
    const userId = req.user.user_id;

    const talk = await GemTalk.create({ user_id: userId, topic, rounds });

    // 2. Python-dan stream-i alırıq
    const aiResponse = await getAIStream(topic, rounds);

    // 3. SSE Header-ləri (Frontend-lə canlı bağlantı)
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    let lastHistory = [];

    // Python-dan gələn hər bir məlumat parçasını (chunk) emal edirik
    aiResponse.data.on("data", (chunk) => {
      const str = chunk.toString();

      // Əgər Python-dan "OPEN_API_KEY" xətası gəlirsə, onu tuturuq
      if (str.includes("error")) {
        console.error("Python AI Xətası:", str);
      }

      // Data daxilində history varsa onu yaddaşa yazırıq
      if (str.includes('"history":')) {
        try {
          const cleanJson = str.replace("data: ", "").trim();
          const parsed = JSON.parse(cleanJson);
          if (parsed.history) lastHistory = parsed.history;
        } catch (e) {
        }
      }

      res.write(chunk);
    });

    aiResponse.data.on("end", async () => {
      // Müzakirə bitəndə son halı bazaya yazırıq
      if (lastHistory.length > 0) {
        await saveChatToDB(talk.id, lastHistory);
      }
      res.end();
    });

    // Bağlantı qəfil kəsilsə (istifadəçi səhifəni bağlasa)
    req.on("close", () => {
      aiResponse.data.destroy();
    });
  } catch (error) {
    console.error("Start Discussion Xətası:", error);
    // Əgər SSE başlamayıbsa standart JSON xətası göndər
    if (!res.headersSent) {
      res
        .status(500)
        .json({
          message: "AI servisi ilə əlaqə qurula bilmədi.",
          error: error.message,
        });
    } else {
      res.end();
    }
  }
};

// Bütün siyahını gətirən controller
const getAllTalks = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const history = await getUserTalks(userId);
    res.status(200).json(history);
  } catch (error) {
    console.error("GetAllTalks Xətası:", error);
    res
      .status(500)
      .json({
        message: "Tarixçə gətirilərkən xəta oldu.",
        error: error.message,
      });
  }
};

// Tək bir müzakirəni gətirən controller
const getOneTalk = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const talkId = req.params.id;
    const talk = await getTalkDetails(talkId, userId);

    if (!talk) {
      return res.status(404).json({ message: "Müzakirə tapılmadı." });
    }

    res.status(200).json(talk);
  } catch (error) {
    console.error("GetOneTalk Xətası:", error);
    res
      .status(500)
      .json({ message: "Məlumata baxarkən xəta oldu.", error: error.message });
  }
};

module.exports = { startDiscussion, getAllTalks, getOneTalk };
