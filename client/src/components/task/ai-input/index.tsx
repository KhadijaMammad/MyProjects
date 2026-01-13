import { useState } from 'react';
import { useCreateTaskMutation } from '../../../redux/services/taskApi';
import { toast } from 'react-toastify';

export const AIInput = () => {
    const [inputValue, setInputValue] = useState('');
    const [createTask, { isLoading }] = useCreateTaskMutation();

    const gradientClass = "bg-gradient-to-br from-[#e11d48] via-[#c026d3] to-[#2563eb]";

    const handleSend = async () => {
        if (!inputValue.trim()) return;
        
        try {
            await createTask([{
                Title: inputValue,
                Desciption: "", 
                Status: "Open",
                Priority: "Medium",
                Deadline: new Date().toISOString().split('T')[0]
            }]).unwrap();
            
            setInputValue('');
            toast.success("Yeni tapşırıq yaradıldı ✨");
        } catch (err: any) {
            console.error("Yaratma xətası:", err);
            toast.error("Yaratmaq mümkün olmadı");
        }
    };

    return (
        <div className="w-full bg-white rounded-3xl border border-slate-100 p-4 shadow-sm mb-8">
            <div className="flex items-start gap-3 mb-4">
                <div className={`${gradientClass} w-8 h-8 rounded-full flex items-center justify-center text-white text-xs shadow-md`}>
                    ✨
                </div>
                <div className="bg-slate-50 rounded-2xl p-3 text-sm text-slate-600 max-w-[80%]">
                    Hello MRH. Tell me what needs to be done, and I'll add it to your task list.
                </div>
            </div>

            <div className="relative group">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="E.g., 'Draft the Q4 report by Friday...'"
                    className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-6 pr-14 text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-fuchsia-500/20 transition-all outline-none"
                />
                
                <button
                    onClick={handleSend}
                    disabled={isLoading || !inputValue.trim()}
                    className={`absolute right-2 top-1/2 -translate-y-1/2 ${gradientClass} w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50`}
                >
                    {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
};