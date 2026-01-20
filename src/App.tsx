import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HabitList from "./components/HabitList/HabitList";
import ReminderList from "./components/ReminderList/ReminderList";

function App() {
  return (
    <>
      <Header title="Habit Tracker" />

      <main>
        <div className="app-container">
          <HabitList />
          <ReminderList />
        </div>
      </main>

      <Footer members={["Smile", "Navpreet Kaur"]} />
    </>
  );
}

export default App;


