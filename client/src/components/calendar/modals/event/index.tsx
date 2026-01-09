// src/components/calendar/EventModal.tsx
import { useState, useEffect } from 'react';

export const EventModal = ({ isOpen, onClose, event, onSave, onDelete }: any) => {
  const [formData, setFormData] = useState({ title: '', start: '', end: '', desc: '' });
  const gradientClass = "bg-gradient-to-br from-[#e11d48] via-[#c026d3] to-[#2563eb]";

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        start: event.start ? new Date(event.start).toISOString().slice(0, 16) : '',
        end: event.end ? new Date(event.end).toISOString().slice(0, 16) : '',
        desc: event.extendedProps?.description || ''
      });
    } else {
      setFormData({ title: '', start: '', end: '', desc: '' });
    }
  }, [event, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all">
      <div className="bg-white w-full max-w-md rounded-4xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        
        <div className={`${gradientClass} p-8 text-white`}>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-black italic uppercase tracking-tighter">
              {event?.id ? 'Edit Event' : 'New Plan'}
            </h2>
            <button onClick={onClose} className="text-white/80 hover:text-white text-xl">✕</button>
          </div>
        </div>

        <div className="p-8 space-y-5">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Event Title</label>
            <input 
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-fuchsia-500/20 outline-none font-semibold text-slate-700"
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})}
              placeholder="e.g. Team Meeting"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Starts</label>
              <input 
                type="datetime-local" 
                className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium"
                value={formData.start} 
                onChange={e => setFormData({...formData, start: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Ends</label>
              <input 
                type="datetime-local" 
                className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium"
                value={formData.end} 
                onChange={e => setFormData({...formData, end: e.target.value})}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <button 
              onClick={() => onSave(formData)}
              className={`${gradientClass} w-full py-4 rounded-2xl text-white font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all`}
            >
              CONFIRM & SAVE
            </button>
            {event?.id && (
              <button 
                onClick={() => onDelete(event.id)}
                className="w-full py-2 text-rose-500 font-bold text-[10px] uppercase tracking-widest hover:bg-rose-50 rounded-xl transition-colors"
              >
                Delete Event
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};