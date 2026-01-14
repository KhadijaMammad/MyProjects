import { useState, useEffect } from 'react';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: any;
  onSave: (formData: any) => void;
  onDelete: (id: any) => void;
}

export const EventModal = ({ isOpen, onClose, event, onSave, onDelete }: EventModalProps) => {
  const [formData, setFormData] = useState({ title: '', start: '', end: '', desc: '' });
  const gradientClass = "bg-gradient-to-br from-[#e11d48] via-[#c026d3] to-[#2563eb]";

  const formatDateForInput = (dateStr: string | null) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    // Saat qurşağı fərqini nəzərə alaraq ISO string-i kəsirik
    const offset = date.getTimezoneOffset() * 60000;
    const localISOTime = new Date(date.getTime() - offset).toISOString().slice(0, 16);
    return localISOTime;
  };

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || '',
        start: formatDateForInput(event.start),
        end: formatDateForInput(event.end),
        desc: event.extendedProps?.description || ''
      });
    } else {
      // Yeni event yaradılanda default vaxtlar (hal-hazırki vaxt)
      const now = new Date();
      const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
      setFormData({
        title: '',
        start: formatDateForInput(now.toISOString()),
        end: formatDateForInput(oneHourLater.toISOString()),
        desc: ''
      });
    }
  }, [event, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!formData.title || !formData.start || !formData.end) {
      alert("Zəhmət olmasa başlıq və vaxtları doldurun.");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md transition-all">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        
        {/* Header Section */}
        <div className={`${gradientClass} p-8 text-white relative`}>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-black italic uppercase tracking-tighter">
              {event?.id ? 'Edit Event' : 'New Plan'}
            </h2>
            <button 
              onClick={onClose} 
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-8 space-y-5">
          {/* Title Input */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
              Event Title
            </label>
            <input 
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-fuchsia-500/20 outline-none font-semibold text-slate-700 placeholder:text-slate-300 transition-all"
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})}
              placeholder="Məs: Komanda ilə görüş"
            />
          </div>

          {/* Dates Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Starts</label>
              <input 
                type="datetime-local" 
                className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium text-slate-600 outline-none focus:border-indigo-300"
                value={formData.start} 
                onChange={e => setFormData({...formData, start: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Ends</label>
              <input 
                type="datetime-local" 
                className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium text-slate-600 outline-none focus:border-indigo-300"
                value={formData.end} 
                onChange={e => setFormData({...formData, end: e.target.value})}
              />
            </div>
          </div>

          {/* Description Input */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Description</label>
            <textarea 
              rows={3}
              className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-fuchsia-500/20 outline-none font-medium text-slate-600 text-sm resize-none"
              value={formData.desc} 
              onChange={e => setFormData({...formData, desc: e.target.value})}
              placeholder="Görüş haqqında qeydlər..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-4">
            <button 
              onClick={handleSubmit}
              className={`${gradientClass} w-full py-4 rounded-2xl text-white font-bold shadow-lg shadow-blue-500/20 active:scale-95 hover:brightness-110 transition-all`}
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