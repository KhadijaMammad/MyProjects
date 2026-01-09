import React from 'react';
import { Folder, Star, Trash2, StickyNote, Plus} from 'lucide-react';
import { useGetFoldersQuery } from '../../../redux/services/folderApi';
import type { ActiveFilter } from '../../../types/folders/folder';

interface NotesSidebarProps {
  activeFilter: ActiveFilter;
  setActiveFilter: (filter: ActiveFilter) => void;
  onOpenFolderModal: () => void;
}

const NotesSidebar: React.FC<NotesSidebarProps> = ({ activeFilter, setActiveFilter, onOpenFolderModal }) => {
  const { data: folderRes } = useGetFoldersQuery('');
  const folders = folderRes?.data || [];

  // Menyu elementləri
  const mainNav = [
    { id: 'all', label: 'Bütün Qeydlər', icon: <StickyNote size={18} />, color: 'text-slate-500' },
    { id: 'fav', label: 'Favoritlər', icon: <Star size={18} />, color: 'text-yellow-500' },
    { id: 'trash', label: 'Zibil Qutusu', icon: <Trash2 size={18} />, color: 'text-red-500' },
  ];

  return (
    // Sidebar-ın daxili enini 64 (256px) olaraq sabitləyirik ki, 
    // çöldəki div daralanda içindəki elementlər sıxılmasın
    <div className="w-64 h-full flex flex-col p-4 bg-[#fbfcfd]">
      
      {/* Əsas Menyu */}
      <div className="space-y-1 mb-8">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 mb-2">Menyu</p>
        {mainNav.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveFilter(item.id as ActiveFilter)}
            className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 ${
              activeFilter === item.id 
                ? "bg-white shadow-sm ring-1 ring-slate-200 text-slate-900" 
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <span className={item.color}>{item.icon}</span>
            <span className="text-sm font-bold">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Qovluqlar Bölməsi */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="flex justify-between items-center px-3 mb-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Qovluqlar</p>
          <button 
            onClick={onOpenFolderModal} 
            className="p-1 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors group"
            title="Yeni qovluq"
          >
            <Plus size={16} className="group-hover:rotate-90 transition-transform duration-200" />
          </button>
        </div>
        
        <div className="space-y-1">
          {folders.length > 0 ? (
            folders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setActiveFilter(folder.id.toString())}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all ${
                  activeFilter === folder.id.toString() 
                    ? "bg-white shadow-sm ring-1 ring-slate-200 text-slate-900" 
                    : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <Folder 
                    size={18} 
                    className={folder.isPinned ? "text-blue-600" : "text-blue-300"} 
                    fill={folder.isPinned ? "currentColor" : "none"}
                  />
                  <span className="text-sm font-bold truncate">{folder.name}</span>
                </div>
              </button>
            ))
          ) : (
            <p className="px-3 text-[11px] text-slate-400 italic">Qovluq yoxdur</p>
          )}
        </div>
      </div>

      {/* Sidebar-ın aşağı hissəsində boşluq və ya əlavə məlumat üçün yer */}
      <div className="mt-auto pt-4 border-t border-slate-100/50">
        <div className="px-3 py-2 bg-slate-50 rounded-xl">
          <p className="text-[10px] text-slate-400 font-medium">Versiya 1.0.2</p>
        </div>
      </div>
    </div>
  );
};

export default NotesSidebar;