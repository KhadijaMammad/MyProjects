import React, { useState } from "react";
import { useGetNotesQuery, useUpdateNoteMutation, useAddNoteMutation } from "../../redux/services/notesApi";
import NoteEditor from "../../components/notes/editor/index";
import NotesSidebar from "../../components/notes/noteSidebar/index";
import CreateFolderModal from "../../components/notes/createFolder/index";
import NoteActions from "../notes/noteAction/index"; 
import type { Note } from "../../types/notes/note";
import type { ActiveFilter } from "../../types/folders/folder";
import { toast } from "react-toastify";
import { Folder, Menu, X } from "lucide-react";

const NotesPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");
  const [selectedNote, setSelectedNote] = useState<Partial<Note> | null>(null);
  const [description, setDescription] = useState("");
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const gradientClass = "bg-gradient-to-br from-[#e11d48] via-[#c026d3] to-[#2563eb]";

  // API üçün parametrlər
  const queryParams = {
    search: search || undefined,
    isFavorite: activeFilter === 'fav' ? true : undefined,
    isDeleted: activeFilter === 'trash' ? true : undefined,
    folderId: (!['all', 'fav', 'trash'].includes(activeFilter)) ? Number(activeFilter) : undefined
  };

  const { data: response } = useGetNotesQuery(queryParams);
  const notes = response?.data || [];
  const [addNote] = useAddNoteMutation();
  const [updateNote] = useUpdateNoteMutation();

 const handleSave = async () => {
  if (!selectedNote?.title) return toast.warn("Başlıq yazın!");

  const currentFolderId = (!['all', 'fav', 'trash'].includes(activeFilter as string)) 
    ? Number(activeFilter) 
    : undefined;

  try {
    if (!selectedNote.id) {
      await addNote({
        title: selectedNote.title,
        description: description,
        folder_id: currentFolderId, 
      }).unwrap();
      toast.success("Əlavə edildi!");
      setSelectedNote(null);
      setDescription("");
    } else {
      // YENİLƏMƏ
      await updateNote({
        id: selectedNote.id,
        title: selectedNote.title,
        description: description,
      }).unwrap();
      toast.info("Saxlanıldı!");
    }
  } catch (err) {
    toast.error("Xəta baş verdi!");
  }
};

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden font-sans">
      
      {/* SIDEBAR: Açılıb-bağlanan */}
      <div className={`${isSidebarOpen ? "w-64" : "w-0"} transition-all duration-300 ease-in-out border-r border-slate-200 bg-white overflow-hidden shrink-0`}>
        <div className="w-64 h-full">
          <NotesSidebar 
            activeFilter={activeFilter} 
            setActiveFilter={(f) => { setActiveFilter(f); setSelectedNote(null); }} 
            onOpenFolderModal={() => setIsFolderModalOpen(true)} 
          />
        </div>
      </div>

      {/* ORTA PANEL: Qeyd Siyahısı */}
      <div className="w-80 border-r border-slate-200 flex flex-col bg-white shrink-0">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 transition-colors">
              {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <h2 className="text-xl font-black uppercase tracking-tighter text-slate-800 italic">
              {activeFilter === 'all' ? 'Bütün Qeydlər' : activeFilter === 'fav' ? 'Favoritlər' : activeFilter === 'trash' ? 'Zibil Qutusu' : 'Qovluq'}
            </h2>
          </div>
          
          <input 
            className="w-full p-3 bg-slate-50 rounded-xl mb-4 outline-none text-sm border border-transparent focus:border-slate-200 transition-all" 
            placeholder="Notlarda axtar..." 
            value={search}
            onChange={e => setSearch(e.target.value)} 
          />
          
          <button 
            onClick={() => { setSelectedNote({ title: "" }); setDescription(""); }}
            className={`w-full py-3.5 ${gradientClass} text-white rounded-2xl font-bold text-xs shadow-lg shadow-fuchsia-500/20 mb-6 hover:shadow-fuchsia-500/40 active:scale-95 transition-all uppercase tracking-widest`}
          >
            + Yeni Qeyd
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-2 pb-10">
          {notes.map((note: Note) => (
            <div 
              key={note.id} 
              onClick={() => { setSelectedNote(note); setDescription(note.description); }}
              className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                selectedNote?.id === note.id 
                ? "bg-white shadow-xl border-fuchsia-100 ring-1 ring-fuchsia-50" 
                : "hover:bg-slate-50 border-transparent"
              }`}
            >
              <div className="flex justify-between items-start">
                <h4 className={`font-bold text-sm truncate pr-2 ${selectedNote?.id === note.id ? "text-[#c026d3]" : "text-slate-700"}`}>
                  {note.title || "Adsız"}
                </h4>
                <NoteActions noteId={note.id} isFavorite={note.isFavorite} isDeleted={note.isDeleted} isPinned={note.isPinned} />
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-1 mt-1 font-medium italic">
                {note.description.replace(/<[^>]*>/g, "") || "Məzmun yoxdur..."}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* SAĞ PANEL: Editor */}
      <div className="flex-1 bg-white flex flex-col min-w-0">
        {selectedNote ? (
          <>
            <div className="h-16 border-b flex items-center justify-between px-10 shrink-0">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">WorkSpace</span>
              <button 
                onClick={handleSave} 
                className={`${gradientClass} text-white px-8 py-2.5 rounded-xl text-xs font-bold shadow-md hover:brightness-110 transition-all active:scale-95`}
              >
                Yadda saxla
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-12 lg:px-24">
              <input 
                className="text-5xl font-black w-full outline-none mb-10 placeholder:text-slate-100 bg-transparent tracking-tighter" 
                placeholder="Başlıq daxil edin..." 
                value={selectedNote.title || ""} 
                onChange={e => setSelectedNote({...selectedNote, title: e.target.value})}
              />
              <NoteEditor content={description} onChange={setDescription} />
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-[#fbfcfd]">
             <div className="w-24 h-24 bg-white shadow-2xl rounded-[40px] flex items-center justify-center mb-6 text-slate-100 border border-slate-50">
                <Folder size={40} />
             </div>
             <p className="text-slate-400 font-bold tracking-tight">Qeyd seçilməyib</p>
          </div>
        )}
      </div>

      <CreateFolderModal isOpen={isFolderModalOpen} onClose={() => setIsFolderModalOpen(false)} />
    </div>
  );
};

export default NotesPage;