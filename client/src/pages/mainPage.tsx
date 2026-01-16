import React from "react";
import { useGetDashboardDataQuery } from "../redux/services/dashboardApi";
import type {
  CalendarEvent,
  NewsItem,
  TaskItem,
} from "../types/dashboard/dashboard";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const { data, error, isLoading } = useGetDashboardDataQuery(undefined);

  const gradientClass =
    "bg-gradient-to-br from-[#e11d48] via-[#c026d3] to-[#2563eb]";

  if (isLoading)
    return <div className="p-10 text-center font-bold">Yüklənir...</div>;

  if (error) {
    const errorMessage =
      "status" in error ? JSON.stringify(error.data) : "Xəta baş verdi";
    return <div className="p-8 text-red-500">Xəta: {errorMessage}</div>;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 md:p-10">
      <header className="mb-12">
        <h1 className="text-3xl font-black text-gray-800 tracking-tight">
          Sabahın xeyir,{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#e11d48] to-[#2563eb]">
            Khadija
          </span>
        </h1>
        <p className="text-gray-500 font-medium mt-1">Gününüz uğurlu keçsin!</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 1. CALENDAR SECTION */}
        <div className="relative group">
          <div
            className={`absolute -inset-0.5 ${gradientClass} rounded-3xl blur opacity-10 group-hover:opacity-30 transition duration-500`}
          ></div>
          <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Bugünkü Görüşlər
              </h2>
              <Link to={"/calendar"}>
                {" "}
                <button className="text-[#2563eb] text-sm font-bold hover:underline">
                  Hamısına bax
                </button>
              </Link>
            </div>
            <div className="space-y-4">
              {data?.calendar?.map((event: CalendarEvent) => (
                <div
                  key={event.id}
                  className="flex items-center p-4 rounded-xl bg-gray-50 border border-gray-100 hover:scale-[1.02] transition-transform"
                >
                  <div
                    className={`w-1 h-10 ${gradientClass} rounded-full mr-4`}
                  />
                  <div>
                    <h4 className="font-bold text-gray-700 text-sm">
                      {event.title}
                    </h4>
                    <p className="text-xs text-gray-400 font-semibold">
                      {event.startTime} • Zoom
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. NEWS SECTION */}
        <div className="relative group">
          <div
            className={`absolute -inset-0.5 ${gradientClass} rounded-3xl blur opacity-10 group-hover:opacity-30 transition duration-500`}
          ></div>
          <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Son Xəbərlər</h2>
              <Link to={"/news"}>
                {" "}
                <button className="text-[#2563eb] text-sm font-bold hover:underline">
                  Arxiv
                </button>
              </Link>
            </div>
            <div className="space-y-6">
              {data?.news?.map((news: NewsItem) => (
                <div
                  key={news.id}
                  className="border-b border-gray-50 pb-4 last:border-0 group/item cursor-pointer"
                >
                  <span className="text-[10px] font-black text-[#c026d3] uppercase tracking-widest">
                    {news.category || "İNSAYT"}
                  </span>
                  <h4 className="font-bold text-gray-700 text-[14px] mt-1 group-hover/item:text-[#2563eb] transition-colors italic">
                    "{news.title}"
                  </h4>
                  <p className="text-[11px] text-gray-400 mt-2">
                    {news.createdAt}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. TASKS SECTION */}
        <div className="relative group">
          <div
            className={`absolute -inset-0.5 ${gradientClass} rounded-3xl blur opacity-10 group-hover:opacity-30 transition duration-500`}
          ></div>
          <div className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Tapşırıqlar</h2>
              <Link to={"/tasks"}>
                <button className="text-[#2563eb] text-sm font-bold hover:underline">
                  Siyahı
                </button>
              </Link>
            </div>
            <div className="space-y-3">
              {data?.tasks?.map((task: TaskItem) => (
                <label
                  key={task.id}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-all group/task"
                >
                  <input
                    type="checkbox"
                    defaultChecked={task.completed}
                    className={`h-5 w-5 rounded border-gray-300 text-[#c026d3] focus:ring-[#c026d3] cursor-pointer`}
                  />
                  <span className="text-sm font-bold text-gray-600 peer-checked:line-through group-hover/task:text-gray-900 transition-colors">
                    {task.title}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
