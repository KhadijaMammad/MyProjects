import { useState } from 'react';
import { TaskModal } from '../components/task/task-modal/index'; 
import { AIInput } from '../components/task/ai-input';
import { TaskTable } from '../components/task/mainSection';

export const TaskPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const gradientClass = "bg-gradient-to-br from-[#e11d48] via-[#c026d3] to-[#2563eb]";

  return (
    <div className="min-h-screen bg-[#f8fafc] p-8 lg:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header hissəsindəki düyməni yeniləyirik */}
        <div className="flex items-center justify-between mb-10">
          <div>
             <h1 className="text-4xl font-extrabold text-slate-900">Tapşırıqlar</h1>
             <p className="text-slate-500 font-medium">Organize your work with AI assistance.</p>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)} // Modal-ı açır
            className={`${gradientClass} text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-lg hover:scale-105 transition-all`}
          >
            + NEW TASK
          </button>
        </div>

        <AIInput />
        <TaskTable />

        {/* Modal-ı bura əlavə edirik */}
        <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
};