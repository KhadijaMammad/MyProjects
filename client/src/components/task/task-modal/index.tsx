import React, { useState } from 'react';
import { useCreateTaskMutation } from '../../../redux/services/taskApi';
import { toast } from 'react-toastify';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const TaskModal = ({ isOpen, onClose }: Props) => {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [formData, setFormData] = useState({
    Title: '',
    Status: 'Open',
    Priority: 'Medium',
    Deadline: '' // Tarix üçün yer
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTask([formData]).unwrap();
      toast.success("Yeni tapşırıq yaradıldı!");
      onClose();
      setFormData({ Title: '', Status: 'Open', Priority: 'Medium', Deadline: '' });
    } catch (err) {
      toast.error("Xəta baş verdi");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8 transform transition-all border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">Yeni Tapşırıq ✨</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-rose-500 transition-colors">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest">Başlıq</label>
            <input 
              required
              placeholder="Nə edilməlidir?"
              className="w-full bg-slate-50 border-none rounded-2xl py-3.5 px-4 mt-1 outline-none focus:ring-2 focus:ring-fuchsia-500/20 text-slate-700"
              value={formData.Title}
              onChange={e => setFormData({...formData, Title: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest">Prioritet</label>
              <select 
                className="w-full bg-slate-50 border-none rounded-xl py-3 px-3 mt-1 outline-none text-sm font-medium"
                value={formData.Priority}
                onChange={e => setFormData({...formData, Priority: e.target.value})}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1 tracking-widest">Son Tarix</label>
              <input 
                type="date"
                className="w-full bg-slate-50 border-none rounded-xl py-3 px-3 mt-1 outline-none text-sm font-medium text-slate-600"
                value={formData.Deadline}
                onChange={e => setFormData({...formData, Deadline: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full bg-linear-to-br from-[#e11d48] via-[#c026d3] to-[#2563eb] text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all mt-4"
          >
            {isLoading ? "Yaradılır..." : "TAPŞIRIĞI ƏLAVƏ ET"}
          </button>
        </form>
      </div>
    </div>
  );
};