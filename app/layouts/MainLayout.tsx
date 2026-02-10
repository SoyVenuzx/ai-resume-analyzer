import Navbar from "@/components/Navbar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <Outlet />
      </section>
    </main>
  );
};

export default MainLayout;
