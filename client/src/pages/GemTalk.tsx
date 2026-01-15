import React, { useState, useEffect, useRef } from "react";
import {
  useGetHistoryQuery,
  useLazyStreamingDiscussionQuery,
  useLazyGetOneTalkQuery,
} from "../redux/services/gemtalkApi";
import type { ChatMessage, GemTalk } from "../types/gemtalk/gemtalk";

const GemTalkPage: React.FC = () => {
  const [topic, setTopic] = useState<string>("");
  const [rounds] = useState<number>(2);
  const [displayMessages, setDisplayMessages] = useState<ChatMessage[]>([]);

  const { data: history, refetch: refetchHistory } = useGetHistoryQuery();
  const [triggerDiscussion, { data: streamData, isFetching: isStreaming }] = useLazyStreamingDiscussionQuery();
  const [fetchDetails] = useLazyGetOneTalkQuery();

  const chatEndRef = useRef<HTMLDivElement>(null);
  const gradientClass = "bg-gradient-to-br from-[#e11d48] via-[#c026d3] to-[#2563eb]";

  // 1. Canlı axını (streaming) izlə və displayMessages-i yenilə
  useEffect(() => {
    if (streamData && streamData.length > 0) {
      setDisplayMessages(streamData);
    }
  }, [streamData]);

  // 2. Scroll-u aşağı çək
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayMessages]);

  const handleStart = async () => {
    if (!topic || isStreaming) return;
    setDisplayMessages([]); // Ekranı təmizlə
    try {
      await triggerDiscussion({ topic, rounds }).unwrap();
      refetchHistory();
    } catch (err) {
      console.error("Müzakirə başlamadı:", err);
    }
  };

  const handleHistoryClick = async (id: number) => {
    try {
      // RTK Query endpoint-i birbaşa çağırırıq
      const result = await fetchDetails(id.toString()).unwrap();
      setDisplayMessages(result.chat_history || []);
    } catch (error) {
      console.error("Tarixçə gətirilərkən xəta:", error);
    }
  };

  return (
    <div className="flex h-screen bg-white text-slate-800 font-sans overflow-hidden">
      {/* SİDEBAR */}
      <aside className="w-72 border-r border-gray-100 flex flex-col shrink-0 bg-[#FCFCFC]">
        <div className="p-8">
          <div className={`${gradientClass} w-8 h-8 rounded-lg mb-4`} />
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-900">GemTalk AI</h2>
        </div>
        <div className="flex-1 overflow-y-auto px-4 space-y-1">
          <p className="px-4 text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-4">Keçmiş Müzakirələr</p>
          {history?.map((item: GemTalk) => (
            <button
              key={item.id}
              onClick={() => handleHistoryClick(item.id)}
              className="w-full text-left p-4 rounded-2xl hover:bg-white hover:border-gray-200 border border-transparent transition-all group"
            >
              <p className="text-sm font-medium text-slate-600 truncate group-hover:text-slate-900">{item.topic}</p>
              <span className="text-[9px] text-gray-300 mt-1 block">
                {new Date(item.createdAt).toLocaleDateString("az-AZ")}
              </span>
            </button>
          ))}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col bg-white">
        {/* INPUT */}
        <div className="w-full max-w-2xl mx-auto pt-12 px-6">
          <div className="bg-slate-50 border border-slate-100 p-1.5 rounded-3xl flex items-center focus-within:bg-white focus-within:border-slate-200">
            <input
              className="flex-1 p-4 bg-transparent outline-none text-sm font-medium"
              placeholder="Yeni mövzu başladın..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={isStreaming}
            />
            <button
              onClick={handleStart}
              disabled={isStreaming || !topic}
              className={`${gradientClass} px-6 py-3 rounded-[22px] text-white text-[10px] font-bold uppercase tracking-widest disabled:grayscale`}
            >
              {isStreaming ? "Analiz edilir..." : "Təhlil Et"}
            </button>
          </div>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto pt-16 pb-20 px-6">
          <div className="max-w-2xl mx-auto">
            {displayMessages.length === 0 && (
              <div className="text-center mt-20">
                <p className="text-slate-300 text-sm font-medium italic">Müzakirə sahəsi boşdur.</p>
              </div>
            )}
            <div className="space-y-16">
              {displayMessages.map((msg: ChatMessage, i: number) => (
                <div key={i} className="animate-in fade-in slide-in-from-top-2 duration-500">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-6 h-6 rounded flex items-center justify-center text-white text-[9px] font-black ${msg.role.includes("Strateq") ? gradientClass : "bg-slate-900"}`}>
                      {msg.role[0].toUpperCase()}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{msg.role}</span>
                  </div>
                  <div className="pl-10 text-slate-700 leading-relaxed text-[16px]">{msg.content}</div>
                </div>
              ))}
            </div>
            <div ref={chatEndRef} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default GemTalkPage;