import React, { useState } from 'react';
import { useAddFolderMutation } from '../../../redux/services/folderApi';
import { toast } from 'react-toastify';

const CreateFolderModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [name, setName] = useState('');
  const [addFolder, { isLoading }] = useAddFolderMutation();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      await addFolder({ name }).unwrap();
      toast.success("Qovluq yaradıldı!");
      setName('');
      onClose();
    } catch (err) { toast.error("Xəta!"); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200">
        <h3 className="text-xl font-black mb-4">Yeni Qovluq</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 ring-blue-500/10" 
            placeholder="Qovluq adı..." value={name} onChange={e => setName(e.target.value)} autoFocus
          />
          <div className="flex gap-2">
            <button type="button" onClick={onClose} className="flex-1 py-3 font-bold text-slate-500 hover:bg-slate-100 rounded-2xl transition-all">Ləğv et</button>
            <button disabled={isLoading} className="flex-1 py-3 font-bold text-white bg-blue-600 rounded-2xl">Yarat</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFolderModal;