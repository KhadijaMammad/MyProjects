import {
  useGetTasksQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "../../../redux/services/taskApi";
import type { TaskStatus, TaskPriority } from "../../../types/tasks/task";
import { toast } from "react-toastify";

export const TaskTable = () => {
  const { data: tasks, isLoading, error } = useGetTasksQuery();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  // Statuslar üçün xüsusi stillər
  const getStatusStyle = (status: TaskStatus) => {
    switch (status) {
      case "In Progress":
        return "bg-amber-50 text-amber-600 border-amber-100";
      case "Done":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "Open":
        return "bg-blue-50 text-blue-600 border-blue-100";
      default:
        return "bg-slate-50 text-slate-500 border-slate-100";
    }
  };

  // Prioritetlər üçün xüsusi stillər
  const getPriorityStyle = (priority: TaskPriority) => {
    switch (priority) {
      case "Urgent":
        return "text-rose-600 bg-rose-50 border-rose-100";
      case "High":
        return "text-orange-600 bg-orange-50 border-orange-100";
      case "Medium":
        return "text-amber-600 bg-amber-50 border-amber-100";
      case "Low":
        return "text-emerald-600 bg-emerald-50 border-emerald-100";
      default:
        return "text-slate-500 bg-slate-50 border-slate-100";
    }
  };

  // Yeniləmə funksiyası (həm status, həm prioritet üçün)
  const handleUpdate = async (id: number, patch: any) => {
    try {
      await updateTask({ id, data: patch }).unwrap();
      toast.success("Yeniləndi", { autoClose: 1000 });
    } catch (err) {
      toast.error("Xəta baş verdi");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Bu tapşırığı silmək istədiyinizə əminsiniz?")) {
      try {
        await deleteTask(id).unwrap();
        toast.success("Silindi");
      } catch (err) {
        toast.error("Silinmə zamanı xəta");
      }
    }
  };

  if (isLoading)
    return <div className="p-10 text-center text-slate-400">Yüklənir...</div>;
  if (error)
    return (
      <div className="p-10 text-center text-rose-400 font-bold">
        Dataları yükləmək mümkün olmadı!
      </div>
    );

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-50 bg-slate-50/30">
            <th className="p-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Tapşırıq
            </th>
            <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Status
            </th>
            <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Prioritet
            </th>
            <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Deadline
            </th>
            <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">
              Hərəkətlər
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {tasks?.map((task) => (
            <tr
              key={task.id}
              className="hover:bg-slate-50/50 transition-colors group"
            >
              {/* Tapşırıq Adı */}
              <td className="p-4 px-6">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-300 text-fuchsia-600 focus:ring-fuchsia-500 cursor-pointer"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    {task.title}
                  </span>
                </div>
              </td>

              {/* Status Select */}
              <td className="p-4">
                <select
                  value={task.status}
                  onChange={(e) =>
                    handleUpdate(task.id, { Status: e.target.value })
                  }
                  className={`px-3 py-1 rounded-full text-[11px] font-bold border cursor-pointer outline-none transition-all ${getStatusStyle(
                    task.status
                  )}`}
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                  <option value="Backlog">Backlog</option>
                </select>
              </td>

              {/* Priority Select */}
              <td className="p-4">
                <select
                  value={task.priority}
                  onChange={(e) =>
                    handleUpdate(task.id, { Priority: e.target.value })
                  }
                  className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold outline-none cursor-pointer transition-all ${getPriorityStyle(
                    task.priority
                  )}`}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </td>

              {/* Deadline */}
              <td className="p-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <span className="text-sm">📅</span>
                  <span className="text-xs font-semibold">
                    {task.deadline
                      ? new Date(task.deadline).toLocaleDateString("az-AZ", {
                          day: "numeric",
                          month: "short",
                        })
                      : "Tarix yoxdur"}
                  </span>
                </div>
              </td>

              {/* Delete Button */}
              <td className="p-4 text-right">
                <button
                  onClick={() => handleDelete(task.id)}
                  className="p-2.5 text-rose-500 hover:bg-rose-50 rounded-xl transition-all active:scale-90"
                  title="Sil"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {tasks?.length === 0 && (
        <div className="p-16 text-center">
          <div className="text-4xl mb-3">📝</div>
          <p className="text-slate-400 text-sm font-medium">
            Hələ ki heç bir tapşırıq yoxdur.
          </p>
        </div>
      )}
    </div>
  );
};
