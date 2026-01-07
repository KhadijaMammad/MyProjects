// Layout.tsx və ya App.tsx daxilində
import Sidebar from "../sidebar/index";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#101922]">
      <Sidebar />
      <main className="flex-1">
        <div className="p-2 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
