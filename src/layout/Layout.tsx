import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Nav from "../components/Nav/Nav";

export interface Habit {
  id: number;
  name: string;
}

function Layout() {
  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: "Drink 5 glasses of water" },
    { id: 2, name: "Read 10 pages a day" },
  ]);

  return (
    <div className="app-root">
      <Header title="Habit Tracker" />
      <Nav />

    <main className="app-main">
     <div className="app-container">
      <Outlet context={{ habits, setHabits }} />
     </div>
    </main>

      <Footer members={["Smile", "Navpreet Kaur"]} />
    </div>
  );
}

export default Layout;
