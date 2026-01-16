import { NavLink } from "react-router-dom";
import {
  Home,
  Calendar,
  Newspaper,
  Sparkles,
  FileText,
  CheckSquare,
  Settings,
  Leaf,
  Zap,
} from "lucide-react";
// import LeafLogo from "../../../assets/images/bymrh-logo.png.png";
import UserAvatar from "../../../assets/images/User-avatar.svg.webp"



const menuItems = [
  { name: "Əsas Səhifə", icon: Home, path: "/" },
  { name: "Təqvim", icon: Calendar, path: "/calendar" },
  { name: "Xəbərlər", icon: Newspaper, path: "/news" },
  { name: "GemTalk", icon: Sparkles, path: "/gemtalk" },
  { name: "Qeydlər", icon: FileText, path: "/notes" },
  { name: "Tapşırıqlar", icon: CheckSquare, path: "/tasks" },
];

const Sidebar = () => {
  const gradientClass =
    "bg-gradient-to-br from-[#e11d48] via-[#c026d3] to-[#2563eb]";

  return (
    <aside className="fixed font-sans left-0 top-0 bottom-0 w-70 flex flex-col justify-between bg-white dark:bg-[#1A2633] border-r border-gray-200 dark:border-gray-800 h-screen p-4 z-50 shadow-l">
      {/* Dekorativ Parlaq Gradient Blur */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 ${gradientClass} opacity-10 blur-[60px] pointer-events-none rounded-bl-full`}
      ></div>

      <div className="flex flex-col gap-8 relative z-10">
        {/* İstifadəçi Məlumatı */}
        <div className="flex items-center gap-3 px-2 py-2">
           <div
            className="rounded-full h-12 w-12 border-2 border-gray-100 dark:border-gray-700 shadow-md overflow-hidden bg-gray-200 shrink-0"
            style={{
              backgroundImage: `url(${UserAvatar})`,
              backgroundSize: "cover",
            }}
          ></div>
        
          <div className="flex flex-col truncate">
            <span className="text-sm font-black text-black dark:text-white flex items-center gap-1">
              <span className="truncate">Personal</span>
              {/* <img src={LeafLogo} alt="" className="w-3.5 top-1" /> */}
            </span>
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
              Təsisçi
            </span>
          </div>
        </div>

        {/* Menyu Naviqasiyası */}
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative ${
                  isActive
                    ? `${gradientClass} text-white shadow-lg shadow-fuchsia-500/40 translate-x-1`
                    : "text-black dark:text-gray-200 hover:text-white "
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Hover zamanı görünən gradient background */}
                  {!isActive && (
                    <div
                      className={`absolute inset-0 ${gradientClass} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl -z-10`}
                    ></div>
                  )}

                  <item.icon
                    size={22}
                    strokeWidth={2.5}
                    className={`transition-colors duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-black dark:text-gray-200 group-hover:text-white"
                    }`}
                  />
                  <span
                    className={`text-[14px] font-sans tracking-tight transition-colors duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-black dark:text-gray-200 group-hover:text-white"
                    }`}
                  >
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Alt hissə (Həmişə sabit ən aşağıda) */}
      <div className="mt-auto pt-4 relative z-10">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group mb-4 overflow-hidden ${
              isActive
                ? `${gradientClass} text-white shadow-lg`
                : "text-black dark:text-gray-200 hover:text-white"
            }`
          }
        >
          {({ isActive }) => (
            <>
              {!isActive && (
                <div
                  className={`absolute inset-0 ${gradientClass} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}
                ></div>
              )}

              <Settings
                size={22}
                strokeWidth={2.5}
                className="relative z-10 group-hover:rotate-90 transition-transform duration-500"
              />
              <span className="relative z-10 text-[14px] font-bold">
                Tənzimləmələr
              </span>
            </>
          )}
        </NavLink>
        <div className="px-2">
          <div className="h-[1.5px] bg-gray-100 dark:bg-gray-800 w-full mb-4"></div>
          <div className="flex items-center justify-between text-[11px] font-black tracking-tighter text-gray-400 uppercase">
            <div className="flex items-center gap-1.5 group cursor-default">
              <Leaf
                size={16}
                className="text-[#c026d3] group-hover:animate-bounce"
              />
              <span className="dark:text-gray-500">2.4.0</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap
                size={14}
                fill="#eab308"
                className="text-yellow-500 animate-pulse"
              />
              <span className="text-[9px] text-yellow-600"></span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
