import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Nav from "../components/Nav/Nav";

function Layout() {
  return (
    <div className="app-root">
      <Header title="Habit Tracker" />
      <Nav />

      <main className="app-main">
        <div className="app-container">
          <Outlet />
        </div>
      </main>

      <Footer members={["Smile", "Navpreet Kaur"]} />
    </div>
  );
}

export default Layout;