// // src/pages/CalendarPage.tsx

// const CalendarPage = () => {
//   const gradientClass = "bg-gradient-to-br from-[#e11d48] via-[#c026d3] to-[#2563eb]";

//   return (
//     <div className="flex h-screen bg-white overflow-hidden">
      
//       {/* --- SIDEBAR --- */}
//       <aside className="w-80 border-r border-slate-100 p-6 flex flex-col space-y-8">
        
//         {/* Logo/Başlıq */}
//         <div className="flex items-center space-x-2">
//           {/* <div className={`w-8 h-8 rounded-lg ${gradientClass}`} /> */}
//           <h1 className="text-2xl font-black italic tracking-tighter text-slate-800 uppercase">
//             My Plan
//           </h1>
//         </div>

//         {/* Sənin Məşhur Gradient Düymən */}
//         <button 
//           className={`${gradientClass} w-full py-4 rounded-2xl text-white font-bold text-sm shadow-lg shadow-rose-500/20 hover:scale-[1.02] transition-transform active:scale-95`}
//           onClick={() => console.log("Modalı aç")}
//         >
//           + CREATE
//         </button>

//         {/* Mini Təqvim Sahəsi (Hələlik yerini ayıraq) */}
//         <div className="flex-1">
//           <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
//             Quick View
//           </h3>
//           <div className="aspect-square bg-slate-50 rounded-3xl border border-dashed border-slate-200 flex items-center justify-center text-slate-400 text-xs italic">
//             Mini Calendar will be here
//           </div>
//         </div>

//         {/* Kateqoriyalar/Filtrlər */}
//         <div className="space-y-4">
//           <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
//             Tags
//           </h3>
//           <div className="flex flex-col space-y-2">
//             <label className="flex items-center space-x-2 cursor-pointer">
//               <input type="checkbox" defaultChecked className="rounded text-fuchsia-600 focus:ring-fuchsia-500" />
//               <span className="text-sm font-medium text-slate-600">AI Managed</span>
//             </label>
//             <label className="flex items-center space-x-2 cursor-pointer">
//               <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500" />
//               <span className="text-sm font-medium text-slate-600">Personal</span>
//             </label>
//           </div>
//         </div>

//       </aside>

//       {/* --- MAIN CALENDAR AREA --- */}
//       <main className="flex-1 p-8 overflow-y-auto">
//         <header className="flex justify-between items-center mb-8">
//             <h2 className="text-3xl font-black italic tracking-tighter text-slate-800 uppercase">
//                 Schedule
//             </h2>
//             {/* Burada bəlkə user avatarı və ya bildiriş ikonları ola bilər */}
//         </header>

//         <div className="h-[calc(100vh-160px)] bg-white rounded-[40px] shadow-2xl border border-slate-50 p-6">
//             {/* FullCalendar bura gələcək */}
//             <div className="h-full w-full bg-slate-50/50 rounded-[30px] flex items-center justify-center text-slate-300 italic">
//                 Main Calendar Loading...
//             </div>
//         </div>
//       </main>

//     </div>
//   );
// };

// export default CalendarPage;