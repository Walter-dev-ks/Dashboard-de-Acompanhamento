import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";

const Layout = () => (
  <div className="min-h-screen bg-background">
    <AppSidebar />
    <main className="md:ml-64 p-4 md:p-8 pt-16 md:pt-8">
      <Outlet />
    </main>
  </div>
);

export default Layout;
