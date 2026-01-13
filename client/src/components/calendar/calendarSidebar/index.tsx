// src/components/calendar/Sidebar.tsx
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useSelector } from "react-redux";
import { useLazyGetGoogleAuthUrlQuery } from "../../../redux/services/calendarApi";
import type { RootState } from "../../../redux/app/store";
import { toast } from "react-toastify";

export const Sidebar = ({ isOpen, onNewEvent }: any) => {
  const gradientClass =
    "bg-gradient-to-br from-[#e11d48] via-[#c026d3] to-[#2563eb]";

  const user = useSelector((state: RootState) => state.auth?.user);
  const [triggerGetUrl, { isLoading: isLinking }] =
    useLazyGetGoogleAuthUrlQuery();

  const handleConnectGoogle = async () => {
    console.log("1. Düymə sıxıldı!");
    try {
      const userId =
        user?.user_id ||
        JSON.parse(localStorage.getItem("userData") || "{}")?.user_id;
      console.log("2. Tapılan User ID:", userId);
      if (!userId) {
        toast.error("İstifadəçi tapılmadı. Zəhmət olmasa yenidən giriş edin.");
        return;
      }

      console.log("3. Backend-ə sorğu göndərilir...");
      const result = await triggerGetUrl({ userId }).unwrap();
      console.log("4. Backend-dən gələn cavab:", result);

      if (result?.url) {
        // İstifadəçini Google-un icazə səhifəsinə yönləndiririk
        window.location.href = result.url;
      }
    } catch (err: any) {
      console.error("Google bağlantı xətası:", err);
      toast.error(
        err?.data?.message || "Google linki alınarkən xəta baş verdi."
      );
    }
  };

  return (
    <div
      className={`transition-all duration-500 border-r border-slate-100 bg-white flex flex-col ${
        isOpen ? "w-72" : "w-0 overflow-hidden"
      }`}
    >
      <div className="p-5 space-y-8">
        {/* Düymələr bloku */}
        <div className="space-y-3">
          {/* New Event Button */}
          <button
            onClick={onNewEvent}
            className={`${gradientClass} w-full py-3.5 rounded-2xl text-white font-bold text-sm shadow-lg shadow-rose-500/20 hover:scale-[1.02] transition-transform active:scale-95 flex items-center justify-center gap-2`}
          >
            <span className="text-xl">+</span> CREATE EVENT
          </button>

          {/* Google Connect Button */}
          <button
            onClick={handleConnectGoogle}
            disabled={isLinking}
            className={`w-full py-3 rounded-2xl border border-slate-200 text-slate-600 font-bold text-[11px] uppercase tracking-wider hover:bg-slate-50 transition-all flex items-center justify-center gap-2 ${
              isLinking ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLinking ? (
              <span className="flex items-center gap-2 italic">
                <div className="w-3 h-3 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                Connecting...
              </span>
            ) : (
              <>
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="google"
                  className="w-3.5 h-3.5"
                />
                Connect Google Calendar
              </>
            )}
          </button>
        </div>

        {/* Mini Calendar */}
        <div className="mini-calendar-container">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[2px] mb-4 ml-2">
            Quick View
          </h3>
          <Calendar
            className="border-none text-xs rounded-xl shadow-sm bg-slate-50/50 p-2"
            locale="az-AZ"
          />
        </div>

        {/* Categories */}
        <div className="space-y-4 px-2">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[2px]">
            My Calendars
          </h3>
          <div className="space-y-3">
            {["AI Events", "Personal", "Work"].map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded border-slate-300 text-fuchsia-600 focus:ring-fuchsia-500 cursor-pointer"
                />
                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
                  {cat}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
