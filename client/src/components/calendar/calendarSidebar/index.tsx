// src/components/calendar/Sidebar.tsx
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const Sidebar = ({ isOpen, onNewEvent }: any) => {
  const gradientClass = "bg-gradient-to-br from-[#e11d48] via-[#c026d3] to-[#2563eb]";

  return (
    <div className={`transition-all duration-500 border-r border-slate-100 bg-white flex flex-col ${isOpen ? 'w-72' : 'w-0 overflow-hidden'}`}>
      <div className="p-5 space-y-8">
        {/* New Event Button */}
        <button 
          onClick={onNewEvent}
          className={`${gradientClass} w-full py-3.5 rounded-2xl text-white font-bold text-sm shadow-lg shadow-rose-500/20 hover:scale-[1.02] transition-transform active:scale-95 flex items-center justify-center gap-2`}
        >
          <span className="text-xl">+</span> CREATE EVENT
        </button>

        {/* Mini Calendar */}
        <div className="mini-calendar-container">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[2px] mb-4 ml-2">Quick View</h3>
          <Calendar 
            className="border-none text-xs rounded-xl shadow-sm bg-slate-50/50 p-2" 
            locale="az-AZ"
          />
        </div>

        {/* Categories */}
        <div className="space-y-4 px-2">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[2px]">My Calendars</h3>
          <div className="space-y-3">
            {['AI Events', 'Personal', 'Work'].map((cat, _i) => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-300 text-fuchsia-600 focus:ring-fuchsia-500" />
                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{cat}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};