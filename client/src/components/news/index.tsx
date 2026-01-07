import { useState, useEffect } from "react";
import { ArrowUpRight, Sparkles, Tag, Loader2, X } from "lucide-react";
import { useGetNewsQuery } from "../../redux/services/newsApi";
import CategoryDropdown from "./categories/index";
import type { News } from "../../types/news/newsList";

const NewsPage = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [page, setPage] = useState(1);

  // 1. Dili localStorage-dan və ya profil datandan götür
  // Əgər səndə dil başqa yerdədirsə, bu sətiri ona uyğun dəyiş:
  const activeLang = localStorage.getItem("news_lang") || "fa";

  const isRTL = activeLang === "fa" || activeLang === "ar";
  const textDirection = isRTL ? "rtl" : "ltr";
  const textAlign = isRTL ? "text-right" : "text-left";

  const {
    data: newsList,
    isLoading,
    isFetching,
  } = useGetNewsQuery({
    category_id: selectedCategoryId,
    page: page,
    lang: activeLang, // Dinamik olaraq seçilmiş dili göndəririk
  });

  useEffect(() => {
    setPage(1);
    setSelectedNews(null);
  }, [selectedCategoryId, activeLang]);

  const gradientClass =
    "bg-gradient-to-br from-[#e11d48] via-[#c026d3] to-[#2563eb]";

  return (
    <div className="flex flex-col gap-8 min-h-screen pb-10 font-['Inter']">
      {/* DROPDOWN - Yuxarıda tək */}
      <div className="flex justify-start">
        <div dir="ltr">
          <CategoryDropdown
            onSelectCategory={(id) => setSelectedCategoryId(id)}
          />
        </div>
      </div>

      {/* BAŞLIQ */}
      <div className={selectedNews ? "lg:w-[40%]" : "max-w-4xl mx-auto w-full"}>
        <h2
          className={`text-2xl font-black italic uppercase tracking-tighter text-[#111418] dark:text-white mb-2 ${textAlign}`}
          dir={textDirection}
        >
          {isRTL ? "آنچه امروز اتفاق افتاده است!" : "BU GÜN BAŞ VERƏNLƏR!"}
        </h2>
      </div>

      {/* ƏSAS KONTEYNER: dir="ltr" veririk ki, həmişə List solda, Detail sağda qalsın */}
      <div
        className={`grid transition-all duration-500 gap-6 ${
          selectedNews
            ? "grid-cols-1 lg:grid-cols-12"
            : "max-w-4xl mx-auto w-full"
        }`}
        dir="ltr"
      >
        {/* LIST SECTION - Həmişə Solda qalır */}
        <div
          className={`${
            selectedNews ? "lg:col-span-5" : "w-full"
          } space-y-4 overflow-y-auto max-h-[85vh] scrollbar-hide`}
        >
          {isLoading && page === 1 ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-fuchsia-600" size={40} />
            </div>
          ) : (
            newsList?.map((item) => (
              <div
                key={item.news_id}
                onClick={() => setSelectedNews(item)}
                // Kart daxilində yazılar dilə görə istiqamət alır
                className={`flex gap-4 p-4 bg-white dark:bg-[#1A2633] rounded-2xl cursor-pointer border-2 transition-all duration-300 hover:shadow-md ${
                  selectedNews?.news_id === item.news_id
                    ? "border-fuchsia-500 shadow-lg scale-[1.02]"
                    : "border-transparent shadow-sm"
                }`}
                dir={textDirection}
              >
                <div className="w-32 h-32 shrink-0 overflow-hidden rounded-xl">
                  <img
                    src={item.image_url || "/placeholder.png"}
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>

                <div
                  className={`flex-1 flex flex-col justify-between overflow-hidden ${textAlign}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[10px] font-bold text-white px-2 py-0.5 rounded-md ${gradientClass}`}
                      >
                        {item.Category?.category_name || "News"}
                      </span>
                      <span
                        className="text-[10px] text-gray-400 font-mono"
                        dir="ltr"
                      >
                        {item.sent_at}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-gray-800 dark:text-white line-clamp-1 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                      {item.summary?.split(" ").slice(0, 6).join(" ")}...
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}

          <div className="flex justify-center pt-4">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={isFetching}
              className="px-8 py-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full text-sm font-bold transition-all flex items-center gap-2"
            >
              {isFetching ? (
                <Loader2 size={16} className="animate-spin" />
              ) : isRTL ? (
                "بارگذاری بیشتر"
              ) : (
                "Daha çox yüklə"
              )}
            </button>
          </div>
        </div>

        {/* DETAIL SECTION - Həmişə Sağda qalır, Arxa fon QARA */}
        {selectedNews && (
          <div
            className="lg:col-span-7 bg-[#000000] rounded-3xl border border-gray-800 overflow-hidden shadow-2xl animate-in slide-in-from-left duration-500 max-h-[85vh] overflow-y-auto scrollbar-hide sticky top-0"
            dir={textDirection}
          >
            {/* FIXED / STICKY CLOSE BUTTON */}
            <div className="sticky top-0 z-50 w-full flex justify-start p-4 pointer-events-none">
              <button
                onClick={() => setSelectedNews(null)}
                className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white rounded-full transition-all shadow-2xl border border-white/10 pointer-events-auto active:scale-90"
                dir="ltr"
              >
                <X size={24} />
              </button>
            </div>

            {/* Detail Image */}
            <div className="relative w-full h-72 bg-[#111] -mt-16">
              {" "}
              {/* -mt-16 düymənin yerini kompensasiya edir */}
              <img
                src={selectedNews.image_url || "/placeholder.png"}
                className="w-full h-full object-contain"
                alt=""
              />
            </div>

            <div className={`p-8 ${textAlign}`}>
              <h2 className="text-2xl font-black text-white mb-4 leading-tight tracking-tight">
                {selectedNews.title}
              </h2>

              <p
                className={`text-lg italic text-gray-300 mb-8 leading-relaxed ${
                  isRTL
                    ? "border-r-4 border-fuchsia-500 pr-4"
                    : "border-l-4 border-fuchsia-500 pl-4"
                }`}
              >
                {selectedNews.summary}
              </p>

              {/* INSIGHT BOX */}
              <div className="relative p-6 rounded-3xl bg-[#111] border border-gray-800 mb-8 shadow-inner">
                <div
                  className={`absolute -top-4 ${
                    isRTL ? "right-6" : "left-6"
                  } p-2 rounded-xl text-white shadow-lg ${gradientClass}`}
                >
                  <Sparkles size={20} />
                </div>
                <h4 className="text-fuchsia-500 font-black mb-3 mt-2">
                  Insight
                </h4>
                <p className="text-sm text-gray-400 leading-loose">
                  {selectedNews.insight}
                </p>

                <div className="flex flex-wrap gap-2 mt-6 justify-start">
                  {selectedNews.keywords.split(",").map((tag, idx) => (
                    <span
                      key={idx}
                      className="flex items-center gap-1 px-3 py-1 bg-white/5 text-gray-500 text-[10px] font-bold rounded-full border border-white/10"
                    >
                      <Tag size={10} />
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <a
                href={selectedNews.news_url || "#"}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-bold transition-all shadow-xl hover:shadow-fuchsia-500/20 active:scale-95 ${gradientClass}`}
              >
                <span>{isRTL ? "مشاهده خبر کامل" : "Mənbəyə keçid"}</span>
                <ArrowUpRight size={20} />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPage;
