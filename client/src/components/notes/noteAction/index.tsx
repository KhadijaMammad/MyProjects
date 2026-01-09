import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Star, Trash2, RotateCcw, Trash, Pin } from 'lucide-react';
import { toast } from 'react-toastify';
import { 
  useMoveToTrashMutation, 
  useRestoreNoteMutation, 
  useToggleFavoriteMutation, 
  useHardDeleteMutation 
} from '../../../redux/services/notesApi';

interface NoteActionsProps {
  noteId: number;
  isFavorite: boolean;
  isDeleted: boolean;
  isPinned?: boolean; // Artıq buradadır
}

const NoteActions: React.FC<NoteActionsProps> = ({ noteId, isFavorite, isDeleted, isPinned }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const [moveToTrash] = useMoveToTrashMutation();
  const [restoreNote] = useRestoreNoteMutation();
  const [toggleFavorite] = useToggleFavoriteMutation();
  const [hardDelete] = useHardDeleteMutation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAction = async (e: React.MouseEvent, actionFn: any, msg: string) => {
    e.stopPropagation();
    try {
      await actionFn(noteId).unwrap();
      toast.success(msg);
    } catch { toast.error("Xəta!"); }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <div className="flex items-center gap-1">
        {/* Əgər not sancaqlaılıbsa, menyu düyməsinin yanında kiçik bir nişan göstərək */}
        {isPinned && !isDeleted && (
          <Pin size={12} className="text-[#c026d3] fill-[#c026d3] -rotate-45" />
        )}
        
        <button 
          onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }} 
          className={`p-1.5 rounded-lg transition-colors ${isOpen ? 'bg-slate-100 text-slate-600' : 'text-slate-400 hover:bg-slate-50'}`}
        >
          <MoreVertical size={16} />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-44 bg-white border border-slate-100 rounded-xl shadow-xl z-100 overflow-hidden py-1 animate-in fade-in zoom-in duration-150">
          {!isDeleted ? (
            <>
              {/* Sancaq məlumatı (Gələcəkdə toggle əlavə edilə bilər) */}
              {isPinned && (
                <div className="px-4 py-2 text-[10px] font-bold text-[#c026d3] bg-fuchsia-50 uppercase tracking-wider flex items-center gap-2">
                   <Pin size={10} fill="currentColor" /> Sancaqlaınıb
                </div>
              )}

              <button onClick={(e) => handleAction(e, toggleFavorite, isFavorite ? "Favoritlərdən çıxarıldı" : "Favorit edildi")} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                <Star size={16} className={isFavorite ? "fill-yellow-400 text-yellow-400" : ""} /> 
                {isFavorite ? "Favoritdən çıxar" : "Favorit et"}
              </button>
              
              <div className="h-px bg-slate-50 my-1" />
              
              <button onClick={(e) => handleAction(e, moveToTrash, "Zibil qutusuna atıldı")} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50">
                <Trash2 size={16} /> Sil
              </button>
            </>
          ) : (
            <>
              <button onClick={(e) => handleAction(e, restoreNote, "Bərpa edildi")} className="w-full flex items-center gap-3 px-4 py-2 text-sm text-green-600 hover:bg-green-50">
                <RotateCcw size={16} /> Geri qaytar
              </button>
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  if(confirm("Bu qeydi birdəfəlik silmək istədiyinizə əminsiniz?")) 
                    handleAction(e, hardDelete, "Tamamilə silindi"); 
                }} 
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-bold"
              >
                <Trash size={16} /> Birdəfəlik sil
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NoteActions;