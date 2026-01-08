import Sidebar from "../sidebar/index";
import { Outlet } from "react-router-dom";

const Layout = () => {
  // Sidebar-ın eni nə qədərdirsə, bura həmin ölçünü yaz (məs: 280px)
  const sidebarWidth = "280px";

  return (
    <div className="flex min-h-screen w-full bg-white dark:bg-[#101922]">
      <Sidebar />
      <main
        className="flex-1 min-h-screen min-w-0"
        style={{ paddingLeft: sidebarWidth }}
      >
        <div className="h-screen w-full overflow-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
