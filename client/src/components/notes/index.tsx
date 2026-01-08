import React, { useState } from "react";
import {
  useGetNotesQuery,
  useUpdateNoteMutation,
  useAddNoteMutation,
  useDeleteNoteMutation,
} from "../../redux/services/notesApi";
import NoteEditor from "../../components/notes/editor/index";
import type { Note } from "../../types/notes/note";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion"; // Animasiyalı silmə üçün

const NotesPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [selectedNote, setSelectedNote] = useState<Partial<Note> | null>(null);
  const [description, setDescription] = useState("");
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(
    null
  );

  const { data: response } = useGetNotesQuery(search);
  const notes = response?.data || [];

  const [updateNote] = useUpdateNoteMutation();
  const [addNote] = useAddNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();

  const gradientClass =
    "bg-gradient-to-br from-[#e11d48] via-[#c026d3] to-[#2563eb]";

  const handleSave = async () => {
    if (!selectedNote || !selectedNote.title) {
      toast.warn("Zəhmət olmasa başlıq daxil edin!");
      return;
    }

    try {
      if (isCreatingNew) {
        await addNote({ title: selectedNote.title, description }).unwrap();
        toast.success("Yeni qeyd uğurla əlavə edildi! 🎉");
        setIsCreatingNew(false);
        setSelectedNote(null);
      } else if (selectedNote.id) {
        await updateNote({ ...(selectedNote as Note), description }).unwrap();
        toast.info("Dəyişikliklər yadda saxlanıldı ✨");
      }
    } catch (err) {
      toast.error("Xəta baş verdi!");
    }
  };

  const confirmDelete = async (id: number) => {
    try {
      await deleteNote(id).unwrap();
      toast.error("Qeyd silindi 🗑️");
      setShowDeleteConfirm(null);
      setSelectedNote(null);
    } catch (err) {
      toast.error("Silinmə zamanı xəta!");
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden">
      {/* SOL PANEL */}
      <div className="w-100 border-r border-slate-200/60 flex flex-col bg-white/80 backdrop-blur-xl">
        <div className="p-8">
          <div className="flex flex-col gap-6 mb-10">
            <div className="flex justify-between items-center">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                Qeydlər
              </h2>
              <div className="p-2 bg-slate-100 rounded-full text-slate-400">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </div>
            </div>

            <button
              onClick={() => {
                setIsCreatingNew(true);
                setSelectedNote({ title: "", description: "" });
                setDescription("");
              }}
              className={`${gradientClass} text-white w-50 py-2 rounded-2xl text-sm font-bold shadow-xl shadow-purple-200 transition-all active:scale-95 flex items-center justify-center gap-2`}
            >
              <span className="text-xl">+</span> New Note
            </button>
          </div>

          <div className="relative mb-8 group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Qeydlərdə axtar..."
              className="w-full pl-12 pr-4 py-4 bg-slate-100/50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-2xl text-sm outline-none transition-all"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 mb-6 px-1">
            <svg
              className="text-orange-500"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
            </svg>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              Recent
            </p>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
            {notes.map((note: Note) => (
              <div
                key={note.id}
                onClick={() => {
                  setSelectedNote(note);
                  setDescription(note.description);
                  setIsCreatingNew(false);
                }}
                className={`p-5 rounded-3xl cursor-pointer transition-all duration-300 relative group ${
                  selectedNote?.id === note.id
                    ? "bg-white shadow-2xl shadow-slate-200 ring-1 ring-slate-100"
                    : "hover:bg-white/60"
                }`}
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1">
                    <h4 className="text-[15px] font-bold text-slate-800 mb-1 leading-tight">
                      {note.title}
                    </h4>
                    <p className="text-[12px] text-slate-400 line-clamp-1 italic font-medium">
                      {note.description.replace(/<[^>]*>/g, "") ||
                        "Boş qeyd..."}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDeleteConfirm(note.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>

                {/* SİLMƏ TƏSDİQİ (Hər notun daxilində kiçik modal) */}
                <AnimatePresence>
                  {showDeleteConfirm === note.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-3xl z-20 flex items-center justify-center gap-3 px-4 text-center"
                    >
                      <p className="text-[11px] font-bold text-slate-600">
                        Silinsin?
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          confirmDelete(note.id);
                        }}
                        className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold"
                      >
                        Bəli
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowDeleteConfirm(null);
                        }}
                        className="bg-slate-100 text-slate-600 px-3 py-1.5 rounded-lg text-[10px] font-bold"
                      >
                        Xeyr
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SAĞ PANEL */}

      <div className="flex-1 bg-white flex flex-col relative">
        {selectedNote ? (
          <>
            <div className="h-20 flex items-center justify-between px-10 border-b border-slate-50">
              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                Workspace / Editor
              </span>
              <button
                onClick={handleSave}
                className={`${gradientClass} text-white px-8 py-2.5 rounded-xl text-xs font-bold shadow-lg`}
              >
                Saxla ✓
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-10 py-16 w-full">
              <input
                className="text-4xl font-black text-slate-900 w-full border-none outline-none mb-12 placeholder:text-slate-100"
                placeholder="Başlıq..."
                value={selectedNote.title}
                onChange={(e) =>
                  setSelectedNote({ ...selectedNote, title: e.target.value })
                }
              />

              <NoteEditor
                content={description}
                onChange={(html) => setDescription(html)}
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">...</div>
        )}
      </div>
    </div>
  );
};

export default NotesPage;
